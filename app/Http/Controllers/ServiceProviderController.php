<?php
namespace App\Http\Controllers;

use App\Models\County;
use App\Models\Services;
use Illuminate\Http\Request;

class ServiceProviderController extends Controller
{
    public function getCounties()
    {
        $counties = County::all();
        return response()->json($counties);
    }

    public function getCategories()
    {
        $categories = Services::select('category')->distinct()->get();
        return response()->json($categories);
    }

    public function getServicesByCategory($category)
    {
        $services = Services::where('category', $category)->get();
        return response()->json($services);
    }
}
