# FursaApp

FursaApp is an web based internet application for linking service providers to clients in need of those services

Source code : [GitHub](https://github.com/OduorSamuuel/fursaApp-repo)

### Tech Stack

- [Laravel](https://laravel.com/)
- [Inertia JS](https://inertiajs.com/)
- [React JS](https://reactjs.org/)
- [Soketi](https://docs.soketi.app/)

### Packages

- [pusher/pusher-php-server](https://laravel.com/docs/10.x/broadcasting)
- [laravel/scout](https://laravel.com/docs/10.x/scout)
- [laravel-echo](https://laravel.com/docs/10.x/broadcasting)
- [pusher-js](https://laravel.com/docs/10.x/broadcasting)
- [@emotion/react@11.11.4](https://github.com/emotion-js/emotion)
- [@emotion/styled@11.11.5](https://github.com/emotion-js/emotion)
- [react-time-picker@7.0.0](https://github.com/wojtekmaj/react-time-picker)
- [react-toastify@10.0.5](https://github.com/fkhadra/react-toastify)
- [slick-carousel@1.8.1](https://kenwheeler.github.io/slick/)
- [tailwindcss@3.3.3](https://tailwindcss.com/)
- [vite@4.4.9](https://vitejs.dev/)





## Installation and Usage

Clone the repository

```bash
git clone https://github.com/OduorSamuuel/fursaApp-repo.git
```

Navigate to the project directory

```bash
cd fursaApp-repo
```

Install dependencies

```bash
# composer
composer install

# npm
npm install
```

Copy `.env.example` to `.env`

```bash
cp .env.example .env
```

Generate application key

```bash
php artisan key:generate
```

Run migration and seeder

```bash
# migration
php artisan migrate

# seeder
php artisan db:seed
```

>You must install soketi <a href="https://docs.soketi.app/getting-started/installation/cli-installation" target="_blank">Soketi</a> globally before running the application.

Install Soketi

```bash
npm install -g @soketi/soketi
```

Run Soketi with custom configuration.

```bash
soketi start --config=soketi.config.json
```

Run the application

```bash
# Start the development server
php artisan serve

# Run React JS
npm run dev
```










