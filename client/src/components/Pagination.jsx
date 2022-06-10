import React from 'react';
//este componente me renderiza los numeros en si
export default function Pagination ({videogamesPerPage, allVideogames, pagination}){
    const pageNumbers = [];
    //Math.ceil redondea para arriba
    for(let i=0; i<Math.ceil(allVideogames/videogamesPerPage); i++){
        pageNumbers.push(i+1) 
    }
    return( //check si tengo el pageNumber y si es asi, que me devuelva cada uno de los numeros de paginas
        <nav>
            <ul className='pagination'>
                {pageNumbers &&
                pageNumbers.map(num =>(
                    <li className='number' key={num}>
                    <button onClick={() => pagination(num)}>{num}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}