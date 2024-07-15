<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Approval Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            padding: 30px;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .logo img {
            max-width: 150px;
            height: auto;
        }
        h1 {
            color: #2ecc71;
            margin-bottom: 20px;
        }
        p {
            color: #666;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">
                <img src="{{ $message->embed(public_path('Images/logo-color.png')) }}" alt="fursaApp Logo">
            </div>
        </div>
        <h1>Approval Notification</h1>
        <p>Dear {{ $serviceProvider->user->name }},</p>
        <p>We are pleased to inform you that your request to work with us has been approved. You can now log in to your account and start offering your services.</p>
        <p>Thank you for choosing FursaApp.</p>
        <p>Best regards,<br>The fursaApp Team</p>
    </div>
</body>
</html>