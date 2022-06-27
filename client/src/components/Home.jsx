import React from 'react';
import {Link, NavLink} from 'react-router-dom';
//importo hooks
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//importo las actions
import { getAllVideogames, filteredByGenre, filterCreated, orderByName, getGenres } from '../actions';
//importo los componentes
import Card from './Card'
import Pagination from './Pagination';
import SearchBar from './SearchBar';
import styles from './Home.module.css';

//Empieza la HOME
export default function Home () {
    const dispatch = useDispatch() //xa ir despachando las acciones
    const allVideogames = useSelector((state) => state.videogames) // traigo todo lo que esta en el state de videogames
    const genres = useSelector((state) => state.genres)
    console.log(allVideogames)
    
    //////// LOGICA PAGINADO //////////
    const [currentPage, setCurrentPage] = useState(1); //pagina actual
    const [videogamesPerPage, setVideogamesPerPage] = useState(15); //otro estado local con la cant de vg por página
    const indexOfLastVideogame = currentPage * videogamesPerPage // =
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage // = 
    //me traigo el arreglo del estado, me trae del reducer todos los vg. El slice no me toma el ultimo
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
    const [order, setOrder] = useState('')
    // ej: 
    //1 -> 0 al 15
    //2 -> 15 al 30

    const pagination = (pageNumber) => (
        setCurrentPage(pageNumber)
    )

    
    useEffect(() => {
        dispatch(getAllVideogames());
        dispatch(getGenres());
    },[dispatch]) //[] para que no se genere un loop infinito
    


function handleClick(e){
    e.preventDefault();
    dispatch(getAllVideogames());
}
// Este handle va a usar la accion de filtrado
function handleFilterGenre(e){ //Pasarla cuando se modifique el select de genre. 
    dispatch(filteredByGenre(e.target.value))
}

function handleFilterCreated (e){
    dispatch(filterCreated(e.target.value)) // me llega la action por el payload
}

function handleSort (e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`) //para que me haga la modificacion le seteo un state
}


return (
    <div className= {styles.home}>
        <div>
            <div className= {styles.topBar}>
            <h1 className= {styles.htitle}>Video Game Land</h1>
                <NavLink className= {styles.btnCG} to= '/videogame'>CREATE YOUR GAME</NavLink>
                <SearchBar/>
                <div className= {styles.divContainer}>
                    <select className={styles.selectCont} onChange={e => handleSort(e)}>
                        <option value= "">Order</option>
                        <option value= 'asc'>A-Z</option>  
                        <option value= 'desc'>Z-A</option>
                        <option value= 'ratingAsc'>Rating Ascendant</option>  
                        <option value= 'ratingDesc'>Rating Descendant</option>
                    </select>
                    <select className={styles.selectCont} onChange={e => handleFilterGenre(e)}>
                    {genres.map((gen)=>(
                            <option value={gen.name}>{gen.name}</option>
                        ))}
                    </select>
                    <select className={styles.selectCont} onChange={e => handleFilterCreated(e)}>
                        <option value= "">Type</option>
                        <option value='All'>All</option>
                        <option value='Created'>Created</option>
                        <option value='Api'>Existant</option>
                    </select>
                    <button className={styles.selectCont} onClick={e=> {handleClick(e)}}>Load all video games</button>
                </div>
                <Pagination
                videogamesPerPage = {videogamesPerPage}
                allVideogames = {allVideogames.length}
                pagination = {pagination}
                />
            </div>
            <div className= {styles.allCards}>
            {currentVideogames?.map((e) => {
            return (
                <div>
                <fragment>
                    <Link  to={"/home/" + e.id}>
                        <Card  name={e.name} img={e.img} genres={e.genres} rating={e.rating} key={e.id}/>
                    </Link>
                </fragment>
                </div>
                )    
            })
            }
            </div>
        </div>
            <Pagination className={styles.bottomPages}
            videogamesPerPage = {videogamesPerPage}
            allVideogames = {allVideogames.length}
            pagination = {pagination}
            />
    </div>
)}