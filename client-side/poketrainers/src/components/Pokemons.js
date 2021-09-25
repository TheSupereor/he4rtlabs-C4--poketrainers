import styles from '../../styles/Home.module.css'
import trainerPage from '../../styles/trainerPage.module.css';
import Image from 'next/image';
import AddPokemon from './AddPokemon';
import { useState, useEffect } from 'react';

export default function Pokemons(props) {
    //console.log(props.dados);
    //recebendo os dados enviados da página principal
    const dados = props.dados;

    //pegando os pokemons que o treinador tem
    const [pokemons, setPokemons] = useState([]);
    const getPokemons = async () => {
        if(dados != ""){
            const id = dados.trainer_id;
            try {
                const response = await fetch(`http://localhost:5000/pokemons/trainer/${id}`);
                const jsonPokemonsData = await response.json();
                //console.log(response);
    
                setPokemons(jsonPokemonsData);
                console.log(jsonPokemonsData);
            } catch (err) {
                console.log(err.message)
            }
        }
    }

    useEffect(() => {
        getPokemons()
    },[dados]);
    
    return(
        <div className={trainerPage.pokemons}>
            <div className={trainerPage.topDetailContainer}>
                <div className={trainerPage.topDetail}></div>
            </div>

            <div className={trainerPage.actPokemonButtons}>
                <button className={trainerPage.actPokemonCategoryIcon}>
                    <Image 
                      src="https://cdn2.bulbagarden.net/upload/9/95/Normal_icon_SwSh.png"
                      width={30}
                      height={30}
                    />
                </button>

                <AddPokemon />
            </div>

            <div className={trainerPage.pokemonList}>
                <button className={trainerPage.actPokemonListIcon}>
                    <Image 
                      src="https://cdn2.bulbagarden.net/upload/2/21/001Bulbasaur.png"
                      width={70}
                      height={70}
                    />
                    <p>Pokemon Name</p>
                    <div className={trainerPage.pokemonTypes}>
                        <p>Grama</p>
                    </div>
                </button>
            </div>
        </div>
    )
}