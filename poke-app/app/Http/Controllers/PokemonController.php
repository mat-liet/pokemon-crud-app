<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pokemon;
use Illuminate\Support\Facades\DB;

class PokemonController extends Controller
{
    public function create(Request $request) {
        $pokemon = new Pokemon();
        $pokemon->name = $request->name;
        $pokemon->type = $request->type;
        $pokemon->move = $request->move;
        $pokemon->save();
        return response()->json($pokemon);
    }

    public function list(Request $request) {
        if ($request->has('filter_name')) {
            $pokemon = DB::table('pokemon')
                ->where('name', 'like', "%$request->filter_name%")
                ->get();
            return response()->json($pokemon);
        } else {
            $pokemon = Pokemon::all();
            return response()->json($pokemon);
        }
    }

    public function find($id) {
        if (Pokemon::where('id', $id)->exists()) {
            $pokemon = Pokemon::find($id);
            return response()->json($pokemon);
        } else {
            return response()->json([
                'message' => "Pokemon with id $id not found."
            ], 404);
        }
    }

    public function update(Request $request, $id) {
        if (Pokemon::where('id', $id)->exists()) {
            $pokemon = Pokemon::find($id);
            $pokemon->name = is_null($request->name) ? $pokemon->name : $request->name;
            $pokemon->type = is_null($request->type) ? $pokemon->type : $request->type;
            $pokemon->move = is_null($request->move) ? $pokemon->move : $request->move;
            $pokemon->save();
            return response()->json([
                'message' => "Pokemon with id $id updated."
            ], 200);
        } else {
            return response()->json([
                'message' => "Pokemon with id $id not found."
            ], 404);
        }
    }

    public function delete($id) {
        if (Pokemon::where('id', $id)->exists()) {
            Pokemon::where('id', $id)->delete();
            return response()->json([
                'message' => "Pokemon with id $id deleted."
            ], 200);
        } else {
            return response()->json([
                'message' => "Pokemon with id $id not found."
            ], 404);
        }
    }
}
