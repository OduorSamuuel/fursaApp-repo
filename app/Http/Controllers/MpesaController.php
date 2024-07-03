<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;
use Carbon\Carbon;

use Illuminate\Support\Facades\DB;

use App\Models\User;

use App\Models\Payment;
use App\Models\ServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ServiceDetails;
use App\Models\ServiceRequest;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;



class MpesaController extends Controller
{ 

   
    private function getAccessToken()
    {
        // Replace with your actual consumerKey and consumerSecret
        $consumerKey = "UhoXlFx8vzIZfTr6dtUMzJpXS7uES3Gw";
        $consumerSecret = "8FdgPGYTGFnz2m5M";

        $access_token_url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
        $headers = ['Content-Type:application/json; charset=utf8'];

        $response = Http::withHeaders(['Authorization' => 'Basic ' . base64_encode($consumerKey . ':' . $consumerSecret)])
            ->get($access_token_url);

        $result = $response->json();

        return $result['access_token'];
    }
 // PaymentController.php

// PaymentController.php


public function performStkPush(Request $request)
{//dd($request->all());
   
    

    $access_token = $this->getAccessToken();

    $processRequestUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    $callbackUrl = 'https://e419-41-80-118-229.ngrok-free.app';
    $passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    $businessShortCode = '174379';
    $timestamp = now()->format('YmdHis');

    $password = base64_encode($businessShortCode . $passkey . $timestamp);

    // Get values from the request
    $mpesaNumber = $request->phoneNumber;
   
    $amount = 1;

    $partyA = $mpesaNumber;
    $partyB = '174379';
    $accountReference = 'fursaApp';
    $transactionDesc = 'checkout';

    $stkPushHeader = ['Content-Type' => 'application/json', 'Authorization' => 'Bearer ' . $access_token];

    $curlPostData = [
        'BusinessShortCode' => $businessShortCode,
        'Password' => $password,
        'Timestamp' => $timestamp,
        'TransactionType' => 'CustomerPayBillOnline',
        'Amount' => $amount,
        'PartyA' => $partyA,
        'PartyB' => $businessShortCode,
        'PhoneNumber' => $partyA,
        'CallBackURL' => $callbackUrl,
        'AccountReference' => $accountReference,
        'TransactionDesc' => $transactionDesc,
    ];

    $response = Http::withHeaders($stkPushHeader)->post($processRequestUrl, $curlPostData);
   

    $responseData = $response->json();
    $checkoutRequestID = $responseData['CheckoutRequestID'];
    $responseCode = $responseData['ResponseCode'];

    if ($responseCode == "0") {
        // Store the $checkoutRequestID in the cache for 60 minutes (adjust as needed)
       
        Cache::put('checkoutRequestID', $checkoutRequestID, now()->addMinutes(30));
       Cache::put('bookingData', $request->all(), now()->addMinutes(30));
       // dd("this is the cached session id: " . Session::get('checkoutRequestID'));

        return redirect()->route('payment.process');
    } else {
        return view('payment.failed', ['message' => 'Payment failed. Please try again.']);
    }
}

    // STK push callback functionality
    // STK push callback functionality

