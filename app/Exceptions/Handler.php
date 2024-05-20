<?php

namespace App\Exceptions;

use Illuminate\Http\Response;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Support\Str;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\Response
     */
   

   

     public function render($request, Throwable $exception): \Illuminate\Http\Response
{
    if ($exception instanceof ModelNotFoundException || $exception instanceof NotFoundHttpException) {
       
        $Url = Str::random(30); 

        // Create a response instance with a redirect to the dynamic error page route
        $response = new Response();
        $response->header('Location', route('error', ['fakeUrl' => $Url]));
        $response->setStatusCode(302); // Set status code for redirect

        return $response;
    }

    return parent::render($request, $exception);
}
    
    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }
}
