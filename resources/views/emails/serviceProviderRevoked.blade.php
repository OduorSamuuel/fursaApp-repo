<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Approval Revoked</title>
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
            color: #e74c3c;
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
        <h1>Approval Revoked</h1>
        <p>Dear {{ $serviceProvider->user->name }},</p>
        <p>We regret to inform you that your approval status has been revoked due to certain reasons. Please contact our support team for further details.</p>
        <p>Thank you for your understanding.</p>
        <p>Best regards,<br>The fursaApp Team</p>
    </div>
</body>
</html>