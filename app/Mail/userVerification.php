<?php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class UserVerification extends Mailable
{
    use Queueable, SerializesModels;

    public $tokenLink;

    /**
     * Create a new message instance.
     *
     * @param string $tokenLink
     */
    public function __construct($tokenLink)
    {
        $this->tokenLink = $tokenLink;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('verification')
            ->subject('Verification Email')
            ->with([
                'tokenLink' => $this->tokenLink,
            ]);
    }
}
