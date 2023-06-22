<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pokemon;
use App\Services\PokemonService;
use Illuminate\Support\Facades\DB;

class PokemonController extends Controller
{

    private PokemonService $pokemonService;

    public function __construct(PokemonService $pokemonService)
    {
        $this->pokemonService = $pokemonService;
    }
    public function create(Request $request)
    {
        return response()->json($this->pokemonService->create($request->name, $request->type, $request->move));
    }

    public function list(Request $request)
    {
        if ($request->has('filter_name') && $request->filter_name !== null) {
            return response()->json($this->pokemonService->listFiltered($request->filter_name));
        } else {
            return response()->json($this->pokemonService->listAll());
        }
    }

    public function find($id)
    {
        $pokemon = $this->pokemonService->find($id);
        if ($pokemon !== null) {
            return response()->json($this->pokemonService->find($id));
        } else {
            return response()->json([
                'message' => "Pokemon with id $id not found."
            ], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $updatedSuccessfully = $this->pokemonService->update($id, $request->name, $request->type, $request->move);
        if ($updatedSuccessfully) {
            return response()->json([
                'message' => "Pokemon with id $id updated."
            ], 200);
        } else {
            return response()->json([
                'message' => "Pokemon with id $id not found."
            ], 404);
        }
    }

    public function delete($id)
    {
        $deletedSuccessfully = $this->pokemonService->delete($id);
        if ($deletedSuccessfully) {
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
