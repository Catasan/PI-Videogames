require('dotenv').config(); //esto me deja usar la API KEY
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genre, Op} = require('../db.js');

const router = Router();

router.get('/', async (req, res) => {
    const totalGames = []; 
    const { name } = req.query;
    if (name) { //si viene por name
        totalGames.push(axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`));
        totalGames.push(Videogame.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%` //por si me mandan con mayusculas y minusculas
                }
            }})
        );
    } else { //si no me viene por name, busco todos los games
    for (var i = 1; i < 6; i++){
        totalGames.push(axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
        );
    }
    totalGames.push(Videogame.findAll({ //pusheo los games de la DB
        include: [{
            model: Genre,
            as: 'genres',
            attributes: ['id', 'name']
        }]
    })) 
    }
    const response = await Promise.allSettled(totalGames); //espero a que todas las promesas se resuelvan
    //console.log(response)
    const okGames = response.filter(res => res.status === 'fulfilled'); //fulfilled o rejected
    const resGames = [];
    okGames.pop().value.forEach(game => {
        resGames.push({ //los juegos de la DB
            name: game.name, 
                id: game.id,
                img: game.background_image,
                genres: game.genres.map(game => game.name),
                released: game.released,
                rating: game.rating,
                platforms: game.platforms.map(game => game),
                createdInDb: game.createdInDb
        })
    })
    okGames.forEach(obj => { //los juegos de la API
        
        obj.value.data.results.forEach(game => {
        resGames.push({
            name: game.name, 
                id: game.id,
                img: game.background_image,
                genres: game.genres.map(game => game.name),
                released: game.released,
                rating: game.rating,
                platforms: game.platforms.map(game => game)
        })
    })
})
return res.status(200).json(resGames) ;
return res.status(404).send('No games found')
        //push a resGAmes un objeto nuevo con lo que me devuelve que yo quiero de la DB
        //value: tiene objetos
        //return con lo que yo quiero afgarrar de la DB
    //res.json(response[0].data.results);
});


module.exports = router;