    public function queryStkPush(Request $request)
    {
        $checkoutRequestID = Cache::get('checkoutRequestID');
        $access_token = $this->getAccessToken();
    
        // Set API endpoint and credentials
        $queryUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query';
        $businessShortCode = '174379';
        $timestamp = now()->format('YmdHis');
        $passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
        $password = base64_encode($businessShortCode . $passkey . $timestamp);
    
        // Set headers and request payload
        $queryHeader = ['Content-Type' => 'application/json', 'Authorization' => 'Bearer ' . $access_token];
        $curlPostData = [
            'BusinessShortCode' => $businessShortCode,
            'Password' => $password,
            'Timestamp' => $timestamp,
            'CheckoutRequestID' => $checkoutRequestID,
        ];
    
        $response = Http::withHeaders($queryHeader)->post($queryUrl, $curlPostData);
       
        $responseData = $response->json();
       
        
    
        if (isset($responseData['ResultCode'])) {
            $resultCode = $responseData['ResultCode'];
    
            // Process result codes and set appropriate messages
            switch ($resultCode) {
                case '1037':
                    $message = "Timeout in completing transaction";
                    break;
    
                case '1032':
                    $message = "Transaction cancelled by user";
                    $responseData =$response->json();
                    Cache::put('responseData', $responseData, now()->addMinutes(30));
                    break;
    
                case '1':
                    $message = "Insufficient balance for the transaction";
                    break;
    
                case '0':
                    $message = "Transaction was successful";
                    Cache::put('checkoutRequestID', $checkoutRequestID, now()->addMinutes(30));
                    break;
    
                default:
                    $message = "Unhandled ResultCode: $resultCode";
                    break;
            }
    
            // Return JSON response with resultCode and message
            return response()->json(['resultCode' => $resultCode, 'message' => $message, 'responseData' => $responseData]);
        }
    
        // Return a generic message if no ResultCode is found
        return response()->json(['message' => 'No ResultCode found in response.']);
    }

public function paymentProcess(){

    Return inertia::render('PaymentProcessing');
}

public function processBooking(Request $request)
{
    $responseData = Cache::get('responseData');
   
    $bookingData = Cache::get('bookingData');
    //dd($bookingData);
    $serviceDetailId = $bookingData['bookingSummary']['bookingData']['service_detail_id'];

    // Fetch service_provider_id from the ServiceDetails table
    $serviceDetail = ServiceDetails::findOrFail($serviceDetailId);
    $serviceProviderId = $serviceDetail->service_provider_id;
    $bookingDateTime = Carbon::createFromFormat('Y-m-d h:i A', $bookingData['bookingSummary']['selectedDate'] . ' ' . $bookingData['bookingSummary']['selectedTime'])
    ->format('Y-m-d H:i:s');

    $serviceRequest = ServiceRequest::create([
        'user_id' => auth()->id(),
        'service_provider_id' => $serviceProviderId,
        'service_detail_id' => $serviceDetailId,
        'booking_date' => $bookingDateTime,
        'location' => $bookingData['bookingSummary']['bookingData']['provider']['address'],
        'status' => 'Pending',
        'amount' => $bookingData['totalCost'],
        'payment_status' => 'Pending',
    ]);
    // Insert data into payments
    $payment = Payment::create([
        'service_request_id' => $serviceRequest->id,
        'amount' => $bookingData['totalCost'],
        'payment_datetime' => now(),
        'MerchantRequestID' => $responseData['MerchantRequestID'],
        'CheckoutRequestID' => $responseData['CheckoutRequestID'],
    ]);
   

    // Update the payment status to Paid if ResponseCode is 0
    if ($responseData['ResponseCode'] == '0') {
        $serviceRequest->update(['payment_status' => 'Paid']);
      
    }
    


    return inertia::render('BookingSuccess');
}
public function handleStkCallback(Request $request)
{
    $stkCallbackResponse = $request->getContent();
    $logFile = "Mpesastkresponse.json";
    file_put_contents($logFile, $stkCallbackResponse, FILE_APPEND);

    $data = json_decode($stkCallbackResponse);

    $merchantRequestID = $data->Body->stkCallback->MerchantRequestID;
    $checkoutRequestID = $data->Body->stkCallback->CheckoutRequestID;
    $resultCode = $data->Body->stkCallback->ResultCode;
    $resultDesc = $data->Body->stkCallback->ResultDesc;
    $amount = $data->Body->stkCallback->CallbackMetadata->Item[0]->Value;
    $transactionId = $data->Body->stkCallback->CallbackMetadata->Item[1]->Value;
    $userPhoneNumber = $data->Body->stkCallback->CallbackMetadata->Item[4]->Value;

    // CHECK IF THE TRANSACTION WAS SUCCESSFUL
    if ($resultCode == 0) {
        // REDIRECT TO SUCCESS PAGE
        return redirect()->route('success', [
            'merchantRequestID' => $merchantRequestID,
            'checkoutRequestID' => $checkoutRequestID,
            'amount' => $amount,
            'transactionId' => $transactionId,
            'userPhoneNumber' => $userPhoneNumber,
        ]);
    }

    return response()->json(['status' => 'payment.success'], 200);
}


    }