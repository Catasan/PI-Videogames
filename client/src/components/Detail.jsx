import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getDetail} from '../actions/index.js';
import {useDispatch, useSelector} from 'react-redux';
import styles from './Detail.module.css'
export default function Detail(props){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(props.match.params.id));
    },[dispatch, props.match.params.id])

    const videogameSelected = useSelector((state) => state.detail)
    console.log(videogameSelected)
    return (
    <div className={styles.createImg}>
        <div className={styles.cardCont}>
            {videogameSelected.id ?
                <div>
                    <h1 className={styles.cardName}>{videogameSelected.name}</h1>
                    <img className={styles.cardImg} src= {videogameSelected.img} alt=""/>
                    {videogameSelected.id.toString().length < 10 ?
                    <h3 className={styles.cardGenres}>Genres: {videogameSelected.genres.map(e => e + (', '))}</h3> :
                    <h3 className={styles.cardGenres}>Genres: {videogameSelected.genres.map(e => e.name + (', '))} </h3> }
                    <div className={styles.descriptionCont}>
                        <h5 className={styles.cardDescription}>Description: {videogameSelected.description}</h5>
                    </div>
                    <h5 className={styles.cardReleased}>Released: {videogameSelected.released}</h5>
                    <h5 className={styles.cardRating}>Rating: {videogameSelected.rating}</h5>
                    {videogameSelected.id.toString().length < 10 ?
                    <h5 className={styles.cardPlatforms}> Platforms: {videogameSelected.platforms.map(e => e.platform.name + (', '))}</h5> : <h5 className={styles.cardPlatforms}>Platforms: {videogameSelected.platforms.join(', ')}</h5>}
                </div> : <p>Loading...</p>
            }
            <Link to= '/home'>
                <button className={styles.button}>Go back home</button>
            </Link>
        </div>
    </div>
    )
};