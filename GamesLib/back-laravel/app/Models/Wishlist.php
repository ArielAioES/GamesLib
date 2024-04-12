<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    protected $table = 'wishlist'; // Nome da tabela no banco de dados
    protected $fillable = ['name_game']; // Colunas da tabela que podem ser preenchidas

    public $timestamps = true;
}
