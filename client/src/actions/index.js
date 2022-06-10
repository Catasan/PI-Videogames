import axios from 'axios';

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES';
export const GET_VIDEOGAME_DETAIL = 'GET_VIDEOGAME_DETAIL';
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME';

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
