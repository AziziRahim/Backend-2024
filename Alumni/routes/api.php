<?php

use App\Http\Controllers\AlumniController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {

Route::get('/alumnis',[AlumniController::class, 'index']);
Route::post('/alumnis',[AlumniController::class, 'store']);
Route::put('/alumnis/{id}',[AlumniController::class, 'update']);
Route::delete('/alumnis/{id}',[AlumniController::class,'destroy']);
Route::get('/alumnis/{id}',[AlumniController::class, 'show'] );
Route::get('/alumnis/seacrh/{name}',[AlumniController::class, 'search'] );
Route::get('/alumnis/status/fresh-graduate',[AlumniController::class, 'freshGraduate'] );
Route::get('/alumnis/status/employed',[AlumniController::class, 'employed'] );
Route::get('/alumnis/status/unemployed',[AlumniController::class, 'unemployed'] );
 
 });


Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

