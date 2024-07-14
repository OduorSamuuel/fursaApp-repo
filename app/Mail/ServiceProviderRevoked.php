<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\ServiceProvider;

class ServiceProviderRevoked extends Mailable
{
    use Queueable, SerializesModels;

    public $serviceProvider;

    public function __construct(ServiceProvider $serviceProvider)
    {
        $this->serviceProvider = $serviceProvider;
    }

    public function build()
    {
        return $this->view('emails.serviceProviderRevoked')
                    ->subject('Your Approval Status Has Been Revoked');
    }
}
