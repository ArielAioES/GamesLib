<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\GameController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;

// Rotas para lidar com requisições relacionadas aos jogos na API
Route::get('/api', [GameController::class, 'home']); // Rota para a página inicial
Route::get('/api/search/{query}', [GameController::class, 'search']); // Rota para busca de jogos
Route::get('/api/favorites', [GameController::class, 'favorites']); // Rota para jogos favoritos
Route::get('/api/game/{query}', [GameController::class, 'select']); // Rota para selecionar um jogo

Route::apiResource('/api/users', UserController::class);

Route::post('/api/login', [UserController::class, 'login']);

// Route::middleware(['auth:sanctum'])->get('/api/user/profile', function (Request $request) {
//     return $request->user();
// });

