import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Pokemon from '../models/Pokemon';
import axios from 'axios';
import { PokemonBaseStat } from '../models/PokemonDetailModels';

function PokemonDetail(props: { showModal: boolean, setShowModal: any, pokemon: Pokemon }) {

    const pokemon: Pokemon = props.pokemon

    const [detail, setDetail] = useState({ weight: "", height: "", stats: [{ base_stat: "", stat: { name: "" } }] });

    useEffect(() => {
        let url = `https://pokeapi.co/api/v2/pokemon/bulbasaur/`
        axios.get(url)
            .then(response => {
                console.log(response)
                setDetail(response.data)
                console.log(detail)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <Modal
            size="lg"
            show={props.showModal}
            backdrop="static"
            onHide={() => props.setShowModal(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Name: {pokemon.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='container'>
                    <h5>Physical attributes</h5>
                    <p>Weight: {detail.weight}</p>
                    <p>Height: {detail.height}</p>
                    <hr />
                    <h5>Stats</h5>
                    <div>
                        <ul>
                            {detail.stats.map((stat) => <li>{stat.stat.name} : {stat.base_stat}</li>)}
                        </ul>
                    </div>
                </div>

            </Modal.Body>
        </Modal>
    )
}

export default PokemonDetail