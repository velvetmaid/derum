<?php

use App\Http\Controllers\ArtistAlbumController;
use App\Http\Controllers\ArtistSongController;
use App\Http\Controllers\Auth\RedirectAuthenticatedUsersController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::group(['middleware' => 'auth'], function () {
    Route::get("/redirectAuthenticatedUsers", [RedirectAuthenticatedUsersController::class, "home"]);
    Route::get('/', [ArtistAlbumController::class, 'index']);
    Route::get('/albumInfo/{id}', [ArtistAlbumController::class, 'albumInfoIndex'])->name('albumInfo');

    Route::group(['middleware' => 'checkRole:fan'], function () {
        Route::inertia('/fanDashboard', 'Menus/Fan/FanDashboard')->name('fanDashboard');
    });

    Route::group(['middleware' => 'checkRole:artist'], function () {
        Route::get('/artistDashboard', [ArtistAlbumController::class, 'artistDashboardIndex'])->name('artistDashboard');

        Route::controller(ArtistAlbumController::class)->group(function () {
            Route::get('/artistAddAlbum/create', 'create')->name('artistAddAlbum.create');
            Route::post('/artistAddAlbum/store', 'store')->name('artistAddAlbum.store');
            // Route::get('/artistAddAlbum.{...}.edit', 'edit')->name('artistAddAlbum.edit');
            // Route::delete('/artistAddAlbum.{...}.destroy', 'destroy')->name('artistAddAlbum.destroy');
        });
    });
});
require __DIR__ . '/auth.php';
