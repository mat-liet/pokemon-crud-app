<?php

namespace Tests\Unit;

use App\Models\Pokemon;
use App\Services\PokemonService;
use Tests\TestCase;

class PokemonServiceUnitTest extends TestCase
{
    public function testCreate(): void
    {
        $service = new PokemonService();
        $service->create('TestName', 'Bug', 'Woo');
        $pokemon = $service->find(1);
        $this->assertEquals($pokemon->name, 'TestName');
    }

    public function testListAll(): void
    {
        $service = new PokemonService();
        Pokemon::factory()->count(4)->create();
        $pokemon = $service->listAll("nameAsc");
        $this->assertCount(4, $pokemon);
    }

    public function testFilteredFind(): void
    {
        //Create 4 pokemon
        $pokemon1 = Pokemon::factory()->create([
            'name' => 'TestPokemon1',
            'type' => 'TestType1',
            'move' => 'TestMove1'
        ]);

        $pokemon2 = Pokemon::factory()->create([
            'name' => 'TestPokemon2',
            'type' => 'TestType2',
            'move' => 'TestMove2'
        ]);

        $pokemon3 = Pokemon::factory()->create([
            'name' => 'TestPokemon3',
            'type' => 'TestType3',
            'move' => 'TestMove3'
        ]);

        $pokemon4 = Pokemon::factory()->create([
            'name' => 'TestPokemon4',
            'type' => 'TestType4',
            'move' => 'TestMove4'
        ]);

        $service = new PokemonService();
        
        $pokemon = $service->listFiltered('TestPokemon', 'nameAsc');
        $this->assertCount(4, $pokemon);

        $pokemon = $service->listFiltered('pokemon1', 'nameAsc');
        $this->assertCount(1, $pokemon);

        $pokemon = $service->listFiltered('wooo','nameAsc');
        $this->assertCount(0, $pokemon);
    }

    public function testFindById(): void
    {
        $service = new PokemonService();
        $pokemonCreated = Pokemon::factory()->create();
        $pokemonReturned = $service->find(1);
        $this->assertNotNull($pokemonReturned);
        $this->assertEquals($pokemonCreated->id, $pokemonReturned->id);
        $this->assertEquals($pokemonCreated->name, $pokemonReturned->name);
        $this->assertEquals($pokemonCreated->type, $pokemonReturned->type);
        $this->assertEquals($pokemonCreated->move, $pokemonReturned->move);

        $pokemonReturned = $service->find(2);
        $this->assertNull($pokemonReturned);
    }

    public function testUpdate(): void
    {
        $service = new PokemonService();
        $pokemon = Pokemon::factory()->create([
            'name' => 'TestPokemon',
            'type' => 'TestType',
            'move' => 'TestMove'
        ]);
        $pokemonReturned = $service->find(1);
        $this->assertNotNull($pokemonReturned);
        $this->assertEquals($pokemon->id, $pokemonReturned->id);
        $this->assertEquals($pokemon->name, $pokemonReturned->name);
        $this->assertEquals($pokemon->type, $pokemonReturned->type);
        $this->assertEquals($pokemon->move, $pokemonReturned->move);

        $service->update(1, 'TestPokemon55', 'BugType', 'TestMove');
        $pokemonReturned = $service->find(1);
        $this->assertNotNull($pokemonReturned);
        $this->assertEquals($pokemonReturned->id, 1);
        $this->assertEquals($pokemonReturned->name, 'TestPokemon55');
        $this->assertEquals($pokemonReturned->type, 'BugType');
        $this->assertEquals($pokemonReturned->move, 'TestMove');
    }

    public function testDelete(): void
    {
        $service = new PokemonService();
        $pokemon = Pokemon::factory()->create([
            'name' => 'TestPokemon',
            'type' => 'TestType',
            'move' => 'TestMove'
        ]);
        //Check pokemon was created before we delete
        $pokemonReturned = $service->find(1);
        $this->assertNotNull($pokemonReturned);

        //It will now return null as it wont find a pokemon with the given id
        $service->delete(1);
        $pokemonReturned = $service->find(1);
        $this->assertNull($pokemonReturned);
    }
}
