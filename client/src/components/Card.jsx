import React from "react";
import styles from './Card.module.css'

export default function Card({name, img, genres, rating}){
    console.log(genres)
    return (
        <div className={styles.cardContainer} >
            <h3 className={styles.cardName}>{name}</h3>
            <img className={styles.cardImg} src={img} alt="img not found"/>
            {genres.map(gen=><h5 className={styles.cardGenres}>{gen}</h5>)}
            <h5 className={styles.cardRating}>{rating}</h5>
        </div>
    );
}