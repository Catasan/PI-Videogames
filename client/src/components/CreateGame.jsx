import React, {useState, useEffect} from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';
import {postVideogame, getGenres} from '../actions/index.js';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import styles from './CreateGame.module.css';

function validate(input){
    let errors = {};
    let onlyNumbers = '^[0-9]+$'
    let lettersAndNumbers = '^[A-Za-z0-9]+$'
    if(input.name.length < 4){
        errors.name = 'Name must be longer than 4 characters';
    } if (input.name.length > 20){
        errors.name = 'Name must be shorter than 20 characters';
    } 
    //if (input.name !== lettersAndNumbers){
    //     errors.name = 'Name must contain ONLY letters and numbers';
    // }
    if (input.rating <= 0 || input.rating > 5){
        errors.rating = 'A number between 1 and 5 must be provided';
    // } else if (input.rating !== onlyNumbers){
    //     errors.rating = 'Only numbers are accepted'
    }
    return errors;
};


export default function CreateGame(){
    const dispatch = useDispatch()
    const genres = useSelector((state)=> state.genres)
    const history = useHistory()
    const [errors, setErrors] = useState({});
    const platforms = useSelector((state)=> state.platforms)


    const [input, setInput] = useState({ //estado nuevo para crear el vg, tener el formulario guardado
        name: "",
        description: "",
        released: "",
        rating: "",
        genre: [],
        platform: [],
    })
    
    //guardo todo lo que el user escribe en los inputs en mi estado input
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value //el .name está en todos los inputs
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
    }
    //si está checked, pasale el nuevo status para checkbox
    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                status: e.target.value
            })
        }
    }

    function handleSelect(e){
        setInput({
            ...input,
            genres: [...input.genre, e.target.value] 
        })
    }

    function handleSelectPlat(e){
        setInput({
            ...input,
            platforms: [...input.platform, e.target.value] 
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input)
        dispatch(postVideogame(input))
        alert("Videogame created successfuly!")
        setInput({ //para que se ponga en blanco dsp
            name: "",
            description: "",
            released: "",
            rating: "",
            genre: [],
            platform: []
        })
        history.push('/home') //cuando se crea el VG, llevame al home
    }

    function handleDelete(e){
        setInput({
            ...input,
            genre: input.genre.filter(gen => gen !== e)
        })
    }
    //Para despachar la action
    useEffect(()=> {
        dispatch(getGenres());
    }, [])

    function postVideogame(payload){
        return async function (dispatch){
            var json = await axios.post("http://localhost:3001/videogame", payload);
            console.log(json.data)
            return json
        }
    }

    return(
        <div className={styles.createImg}>
            <h1>Create your own videogame</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className={styles.sections}>
                    <label>Name:</label>
                    <input className={styles.input}
                    id="name"
                    type= "text"
                    value= {input.name}
                    name= "name"
                    onChange={(e)=>handleChange(e)}
                    required
                    />
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <div className={styles.sections}>
                    <label>Description:</label>
                    <input
                    id="description"
                    type= "text"
                    value= {input.description}
                    name= "description"
                    onChange={(e)=>handleChange(e)}
                    required
                    />
                    {errors.description && (
                        <p>{errors.description}</p>
                    )}
                </div>
                <div className={styles.sections}>
                    <label>Released:</label>
                    <input
                    id="released"
                    type= "date"
                    value= {input.released}
                    name= "released"
                    onChange={(e)=>handleChange(e)}
                    required
                    />
                    {errors.released && (
                        <p>{errors.released}</p>
                    )}
                </div>
                <div className={styles.sections}>
                    <label>Rating:</label>
                    <input
                    id="rating"
                    type= "text"
                    value= {input.rating}
                    name= "rating"
                    onChange={(e)=>handleChange(e)}
                    required
                    />
                    {errors.rating && (
                        <p>{errors.rating}</p>
                    )}
                </div>
                <div className={styles.sections} id='genres'>Genres:
                    <select onChange={(e) => handleSelect(e)}>
                        <option value= ""></option>

                        {/*{genres.map((gen)=>(
                            <option value={gen.name}>{gen.name}</option>
                        ))}*/}
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
                </div>
                <div className={styles.sections}>Platforms:
                    <select onChange={(e) => handleSelectPlat(e)}>
                        <option value= ""></option>
                        <option value= 'PC'>PC</option>
                        <option value= 'PlayStation'>Play Station</option>  
                        <option value= 'Xbox'>Xbox</option>
                        <option value='iOS' >iOS</option>
                        <option value= 'Android'>Android</option>  
                        <option value= 'Apple Macintosh'>Mac</option>
                        <option value= 'Linux'>Linux</option>
                        <option value= 'Nintendo'>Nintendo</option>  
                        <option value= 'Atari'>Atari</option>
                        <option value= 'Commodore / Amiga'>Commodore / Amiga</option>
                        <option value= 'SEGA'>SEGA</option>  
                        <option value= '3DO'>3DO</option>
                        <option value= 'Neo Geo'>Neo Geo</option>
                        <option value= 'Web'>Web</option>  
                    </select>
                </div>
                {/*<div>Platforms:
                    <select onChange={(e) => handleSelectPlat(e)}>
                        {platforms.map((plat)=>(
                            <option value={plat.name}>{plat.name}</option>
                        ))}
                    </select>
                        </div>*/}
                <div className={styles.sections}>
                    <label>New genre:</label>
                    <input
                    id="newGenre"
                    type= "text"
                    
                    name= "new genre"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <div className={styles.sections}>
                    <label>New platform:</label>
                    <input
                    id="newPlatform"
                    type= "text"                
                    name= "new platform"
                    onChange={(e)=>handleChange(e)}
                    />
                </div>
                <ul><li>{input.genre.map(e => e.name + " ,")}</li></ul>{/*Para poder ir viendo los generos que eligen*/}
                <button className={styles.button1} type='submit'>CREATE VIDEOGAME</button>
                
                    <NavLink className={styles.button} to= '/home'>GO BACK HOME</NavLink>
                
            </form>
            
            {input.genre.map(e =>
                <div>
                    <p>{e}</p>
                    <button onClick={()=> handleDelete(e)}>x</button>
                </div>
                    )}


        </div>
    )
}