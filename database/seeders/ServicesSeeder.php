<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ServicesSeeder extends Seeder
{
    public function run()
    {
        $services = [
            ['name' => 'Plumbing', 'category' => 'Home Services'],
            ['name' => 'Electrical', 'category' => 'Home Services'],
            ['name' => 'Cleaning', 'category' => 'Home Services'],
            ['name' => 'IT Support', 'category' => 'Technology'],
            ['name' => 'Web Development', 'category' => 'Technology'],
            ['name' => 'Gardening', 'category' => 'Home Services'],
            ['name' => 'Carpentry', 'category' => 'Home Services'],
            ['name' => 'Painting', 'category' => 'Home Services'],
            ['name' => 'Graphic Design', 'category' => 'Creative Services'],
            ['name' => 'Content Writing', 'category' => 'Creative Services'],
            ['name' => 'SEO Optimization', 'category' => 'Marketing'],
            ['name' => 'Digital Marketing', 'category' => 'Marketing'],
            ['name' => 'Social Media Management', 'category' => 'Marketing'],
            ['name' => 'Event Planning', 'category' => 'Event Services'],
            ['name' => 'Photography', 'category' => 'Event Services'],
            ['name' => 'Videography', 'category' => 'Event Services'],
            ['name' => 'Accounting', 'category' => 'Professional Services'],
            ['name' => 'Legal Advice', 'category' => 'Professional Services'],
            ['name' => 'Consulting', 'category' => 'Professional Services'],
            ['name' => 'Tutoring', 'category' => 'Education'],
            ['name' => 'Language Translation', 'category' => 'Education'],
            ['name' => 'Fitness Training', 'category' => 'Health & Wellness'],
            ['name' => 'Yoga Instruction', 'category' => 'Health & Wellness'],
            ['name' => 'Massage Therapy', 'category' => 'Health & Wellness'],
            ['name' => 'Pet Sitting', 'category' => 'Pet Services'],
            ['name' => 'Dog Walking', 'category' => 'Pet Services'],
            ['name' => 'Veterinary Services', 'category' => 'Pet Services'],
            ['name' => 'Real Estate Agent', 'category' => 'Real Estate'],
            ['name' => 'Property Management', 'category' => 'Real Estate'],
            ['name' => 'Interior Design', 'category' => 'Home Services'],
            ['name' => 'Housekeeping', 'category' => 'Home Services'],
            ['name' => 'Pest Control', 'category' => 'Home Services'],
            ['name' => 'Roofing', 'category' => 'Home Services'],
            ['name' => 'Handyman', 'category' => 'Home Services'],
            ['name' => 'Appliance Repair', 'category' => 'Home Services'],
            ['name' => 'Auto Repair', 'category' => 'Automotive'],
            ['name' => 'Car Wash', 'category' => 'Automotive'],
            ['name' => 'Driving Instruction', 'category' => 'Automotive'],
            ['name' => 'Baking', 'category' => 'Food Services'],
            ['name' => 'Catering', 'category' => 'Food Services'],
            ['name' => 'Food Delivery', 'category' => 'Food Services'],
            ['name' => 'Hair Styling', 'category' => 'Beauty Services'],
            ['name' => 'Makeup Artist', 'category' => 'Beauty Services'],
            ['name' => 'Nail Technician', 'category' => 'Beauty Services'],
            ['name' => 'Barber', 'category' => 'Beauty Services'],
            ['name' => 'Life Coaching', 'category' => 'Personal Development'],
            ['name' => 'Career Counseling', 'category' => 'Personal Development'],
            ['name' => 'Financial Planning', 'category' => 'Financial Services'],
            ['name' => 'Tax Preparation', 'category' => 'Financial Services'],
        ];

        DB::table('services')->insert($services);
    }
}
