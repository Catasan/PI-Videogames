// require("dotenv").config(); //esto me deja usar la API KEY
// const { API_KEY } = process.env;
// const axios = require("axios");
// const { Genre } = require("../db");

// module.exports = async function activeGenres(){
//     try {
//         const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
//         const genres = genresApi.data.results.map(gen => {
//             return {
//                 name: gen.name
//             }
//         });
//         genres.map (gen => { //otro map para cada uno de esos arreglos
//             Genre.findOrCreate({
//                 where: {name: gen.name}
//             })
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

const axios = require('axios');
const {Genre} = require('../db.js');
require("dotenv").config();
const { API_KEY } = process.env; 

module.exports = async function activeGenres(){ 
    try { 
        const genresApi = await axios.get( `https://api.rawg.io/api/genres?key=${API_KEY}`) 
        // console.log(getGenresApi.data.results) 
        let genres = genresApi.data.results.map(genre => { 
            return { name: genre.name } 
        }) 
        genres.map(genre => { 
            Genre.findOrCreate({ 
                where: {
                    name: genre.name
                } 
            }) 
        }) 
    } catch(error) { 
        console.log(error) 
    }
};