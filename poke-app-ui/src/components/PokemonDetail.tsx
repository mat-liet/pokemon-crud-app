import React from 'react'
import './PokemonDetail.css';
import Modal from 'react-bootstrap/Modal';
import Pokemon from '../models/Pokemon';
import ProgressBar from 'react-bootstrap/ProgressBar';
import PokemonDetailModel from '../models/PokemonDetail';

function PokemonDetail(props: { showModal: boolean, setShowModal: any, pokemon: Pokemon, erroredResponse: boolean, detail: PokemonDetailModel }) {

    const pokemon: Pokemon = props.pokemon

    const detail: PokemonDetailModel = props.detail

    function capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    if (!props.erroredResponse) {
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
                    <div className="container">
                        <div className="image-and-text-container">
                            <div>
                                <h5>Physical attributes</h5>
                                <p>Weight: {Number(detail.weight) / 10}kg</p>
                                <p>Height: {Number(detail.height) * 10}cm</p>
                            </div>
                            <img src={detail.sprites.front_default} alt=""  className='sprite-img'/>
                        </div>
                        <hr />
                        <h5>Stats</h5>
                        <div>
                            <ul className="list-group">
                                {detail.stats.map((stat, index) => {
                                    return (
                                        <div key={index}>
                                            <li className="list-group-item">{capitalizeFirstLetter(stat.stat.name)} : {stat.base_stat}
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