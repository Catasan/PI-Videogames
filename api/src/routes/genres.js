require('dotenv').config(); //esto me deja usar la API KEY
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genre, Op} = require('../db.js');


//https://api.rawg.io/api/genres&key=2071c5de7b2244868dddfb549c2fb1e5
const router = Router();


router.get('/', async (req, res, next) => {
    try{
        //me traigo los genres
        const genresDB = await Genre.findAll()
    //console.log(genresDB)
        res.json(genresDB)
    }catch (error) { //cae en el error que esta seteado para que te mande el msj
        next(error)
    }
});

module.exports = router;