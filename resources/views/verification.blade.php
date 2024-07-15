<!DOCTYPE html>
<html>
<head>
    <title>Welcome to fursaApp</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f3f3f3;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(to bottom, #ffffff 0%, #e6e6e6 50%, #d9d9d9 100%);
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px;
            display: flex !important;
            justify-content: center !important;
            background-color: #ffffff; 
            height:150px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        .logo img {
            top: 0;
            width: 150px; 
            height: auto;
        }
        .body {
            padding: 20px;
            background-color: #f9f9f9;
        }
        .content {
            text-align: center;
            margin-bottom: 30px;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
            color: #333;
            margin-bottom: 15px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background: linear-gradient(to right, #4CAF50, #2196F3); /* Gradient button color */
            color: white !important;
            text-decoration: none;
            border-radius: 5px;
            transition: background-color 0.3s;
            border: none;
            cursor: pointer; 
        }
        .button:hover {
            background: linear-gradient(to right, #45a049, #1e87d9); /* Gradient hover color */
        }
        .footer {
            text-align: center;
            padding: 20px;
            background-color: #e6e6e6; /* Light grey background color for footer */
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }
        .footer p {
            color: #888;
            font-size: 14px;
            margin: 0;
        }
        .signature {
            margin-top: 30px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
            <img src="{{ $message->ebmbed(public_path('Images/logo-color.png')) }}" alt="logo">
           </div>
        </div>
        <div class="body"> 
            <div class="content">
                <p>Hello,</p>
                <p>Thank you for choosing fursaApp. Your registration is almost complete. Click the button below to finish the process:</p>
                <a href="{{ $tokenLink }}" class="button">Complete Registration</a>
            </div>
        </div>
        <div class="footer">
            <p>&copy; {{ date("Y") }} fursaApp</p>
        </div>
        <div class="signature">
            <p> sent by fursaApp Team</p>
        </div>
    </div>
</body>
</html>
