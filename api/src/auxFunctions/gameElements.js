// require("dotenv").config();
// const { API_KEY } = process.env; 
// const axios = require('axios');
// const {Genre, Videogame} = require('../db.js');

module.exports = function gameElements(ans){ 
    return {
        id: ans.id,
        name: ans.name,
        img: ans.background_image,
        genres: ans.genres.map(game => game.name),
        description: ans.description,
        released: ans.released,
        rating: ans.rating,
        platforms: ans.platforms.map(game => game),
    }
};
