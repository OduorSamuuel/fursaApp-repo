<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Error 404</title>
</head>
<body class="bg-gradient-to-br from-purple-300 to-indigo-400 text-white">
    <div class="flex flex-col items-center justify-center min-h-screen">
        <img src="{{ asset('Images/Oops! 404 Error with a broken robot-rafiki.png') }}" alt="404 Illustration" class="w-96 h-auto mb-12">
        <div class="text-center">
            <p class="text-lg mb-8">Oops! The page you are looking for could not be found.</p>
            <a href="{{ route('home') }}" class="bg-indigo-600 text-white hover:bg-indigo-700 px-6 py-3 rounded-full shadow-lg transition duration-300 ease-in-out inline-block font-semibold text-lg">Back to Home</a>
        </div>
    </div>
</body>
</html>
