<?php

namespace App\Http\Controllers;

use App\Models\Merch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Intervention\Image\Facades\Image;

class MerchController extends Controller
{

    public function create()
    {
        return Inertia::render('Menus/Artist/AddMerch');
    }

    public function store(Request $request)
    {
        Validator::make($request->all(), [
            'merch_title' => 'required:unique',
            'merch_category' => 'required',
            'merch_image' => 'required|array',
            'merch_image.*' => 'image|mimes:jpg,jpeg,png,svg|max:2048',
            'merch_description' => 'required',
            'merch_price' => 'nullable',
        ])->validate();

        $merch = new Merch([
            'merch_title' => $request->merch_title,
            'merch_category' => $request->merch_category,
            'merch_description' => $request->merch_description,
            'merch_price' => $request->merch_price,
            'merch_user_id' => $request->user()->id,
        ]);

        $merchImages = [];
        foreach ($request->file('merch_image') as $image) {
            $destinationPath = public_path('images/merches/thumbnails');
            $merchImageName = $merch->merch_title . $merch->id . "_" . time() . mt_rand(1000, 9999) . $image->getClientOriginalExtension();
            $img = Image::make($image->path());
            $img->fit(280, 280, function ($const) {
                $const->aspectRatio();
            })->save($destinationPath . '/thumb_' . $merchImageName, 90);

            $destinationPath = 'images/merches/main';
            $image->move($destinationPath, $merchImageName);
            $merchImages[] = $merchImageName;
        }

        $merch->merch_image = json_encode($merchImages);
        $merch->save();

        return redirect()->route('artist.dashboard');
    }
}
