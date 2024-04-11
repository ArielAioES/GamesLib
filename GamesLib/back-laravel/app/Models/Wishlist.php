<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
    protected $table = 'wishlist'; // Nome da tabela no banco de dados

    protected $fillable = ['name_game']; // Colunas da tabela que podem ser preenchidas

    // Se você não tiver as colunas "created_at" e "updated_at" na sua tabela,
    // você pode definir o $timestamps como false para desativar a atualização automática desses campos.
    public $timestamps = true;
}
