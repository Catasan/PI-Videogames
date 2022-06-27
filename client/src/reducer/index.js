

import {GET_ALL_VIDEOGAMES, FILTER_BY_GENRE, FILTER_CREATED, GET_DETAIL, CREATE_VIDEOGAME, ORDER_BY_NAME, GET_VIDEOGAMES_NAME, GET_GENRES, GET_PLATFORMS} from '../actions/index';

const initialState = {
    videogames: [],
    allVideogames: [], //la voy a usar de backup para siempre traerme todo y renderizar en las otras
    genres: [],
    detail: {},
};

const rootReducer = (state = initialState, action) => {
    
    switch(action.type) {
        case GET_ALL_VIDEOGAMES:
            return{
                ...state,
                videogames: action.payload, //devuelve todo lo que se le pasó en el payload de la action
                allVideogames: action.payload //me genero otra variable con todo
            }
            case GET_VIDEOGAMES_NAME:
                return{
                    ...state,
                    videogames: action.payload //pq estoy renderizando ese arreglo
                }
            case GET_PLATFORMS:
                return {
                    ...state,
                    platforms: action.payload
                }
            case GET_GENRES:
                return{
                    ...state, 
                    genres: action.payload
                }
            case FILTER_BY_GENRE:
                const allVideogames2 = [...state.videogames];
                const genreFiltered = action.payload === 'All' ? allVideogames2 : allVideogames2.filter(e => e.genres.includes(action.payload))
                return {
                ...state,
                videogames: genreFiltered
                }
                case FILTER_CREATED:
                const allVideogames1 = [...state.allVideogames];
                //filtrame los vg por los creados en la db y sino por el resto
                const createdFilter = action.payload === 'Created' ? allVideogames1.filter(e => e.createdInDb) : allVideogames1.filter(e => !e.createdInDb)
                    return {
                        ...state,
                        videogames: action.payload === 'All' ? state.allVideogames : createdFilter //
                    }
                    case ORDER_BY_NAME: //busco de forma asc, dsp sino desc, devuelvo sortedArray
                        let sortedArray = [...state.allVideogames]
                        if (action.payload === 'asc') {
                            sortedArray.sort(function (a, b){
                            if (a.name > b.name){
                                return 1;
                            }
                            if (b.name > a.name){
                                return -1;
                            }
                            return 0;
                        })
                    } if (action.payload === 'desc') {
                        sortedArray.sort(function (a, b){ //descendente
                            if (a.name > b.name){
                                return -1;
                            }
                            if (b.name > a.name){
                                return 1;
                            }
                            return 0;
                        })
                        }
                        if (action.payload === 'ratingAsc'){
                            sortedArray.sort(function (a, b){ //descendente
                                return a.rating - b.rating  //como son numeros me da a var 1, 0 o -1    
                            })
                        }
                        if (action.payload === 'ratingDesc') {
                            sortedArray.sort(function (a, b){ //descendente
                                return b.rating - a.rating      
                            })
                        }
                        return {
                            ...state,
                            videogames: sortedArray,
                        }
                        case GET_DETAIL:
                            return{
                                ...state,
                                detail: action.payload
                            }
            default: return state;
    }
}

export default rootReducer;