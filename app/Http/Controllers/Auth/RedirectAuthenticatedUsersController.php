<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RedirectAuthenticatedUsersController extends Controller
{
    public function home()
    {
        if (auth()->user()->role == 'fan') {
            return redirect('/fanDashboard');
        } elseif (auth()->user()->role == 'artist') {
            return redirect('/artistDashboard');
        } else {
            return auth()->logout();
        }
    }
}
