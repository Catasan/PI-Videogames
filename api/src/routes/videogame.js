require('dotenv').config(); //esto me deja usar la API KEY
const { Router } = require('express');
const axios = require('axios');
const { API_KEY } = process.env;
const { Videogame, Genre, Op} = require('../db.js')
const gameElements = require('../auxFunctions/gameElements.js')

const router = Router();


router.post('/', async (req, res, next) => {
    const {
        name,
        img,
        description,
        released,
        rating,
        platforms,
        genres,
    } = req.body;
    try{
        const videogameCreated = await Videogame.create({
            name,
            img,
            description,
            released,
            rating,
            platforms,
        });
        genres.forEach(async gen => { //por cada parte del arreglo va a buscar un genero y el que matchee se lo va a agregar

            let genreDb = Genre.findOne({
            where: { name: gen}
        })
        videogameCreated.addGenre(genreDb); // le agrega el genre al videogame creado
    })
        return res.status(201).send("Game created successfully");
    } catch (error){
        next (error)
    }
});

router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    try{
        if(id.length>10){
        const gameElement = await Videogame.findByPk(id, {
            include: Genre,
        });
        return res.status(200).json(gameElement)
        }
        else {
            axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
            .then((ans) => {
                const answer = ans.data;
                //console.log(answer)
                const game = gameElements(answer);
                return res.json(game)
            })
        }
    } catch (error){
        next (error)
    }
});



module.exports = router;

//////////////////// GET ////////////////////////////
// const totalGames = [];

// totalGames.push(axios.get(`https://api.rawg.io/api/games/{id}?key=${API_KEY}`)
// );
// totalGames.push(Videogame.findAll({ //pusheo los games de la DB
//     include: [{
//         model: Genre,
//         as: 'genres',
//         attributes: ['id', 'name']
//     }]
// }))
//     const response = await Promise.allSettled(totalGames); //espero a que todas las promesas se resuelvan
//     //console.log(response)
//     const okGames = response.filter(res => res.status === 'fulfilled'); //fulfilled o rejected

//     if (id) {
//         let gameId = totalGames.filter(g => g.id == id)
//         gameId.length?
//         res.status(200).json(gameId) : 
//         res.status(400).send("Game not found")
//     }
// });


//