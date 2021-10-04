import { useState, useEffect } from 'react';
import Image from 'next/image';
import pokeCard from '../../styles/pokemonCard.module.css';
import trainerPage from '../../styles/trainerPage.module.css';

export default function PokemonCard(props) {

  //console.log(props.pokemonAtual)
  const { name, image_url, attribute1, attribute2 } = props.pokemonAtual;



  return(
    <button className={pokeCard.actPokemonListIcon}>
        <div className={pokeCard.pokemonImage}>
            <Image 
                src={image_url}
                width={110}
                height={110}
            />
        </div>
        <p>{name}</p>
        <div className={pokeCard.pokemonTypes}>
            <p>{attribute1}</p>
            {
              attribute2 == "a" ? "" : () => 
                <p>{attribute2}</p>
            }
        </div>
    </button>
  );
}
