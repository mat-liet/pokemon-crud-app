<?php

namespace Tests\Feature;

use App\Models\Pokemon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiTest extends TestCase
{
    use RefreshDatabase;
    public function testCreateEndpoint(): void
    {
        $response = $this->postJson('/api/pokemon', ['name' => 'Bulbasaur', 'type' => 'Grass', 'move' => 'Cut']);
        $response
            ->assertStatus(200)
            ->assertExactJson([
                'id' => 1,
                'name' => 'Bulbasaur',
                'type' => 'Grass',
                'move' => 'Cut'
            ]);
    }

    public function testGetAllEndpoint(): void
    {
        $pokemon = Pokemon::factory()->count(4)->create();
        $response = $this->get('/api/pokemon');
        $response->assertStatus(200);
        $response->assertJsonCount(4);
    }

    public function testGetEndpoint(): void
    {
        $pokemon = Pokemon::factory()->create();
        $response = $this->get('/api/pokemon/1');
        $response->assertStatus(200);
        $response->assertExactJson($pokemon->jsonSerialize());

        //Negative scenario - pokemon doesnt exist
        $response = $this->get('/api/pokemon/2');
        $response->assertStatus(404);
        $response->assertSee('Pokemon with id 2 not found.');
    }

    public function testUpdateEndpoint(): void
    {
        $pokemon = Pokemon::factory()->create();

        // First we get the pokemon we created and check it equals what we created
        $response = $this->get('/api/pokemon/1');
        $response->assertStatus(200);
        $response->assertExactJson($pokemon->jsonSerialize());

        //We update the pokemon to these values
        $response = $this->putJson('/api/pokemon/1', ['name' => 'TestValue', 'type' => 'Test', 'move' => 'Test move']);
        $response->assertStatus(200);

        // Now we get the pokemon we created and check it equals what we updated it to
        $response = $this->get('/api/pokemon/1');
        $response
            ->assertStatus(200)
            ->assertExactJson([
                'id' => 1,
                'name' => 'TestValue',
                'type' => 'Test',
                'move' => 'Test move'
            ]);

        //Test negative scenario when we try to update a pokemon that doesnt exist - should be 404
        $response = $this->putJson('/api/pokemon/2', ['name' => 'TestValue', 'type' => 'Test', 'move' => 'Test move']);
        $response->assertStatus(404);
        $response->assertSee('Pokemon with id 2 not found.');
    }

    public function testDeleteEndpoint(): void
    {
        $pokemon = Pokemon::factory()->create();
        $response = $this->delete('/api/pokemon/1');
        $response->assertStatus(200);

        //Negative scenario - pokemon with id 2 doesnt exist
        $response = $this->delete('/api/pokemon/2');
        $response->assertStatus(404);
        $response->assertSee('Pokemon with id 2 not found.');

    }

    public function testGetFilteredPokemon(): void
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

        //Filter on the first pokemon name
        $response = $this->get('/api/pokemon?filter_name=pokemon1');
        $response->assertStatus(200);
        $response->assertJsonCount(1);

        //Filter so that all return
        $response = $this->get('/api/pokemon?filter_name=TestPokemon');
        $response->assertStatus(200);
        $response->assertJsonCount(4);

        //Filter so that none return
        $response = $this->get('/api/pokemon?filter_name=blahblah');
        $response->assertStatus(200);
        $response->assertJsonCount(0);
    }
}
