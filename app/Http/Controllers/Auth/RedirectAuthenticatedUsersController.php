<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

class RedirectAuthenticatedUsersController extends Controller
{
    public function home()
    {
        if (auth()->user()->role == 'fan') {
            return redirect('/');
        } elseif (auth()->user()->role == 'artist') {
            return redirect('/artist/dashboard');
        } else {
            return auth()->logout();
        }
    }
}
