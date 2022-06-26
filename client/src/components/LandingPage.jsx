import React from 'react';
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function LandingPage(){
    return(
            <div className={styles.landingImg}>
                <h1 className= {styles.welcome}>Welcome to Video Game Land</h1>
                <Link to ='/home'>
                    <button className={styles.button1}>PRESS START</button>
                </Link>
            </div>
    )
}

//ME FALTA AGREGAR LA IMAGEN