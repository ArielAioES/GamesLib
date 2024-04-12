<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WishlistController extends Controller
{
    // Outros métodos do controlador...

    /**
     * Adicionar um jogo à lista de desejos de um usuário.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function addWishList(Request $request)
    {
        // Validação dos dados recebidos
        $request->validate([
            'name_game' => 'required|string|max:255',
        ]);

        // Recebendo o nome do jogo do corpo da requisição
        $nameGame = $request->input('name_game');

        // Verificando se o nome do jogo já existe na lista de desejos
        $existingGame = DB::table('wishlist')->where('name_game', $nameGame)->first();

        if ($existingGame) {
            // Se o jogo já estiver na lista, retorne uma resposta de erro
            return response()->json(['error' => 'O jogo já está na lista de desejos'], 400);
        }

        // Adicionando o nome do jogo à tabela 'wishlist' no banco de dados
        DB::table('wishlist')->insert([
            'name_game' => $nameGame,
        ]);

        // Retornando uma resposta de sucesso
        return response()->json(['message' => 'Jogo adicionado à lista de desejos com sucesso']);
    }

    public function listGames()
    {
        // Recupere todos os dados da tabela wishlist
        $wishlistItems = Wishlist::all();

        // Verifique se existem itens na lista de desejos
        if ($wishlistItems->isEmpty()) {
            // Se não houver itens, retorne uma resposta com status 404 (Not Found)
            return response()->json(['message' => 'Nenhum item encontrado na lista de desejos'], 404);
        }

        // Se houver itens na lista de desejos, retorne uma resposta com os itens
        return response()->json($wishlistItems);
    }

    public function removeFromWishlist($id)
    {
        $game = Wishlist::find($id);

        if (!$game) {
            return response()->json(['message' => 'Jogo não encontrado na lista de desejos'], 404);
        }

        $game->delete();

        return response()->json(['message' => 'Jogo removido da lista de desejos'], 200);
    }
}
