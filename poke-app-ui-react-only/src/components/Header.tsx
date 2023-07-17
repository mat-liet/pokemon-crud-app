import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div className="container">
            <div className="logo">
                <span><img className="img-pokeball" src="https://art.ngfiles.com/images/386000/386577_stardoge_8-bit-pokeball.png?f1446737358" alt="" /></span>
                <h1 className="title">Poke-App</h1>
                <span><img className="img-pokeball" src="https://art.ngfiles.com/images/386000/386577_stardoge_8-bit-pokeball.png?f1446737358" alt="" /></span>
            </div>
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Add pokemon</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/list">List of pokemon</Link>
                </li>
            </ul>
            <hr />
        </div>
    )
}

export default Header