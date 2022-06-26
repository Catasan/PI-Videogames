import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getDetail} from '../actions/index.js';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Detail.module.css'
export default function Detail(props){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    },[dispatch])

    const videogameSelected = useSelector((state) => state.detail)
    console.log(videogameSelected.platforms)
    return (
        <div className={styles.cardCont}>
            {videogameSelected.name ?
                <div>
                    <h1 className={styles.cardName}>{videogameSelected.name}</h1>
                    <img className={styles.cardImg} src= {videogameSelected.img} alt=""/>
                    <h3 className={styles.cardGenres}>Genres: {videogameSelected.genres.map(e => e + (', '))}</h3>
                    <div className={styles.descriptionCont}>
                        <h5 className={styles.cardDescription}>Description: {videogameSelected.description}</h5>
                    </div>
                    <h5 className={styles.cardReleased}>Released: {videogameSelected.released}</h5>
                    <h5 className={styles.cardRating}>Rating: {videogameSelected.rating}</h5>
                    <h5 className={styles.cardPlatforms}> Platforms: {videogameSelected.platforms.map(e => e.platform.name + (', '))}</h5>
                </div> : <p>Loading...</p>
            }
            <Link to= '/home'>
                <button className={styles.button}>Go back home</button>
            </Link>
        </div>
    )
};