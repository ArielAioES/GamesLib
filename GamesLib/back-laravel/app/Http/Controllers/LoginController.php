<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Adicionando a importação da classe Auth

class LoginController extends Controller
{
    public function auth(Request $request){
        $credentials = $request->validate([
            'email_user' => ['required','email'],
            'password_user'=> ['required']
        ]);

        if(Auth::attempt($credentials)){
            $request->session()->regenerate();
            return redirect()->intended('dashboard');
        } else {
            return redirect()->back()->with('error','Email ou senha inválida ');
        }
    }
}
