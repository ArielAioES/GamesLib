<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;

// Rotas para lidar com requisições relacionadas aos jogos na API
Route::get('/api', [GameController::class, 'home']); // Rota para a página inicial
Route::get('/api/search/{query}', [GameController::class, 'search']); // Rota para busca de jogos
Route::get('/api/favorites', [GameController::class, 'favorites']); // Rota para jogos favoritos
Route::get('/api/game/{query}', [GameController::class, 'select']); // Rota para selecionar um jogo

Route::apiResource('/api/users', UserController::class);

// Route::delete('/api/users/{id}', [UserController::class,'destroy']);
// Route::patch('/api/users/{id}', [UserController::class,'update']);
// Route::get('/api/users/{id}', [UserController::class,'show']);
// Route::get('/api/users', [UserController::class, 'index']); // Rota para a página inicial do usuário
// Route::post('/api/users', [UserController::class, 'store']); // Rota para registrar um usuário

Route::post('/api/auth', [LoginController::class, 'auth']);