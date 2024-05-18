<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define the roles
        $roles = [
            ['name' => 'service_provider'],
            ['name' => 'admin'],
        ];

        // Insert the roles into the database
        Role::insert($roles);
    }
}
