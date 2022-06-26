import axios from 'axios';
require('dotenv').config(); //esto me deja usar la API KEY
const { API_KEY } = process.env;

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const FILTER_CREATED = 'FILTER_CREATED';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const GET_VIDEOGAMES_NAME = 'GET_VIDEOGAMES_NAME';
export const GET_GENRES = 'GET_GENRES';
export const POST_VIDEOGAME = 'POST_VIDEOGAME';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const GET_DETAIL = 'GET_DETAIL';


//actions:

export const getAllVideogames = () => {
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/videogames"); //conexion back-front
        dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: json.data
        })
    }
}

export function getVideogamesName (name){ // es el name del vg que me llega
    return async function (dispatch){
        try{
        var json = await axios.get(`http://localhost:3001/videogames?name=${name}`);
        return dispatch({
            type: GET_VIDEOGAMES_NAME,
            payload: json.data //me devuelve lo que me devuela la ruta
        })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getGenres(){
    return async function (dispatch){
        var json = await axios.get("http://localhost:3001/genres", {});
        return dispatch({
            type: GET_GENRES,
            payload: json.data
        })
    }
}
//Ver como hacer para traerme las PLATFORMS
// export function getPlatforms(){
//     return async function (dispatch){ //buscar la forma de que me traiga solo las platforms
//         var json = await axios.get("http://localhost:3001/videogames", {});
//         return dispatch({
//             type: GET_PLATFORMS,
//             payload: json.data 
//         })
//     }
// }

//para crear el videogame
// export function postVideogame(payload){
//     return async function (dispatch){
//         var json = await axios.post("http://localhost:3001/videogame", payload);
//         console.log(json)
//         return json
//     }
// }

export function filteredByGenre(payload){ //el payload es el value del input
    console.log(payload)
    return {
        type: FILTER_BY_GENRE,
        payload
    }
}

export function filterCreated (payload){ //filtrar por existentes y creados
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function orderByName (payload){
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

//DETALLE DE CADA VG
export function getDetail(id){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/videogame/" + id);
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    }
}




