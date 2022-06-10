import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideogames } from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card'
import Pagination from './Pagination';

export default function Home () {
    const dispatch = useDispatch() //xa ir despachando las acciones
    const allVideogames = useSelector((state) => state.videogames) // traigo todo lo que esta en el state de videogames
    
    //////// LOGICA PAGINADO //////////
    const [currentPage, setCurrentPage] = useState(1); //pagina actual
    const [videogamesPerPage, setVideogamesPerPage] = useState(15); //otro estado local con la cant de vg por página
    const indexOfLastVideogame = currentPage * videogamesPerPage // =
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage // = 
    //me traigo el arreglo del estado, me trae del reducer todos los vg. El slice no me toma el ultimo
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)

    // ej: 
    //1 -> 0 al 15
    //2 -> 15 al 30

    const pagination = (pageNumber) => (
        setCurrentPage(pageNumber)
    )

    
    useEffect(() => {
        dispatch(getAllVideogames());
    },[]) //[] para que no se genere un loop infinito


function handleClick(e){
    e.preventDefault();
    dispatch(getAllVideogames());
}

return (
    <div>
        <Link to= '/videogame'>Create Game</Link>
        <h1>Video Game Land</h1>
        <button onClick={e=> {handleClick(e)}}>
            Load all video games
        </button>
        <div>
            <select>
                <option value= 'asc'>Ascendant</option>  
                <option value= 'desc'>Descendant</option>
            </select>
            <select>
                <option value= 'All'>All</option>
                <option value= 'Action'>Action</option>
                <option value= 'RPG'>RPG</option>
                <option value= 'Indie'>Indie</option>
                <option value= 'Adventure'>Adventure</option>
                <option value= 'Strategy'>Strategy</option>
                <option value= 'Shooter'>Shooter</option>
                <option value= 'Casual'>Casual</option>
                <option value= 'Simulation'>Simulation</option>
                <option value= 'Arcade'>Arcade</option>
                <option value= 'Platformer'>Platformer</option>
                <option value= 'Puzzle'>Puzzle</option>
                <option value= 'Racing'>Racing</option>
                <option value= 'Sports'>Sports</option>
                <option value= 'Massively Multiplayer'>Massively Multiplayer</option>
                <option value= 'Fighting'>Fighting</option>
                <option value= 'Family'>Family</option>
                <option value= 'Educational'>Educational</option>
                <option value= 'Card'>Card</option>
                <option value= 'Board Games'>Board Games</option>
            </select>
            <select>
                <option value='All'>All</option>
                <option value='Created'>Created</option>
                <option value='Api'>Existant</option>
            </select>
        <Pagination
        videogamesPerPage = {videogamesPerPage}
        allVideogames = {allVideogames.length}
        pagination = {pagination}
        />
        {currentVideogames?.map((e) => {
            return (
                <fragment>
                    <Link to={"/home/" + e.id}>
                        <Card name={e.name} img={e.img} genres={e.genres}/>
                    </Link>
                </fragment>
            )    
        })
        }
        </div>
    </div>
)}