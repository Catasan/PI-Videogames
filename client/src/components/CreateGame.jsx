import React, {useState, useEffect} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {getGenres, getPlatforms} from '../actions/index.js';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import styles from './CreateGame.module.css';

// function validate(input){
//     let errors = {};
//     let onlyNumbers = '^[0-9]+$'
//     let lettersAndNumbers = '^[A-Za-z0-9]+$'
//     if(input.name.length < 4){
//         errors.name = 'Name must be longer than 4 characters';
//     } if (input.name.length > 20){
//         errors.name = 'Name must be shorter than 20 characters';
//     } 
//     //if (input.name !== lettersAndNumbers){
//     //     errors.name = 'Name must contain ONLY letters and numbers';
//     // }
//     if (input.rating <= 0 || input.rating > 5){
//         errors.rating = 'A number between 1 and 5 must be provided';
//     // } else if (input.rating !== onlyNumbers){
//     //     errors.rating = 'Only numbers are accepted'
//     }
//     return errors;
// };


export default function CreateGame(){
    const dispatch = useDispatch()
    const genres = useSelector((state)=> state.genres)
    const history = useHistory()
    //const platforms = useSelector((state)=> state.platforms)
    const [input, setInput] = useState({ //estado nuevo para crear el vg, tener el formulario guardado
        name: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
    })
    const [errors, setErrors] = useState({
        name: 'Name is required',
        description:'A description is required' ,
        platforms: 'Platforms are required'
    })
    
    ////////////////////HANDLES/////////////////////////////
    //guardo todo lo que el user escribe en los inputs en mi estado input
    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value //el .name está en todos los inputs
        })
        //console.log(input)
        setErrors(validate({...input, [e.target.name]: e.target.value}));
    }

    function handleSelect(e){
        setInput({
            ...input,
            genres: [...input.genres, e.target.value] 
        }) 
        //console.log(input)
        setErrors(validate({...input, [e.target.name]: e.target.value}));
    }

    function handleSelectPlat(e){
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value] 
        })
        //console.log(input)
        setErrors(validate({...input, [e.target.name]: e.target.value}));
    }

    function handleSubmit(e){
        e.preventDefault();
        try{
            if(Object.keys(errors).length === 0){
                dispatch(postVideogame(input))
                alert("Videogame created successfuly!")
                // console.log('ESTE ES EL POSTA')
                // console.log(input)
                setInput({ //para que se ponga en blanco dsp
                    name: "",
                    description: "",
                    released: "",
                    rating: "",
                    genres:[],
                    platforms:[]
                })
                history.push('/home') //cuando se crea el VG, llevame al home
            } else {
                alert("Please complete the required fields properly")
            }
        } catch (error){
            alert(error)
        }
    }

    function handleDelete(e){
        setInput({
            ...input,
            genres: input.genres.filter(gen => gen !== e)
        })
    }
    function handleDeletePlat(e){
        setInput({
            ...input,
            platforms: input.platforms.filter(plat => plat !== e)
        })
    }
    //Para despachar la action
    useEffect(()=> {
        dispatch(getGenres());
    }, [dispatch])

    useEffect(()=> {
        dispatch(getPlatforms());
    }, [dispatch])


    function postVideogame(payload){
        return async function (dispatch){
            var json = await axios.post("http://localhost:3001/videogame", payload);
            console.log(json.data)
            return json
        }
    }

/////////////////ESTADOS PARA CONTROLAR EL FORM/////////////////////////
    function validate(input){
        let errors = {};
        if(input.name.length === 0) errors.name = "Name is required";
        else if (!/^[a-zA-Z\s]*$/.test(input.name)){
            errors.name = "Only letters are accepted"
        }
        if(input.description.length === 0) errors.description = "A description is required";
        else if (!/^[a-zA-Z\s]*$/.test(input.description)){
            errors.description = "Only letters are accepted"
        }
        if (parseFloat(input.rating) < 0 || parseFloat(input.rating) > 5)
        errors.rating = "Rating must be between 0 and 5";
        if (input.platforms.length === 0) {
            errors.platforms = "At least ONE platform is required";
        }
        return errors;
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
                    <p className={errors.name && "invalid"}>{errors.name}</p>
                </div>
                <div className={styles.description}>
                    <label>Description:</label>
                    <textarea
                    id="description"
                    type= "text"
                    value= {input.description}
                    name= "description"
                    onChange={(e)=>handleChange(e)}
                    required
                    />
                    <p className={errors.description && "invalid"}>{errors.description}</p>
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
                </div>
                <div className={styles.sections}>
                    <label>Rating:</label>
                    <input
                    id="rating"
                    type= "number"
                    value= {input.rating}
                    name= "rating"
                    step="0.1"
                    onChange={(e)=>handleChange(e)}
                    required
                    />
                    <p className={errors.rating && "invalid"}>{errors.rating}</p>
                </div>
                <div className={styles.sections} id='genres'>Genres:
                    <select onChange={(e) => handleSelect(e)}>
                        {/* <input 
                        id=""
                        type= "checkbox"
                        value= 'Action'
                        name= 'Action'
                        onChange={(e)=>handleSelect(e)}>
                    Action</input>*/}

                        {genres.map((gen)=>(
                            <option value={gen.name}>{gen.name}</option>
                        ))}
                        {/* <option value= 'All'>All</option>
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
                        <option value= 'Board Games'>Board Games</option> */}
                    </select>
                    <ul><li>{input.genres.map(e => e + " ")}</li></ul>{/*Para poder ir viendo los generos que eligen*/}
                    {input.genres.map(e =>
                <div>
                    <p>{e}</p>
                    <button onClick={()=> handleDelete(e)}>x</button>
                </div> 
                    )} 
                </div>
                <div className={styles.sections} id='platforms'>Platforms:
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
                    <ul><li>{input.platforms.map(e => e + " ")}</li></ul>{/*Para poder ir viendo los generos que eligen*/}
                    {input.platforms.map(e =>
                <div>
                    <p>{e}</p>
                    <button onClick={()=> handleDeletePlat(e)}>x</button>
                </div> 
                    )} 
                <p className={errors.platforms && "invalid"}>{errors.platforms}</p>
                </div>
                {/* <div id='platforms'>Platforms:
                    <select onChange={(e) => handleSelectPlat(e)}>
                        {platforms.map((plat)=>(
                            <option value={plat.name}>{plat.name}</option>
                        ))}
                    </select>
                </div> */}

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
                
                <button className={styles.button1} type='submit'>CREATE VIDEOGAME</button>
                
                    <NavLink className={styles.button} to= '/home'>GO BACK HOME</NavLink>
                
            </form>
        </div>
    )
}