import requests
import json
import csv

offset = 0
response = requests.get(
    "https://pokeapi.co/api/v2/pokemon/", params={"offset": offset})
json_format = json.loads(response.text)

with open('pokemon.csv', 'w+', newline='') as file:
    while (json_format['next']):
        next = json_format['next']
        print(next)
        results = json_format['results']
        for result in results:
            response_pokemon = requests.get(result['url'])
            json_pokemon = json.loads(response_pokemon.text)
            name = json_pokemon['name']
            type = json_pokemon['types'][0].get('type').get('name')
            move = json_pokemon['moves'][0].get('move').get('name')
            array = [name, type, move]
            writer = csv.writer(file)
            writer.writerow(array)
        offset += 20
        response = requests.get(
            "https://pokeapi.co/api/v2/pokemon/", params={"offset": offset})
        json_format = json.loads(response.text)
        
        
