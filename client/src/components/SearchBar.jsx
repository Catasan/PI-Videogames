import React from 'react';
import {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getVideogamesName } from '../actions';
import styles from './SearchBar.module.css';

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState("")//seteo un estado local

    function handleInputChange(e){ 
        e.preventDefault()
        setName(e.target.value) //el value del input toma el value del state
        console.log(name)
    }

    function handleSubmit(e){ 
        e.preventDefault()
        dispatch(getVideogamesName(name)) //name es mi estado local que lo estan pasando en la search bar
        console.log(name)
    }

    return (
        <div className={styles.searchBar}>
            <input className={styles.input}
            type = 'text'
            placeholder = "Search..."
            onChange = {(e) => handleInputChange(e)}
            />
            <button className={styles.button1} type='submit' onClick = {(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}