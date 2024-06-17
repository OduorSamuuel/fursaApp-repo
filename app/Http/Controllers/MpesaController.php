<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

use Illuminate\Support\Facades\DB;
use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class MpesaController extends Controller
{ public $formData = [];

    public function show(Request $request)
    {
        $this->formData= [
            'roomId' => $request->input('roomId'),
            'check_in' => $request->input('check_in'),
            'check_out' => $request->input('check_out'),
            'adults' => $request->input('adults'),
            'child' => $request->input('child'),
            'rooms' => $request->input('rooms'),
            'PricePerNight' => $request->input('PricePerNight'),
        ];
    
        $numberOfNights = $this->calculatePrice($this->formData);
        $totalPrice = $this->calculateTotalPrice($this->formData);
    
        $this->formData['nights'] = $numberOfNights;
        $this->formData['pricePerNightCalculated'] = $totalPrice;
    
        cache(['form_data1' => $this->formData], now()->addMinutes(30));
    
        return view('payment.payment', ['formData1' => $this->formData]);
    }
    
   
   
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
{
    // Debugging: Output the received request data
    //dd($request->all());

    $access_token = $this->getAccessToken();

    $processRequestUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    $callbackUrl = 'https://2865-149-34-244-170.ngrok-free.app';
    $passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    $businessShortCode = '174379';
    $timestamp = now()->format('YmdHis');

    $password = base64_encode($businessShortCode . $passkey . $timestamp);

    // Get values from the request
    $mpesaNumber = $request->mpesa_number;
    $amount = $request->amount;
   

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
        Cache::put('checkoutRequestID', $checkoutRequestID, 60);
dd("Hello, $checkoutRequestID");
        return Inertia::render('PaymentModal');
    } else {
        return view('payment.failed', ['message' => 'Payment failed. Please try again.']);
    }
}

    // STK push callback functionality
    // STK push callback functionality
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


    public function queryStkPush(Request $request)
{
  
  

  
    $access_token = $this->getAccessToken();

    // Set API endpoint and credentials
    $queryUrl = 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query';
    $businessShortCode = '174379';
    $timestamp = now()->format('YmdHis');
    $passkey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
    $password = base64_encode($businessShortCode . $passkey . $timestamp);
    $checkoutRequestID = Cache::get('checkoutRequestID');

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

        // Process result codes
        switch ($resultCode) {
            case '1037':
                $message = "1037 Timeout in completing transaction";
                break;

            case '1032':
                $formDataFromCache = Cache::get('form_data1');
                $message = $this->handleTransactionCancelled($formDataFromCache);
                break;

            case '1':
                $message = "1 The balance is insufficient for the transaction";
                break;

            case '0':
                $message = "0 The transaction was successful";
                Cache::put('checkoutRequestID', $checkoutRequestID, 60);
                break;

            default:
                $message = "Unhandled ResultCode: $resultCode";
                break;
        }

        return $message;
    }
}

private function handleTransactionCancelled($formDataFromCache)
{
    try {
      
        $userIdInSession = session('user_id');

   

        // Prepare booking data
        $bookingData = [

            'RoomID' => $formDataFromCache['roomId'] ?? null,
            'UserID' => $userIdInSession,
            'CheckInDate' => $formDataFromCache['check_in'] ?? null,
            'Adult' => $formDataFromCache['adults'] ?? null,
            'Children' => $formDataFromCache['child'] ?? null,
            'CheckOutDate' => $formDataFromCache['check_out'] ?? null,
            'TotalPrice' =>$formDataFromCache['pricePerNightCalculated'],
        ];
       


       // $userEmail = DB::table('users')->where('id', $userIdInSession)->value('email');


       
   
        try {
            DB::table('booking')->insert($bookingData);
        } catch (\Exception $e) {
            \Log::error('Error creating booking: ' . $e->getMessage());
        }
      
        $room = Room::where('RoomId', $formDataFromCache['roomId'])->first();
     
      
       
        if ($room) {
            $room->Status = 'booked';
            $room->save();
           
         
        } else {
            $affectedRows = 0;
            \Log::error('Room not found ');
        }
    } catch (\Exception $e) {
        \Log::error('Exception updating room status: ' . $e->getMessage());
    }

    return view('bookingsuccess');
}

    }