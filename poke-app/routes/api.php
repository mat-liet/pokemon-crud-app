<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PokemonController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/pokemon', [PokemonController::class, 'create']);
Route::get('/pokemon', [PokemonController::class, 'list']);
Route::get('/pokemon/{id}', [PokemonController::class, 'find']);
Route::put('/pokemon/{id}', [PokemonController::class, 'update']);
Route::delete('/pokemon/{id}', [PokemonController::class, 'delete']);
