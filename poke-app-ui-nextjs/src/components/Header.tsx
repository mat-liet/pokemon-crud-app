import React from 'react'
import Link from 'next/link'
import styles from './Header.module.css';

function Header() {
    return (
        <div className="container">
            <div className={styles.logo}>
                <span><img className={styles.pokeball} src="https://art.ngfiles.com/images/386000/386577_stardoge_8-bit-pokeball.png?f1446737358" alt="" /></span>
                <h1 className={styles.title}>Poke-App</h1>
                <span><img className={styles.pokeball} src="https://art.ngfiles.com/images/386000/386577_stardoge_8-bit-pokeball.png?f1446737358" alt="" /></span>
            </div>
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <Link className="nav-link" href="/">Add pokemon</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" href="/list">List of pokemon</Link>
                </li>
            </ul>
            <hr />
        </div>
    )
}

export default Header