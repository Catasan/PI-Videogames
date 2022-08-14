<p align='left'>
    <img src='https://static.wixstatic.com/media/85087f_0d84cbeaeb824fca8f7ff18d7c9eaafd~mv2.png/v1/fill/w_160,h_30,al_c,q_85,usm_0.66_1.00_0.01/Logo_completo_Color_1PNG.webp' </img>
</p>

# Individual Project - Henry Videogames

<p align="right">
  <img height="200" src="./videogame.png" />
</p>

## Project Objectives:

- Create an App using React, Redux, Node and Sequelize.
- Build an SPA(Single Page Application) using React, Redux, Node and Sequelize.
- Learn and practice the Git workflow.

## AIM
- Create an app in which the user could see the different video games available and their most important information. The VG were brought from an external API. 

• Some of the functionalities that I created were: 
<br/>
 ✅ Searching different video games. 
<br/>
 ✅ Filtering and sorting them.
 <br/>
 ✅ Adding new video games.

• I had to create different routes, components and a data base. I worked on the back-end and on the front-end as well.

📍Technologies that I used:

Back-End:
 <br/>
🔸 NodeJS
 <br/>
🔸 Express
 <br/>
🔸 PostgresSQL

Front-End:
 <br/>
 🔹React
  <br/>
 🔹Redux
  <br/>
 🔹CSS modules



### Only Endpoints/Flags that I could use

  - GET https://api.rawg.io/api/games
  - GET https://api.rawg.io/api/games?search={game}
  - GET https://api.rawg.io/api/genres
  - GET https://api.rawg.io/api/games/{id}

I was not allowed to use any external library for the styles design of the SPA. 

## INSTRUCTIONS:

#### Front-End
Develop a React/Redux app which contains the following pages/routes:

__Landing__: create a landing page with
- [ ] A representative image of the theme
- [ ] Button to redirect you to home (`Main Route`)

__Main Route__: must have
- [ ] SearchingiInput to find video games for their name
- [ ] Area where you can see the list of video games. It must show their:
  - Image
  - Name
  - Genre
- [ ] Buttons/Options to filter by genre and by existing or created video game
- [ ] Buttons/Options to sort video games alphabetically by ascending and descending order and by rating
- [ ] Pagination showing 15 video games by page.
- [ ] In this route you must show the video games brought from the API as well as the ones from the Data Base.


__Detail Card Route__: must have
- [ ] The fields shown on the Main Route (Image, Name and Genre)
- [ ] Description
- [ ] Released date
- [ ] Rating
- [ ] Plataforms

__Video game creation Route__: must have
- [ ] A form __controlled with JavaScript__ with the following fields:
  - Name
  - Description
  - Released date
  - Rating
- [ ] Options to select/add several genres.
- [ ] Options to select/add several platforms.
- [ ] Button/Option to create a new video game.

#### Data Base

The Data Base model must have the following entities:

- [ ] Video game with the following properties:
  - ID: * It can't be an ID from an existing video game from the API.
  - Name *
  - Description *
  - Released date
  - Rating
  - Plataforms *
- [ ] Genres with the following properties:
  - ID
  - Name
  
#### Back-End

You must develop a server in Node/Express with the following routes:


__IMPORTANT__: You are not allowed to use the filters, sorts and pagination methods provided by the external API.  


- [ ] __GET /videogames__:
  - Get a list of the video games
  - It must return only the necessary info for the Main Route.
  
- [ ] __GET /videogames?name="..."__:
  - Get a list of the first 15 video games which contain the word written as query parameter.
  - If there is none existing video game show an accurate message.
- [ ] __GET /videogame/{idVideogame}__:
  - Get the detail of a video game in particular.
  - It must bring only the info asked on the Detail Card Route
  - Include the associated genres.
- [ ] __GET /genres__:
  - Get all the types of genres from all the possible video games
  - You must bring the genres from the API and save them into the Data Base. Then use them directly from the Data Base.
- [ ] __POST /videogame__:
  - It receives the info from the controlled form from the Create Video Game Route by body.
  - Created a Video Game in the Data Base.
