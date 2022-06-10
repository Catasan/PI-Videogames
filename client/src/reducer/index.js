

import {GET_ALL_VIDEOGAMES, GET_VIDEOGAME_DETAIL, CREATE_VIDEOGAME} from '../actions/index';

const initialState = {
    videogames: []
};

const rootReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case GET_ALL_VIDEOGAMES:
            return{
                ...state,
                videogames: action.payload //devuelve todo lo que se le pasó en el payload de la action
            }
            default: return state;
    }
}

export default rootReducer;