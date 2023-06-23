import { render, screen } from '@testing-library/react'
import PokemonForm from '../components/PokemonForm';
import userEvent from '@testing-library/user-event';

test("Pokemon form renders correctly", async () => {
    render(<PokemonForm setPokemons={undefined} searchString={''} addedPokemon={false} setAddedPokemon={undefined}/>);

    const name = screen.getByText(/Pokemon name/i);
    const type = screen.getByText(/Pokemon type/i);
    const move = screen.getByText(/Signature move/i);
    const addButton = screen.getByText(/Add pokemon/i);

    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(move).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
})