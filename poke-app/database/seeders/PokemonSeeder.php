<?php

namespace Database\Seeders;

use App\Models\Pokemon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PokemonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Pokemon::truncate();
        $csvData = fopen(base_path('database/csv/pokemon.csv'), 'r');
        $transRow = true;
        while (($data = fgetcsv($csvData, 555, ',')) !== false) {
            if (!$transRow) {
                Pokemon::create([
                    'name' => $data['0'],
                    'type' => $data['1'],
                    'move' => $data['2'],
                ]);
            }
            $transRow = false;
        }
        fclose($csvData);
    }
}
