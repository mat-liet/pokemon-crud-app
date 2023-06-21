import React, { useEffect, useState } from 'react'
import './PokemonDetail.css';
import Modal from 'react-bootstrap/Modal';
import Pokemon from '../models/Pokemon';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';

function PokemonDetail(props: { showModal: boolean, setShowModal: any, pokemon: Pokemon }) {

    const pokemon: Pokemon = props.pokemon

    const [detail, setDetail] = useState({ weight: "", height: "", stats: [{ base_stat: "", stat: { name: "" } }] });

    const [erroredResponse, setErroredResponse] = useState(false);

    useEffect(() => {
        let url = `https://pokeapi.co/api/v2/pokemon/${pokemon.name.toLowerCase()}/`
        axios.get(url)
            .then(response => {
                console.log(response)
                setDetail(response.data)
            })
            .catch(error => {
                console.log(error)
                setErroredResponse(true)
            })
    }, [setDetail])

    function capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    if (!erroredResponse) {
        return (
            <Modal
                size="lg"
                show={props.showModal}
                backdrop="static"
                onHide={() => props.setShowModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                scrollable={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Name: {pokemon.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <h5>Physical attributes</h5>
                        <p>Weight: {Number(detail.weight) / 10}kg</p>
                        <p>Height: {Number(detail.height) * 10}cm</p>
                        <hr />
                        <h5>Stats</h5>
                        <div>
                            <ul className='list-group'>
                                {detail.stats.map((stat) => {
                                    return (
                                        <div>
                                            <li className='list-group-item'>{capitalizeFirstLetter(stat.stat.name)} : {stat.base_stat}
                                                <ProgressBar className="progress" min={0} max={255} now={Number(stat.base_stat)}></ProgressBar>
                                            </li>

                                        </div>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )

    } else {
        return (
            <Modal
                size="lg"
                show={props.showModal}
                backdrop="static"
                onHide={() => props.setShowModal(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                scrollable={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Name: {pokemon.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    No extra details available for this pokemon!
                </Modal.Body>
            </Modal>
        )
    }

}

export default PokemonDetail