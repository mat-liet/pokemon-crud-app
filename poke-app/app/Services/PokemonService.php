<?php

namespace App\Services;

use App\Models\Pokemon;
use Illuminate\Support\Facades\DB;

class PokemonService
{
    public function create(string $name, string $type, string $move)
    {
        $pokemon = new Pokemon();
        $pokemon->name = $name;
        $pokemon->type = $type;
        $pokemon->move = $move;
        $pokemon->save();
        return $pokemon;
    }

    public function listAll(string $sortField)
    {
        if ($sortField == 'nameDesc') {
            return Pokemon::orderBy('name', 'desc')->paginate(12);
        } else if ($sortField == 'typeAsc') {
            return Pokemon::orderBy('type', 'asc')->paginate(12);
        } else if ($sortField == 'typeDesc') {
            return Pokemon::orderBy('type', 'desc')->paginate(12);
        } else {
            return Pokemon::orderBy('name', 'asc')->paginate(12);
        }
    }

    public function listFiltered(string $filter, string $sortField)
    {
        if ($sortField == 'nameDesc') {
            return DB::table('pokemon')
            ->where('name', 'like', "%$filter%")
            ->orderBy('name', 'desc')
            ->paginate(12);
        } else if ($sortField == 'typeAsc') {
            return DB::table('pokemon')
            ->where('name', 'like', "%$filter%")
            ->orderBy('type', 'asc')
            ->paginate(12);
        } else if ($sortField == 'typeDesc') {
            return DB::table('pokemon')
            ->where('name', 'like', "%$filter%")
            ->orderBy('type', 'desc')
            ->paginate(12);
        } else {
            return DB::table('pokemon')
            ->where('name', 'like', "%$filter%")
            ->orderBy('name', 'asc')
            ->paginate(12);
        }
    }

    public function find(string $id)
    {
        if (Pokemon::where('id', $id)->exists()) {
            $pokemon = Pokemon::find($id);
            return $pokemon;
        } else {
            return null;
        }
    }

    public function update(string $id, string $name, string $type, string $move)
    {
        if (Pokemon::where('id', $id)->exists()) {
            $pokemon = Pokemon::find($id);
            $pokemon->name = is_null($name) ? $pokemon->name : $name;
            $pokemon->type = is_null($type) ? $pokemon->type : $type;
            $pokemon->move = is_null($move) ? $pokemon->move : $move;
            $pokemon->save();
            return $pokemon;
        } else {
            return null;
        }
    }

    public function delete(string $id)
    {
        if (Pokemon::where('id', $id)->exists()) {
            Pokemon::where('id', $id)->delete();
            return true;
        } else {
            return false;
        }
    }
}
