import styles from '../../styles/Home.module.css'
import trainerPage from '../../styles/trainerPage.module.css';
import Image from 'next/image';
import AddPokemon from './AddPokemon';
import { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import typesJson from '../JSON/TypeCategories.json';

export default function Pokemons(props) {
    //console.log(props.dados);
    //recebendo os dados enviados da página principal
    const dados = props.dados;

    //pegando os pokemons que o treinador tem
    const [pokemons, setPokemons] = useState([]);
    const getPokemons = async () => {
        if(dados){
            const id = dados.id;
            try {
                const response = await fetch(`http://localhost:5000/trainer/${id}/pokemon`);
                const jsonPokemonsData = await response.json();
    
                setPokemons(jsonPokemonsData);
            } catch (err) {
                console.log(err.message)
            }
        }
    }

    useEffect(() => {
        getPokemons();
        getTypes();
    },[dados]);

    //função para atualizar quando adicionar um novo pokemon
    const PokemonAdicionado = () => {
        getPokemons();
    }


    //Pegar ícones dos tipos
    const [ types, setTypes ] = useState([]);
    const getTypes = async () => {
        await setTypes(typesJson);
    }

    //filtrar pokemon pelo tipo
    const getPokemonsByType = async (type) => {
        const id = dados.id;
        try {
            const response = await fetch(`http://localhost:5000/trainer/${id}/pokemon/${type}`);
            const jsonPokemonsData = await response.json();

            setPokemons(jsonPokemonsData);
            console.log(jsonPokemonsData)
        } catch (err) {
            console.log(err.message)
        }
    }
    
    return(
        <div className={trainerPage.pokemons}>
            <div className={trainerPage.topDetailContainer}>
                <div className={trainerPage.topDetail}></div>
            </div>

            <div className={trainerPage.actPokemonButtons}>
                {
                    types !== [] ? types.map((ActualType) => {
                        const typeSelected = ActualType.title;
                        return(
                            <button 
                              key={ActualType.title} 
                              className={trainerPage.actPokemonCategoryIcon}
                              onClick={() => {getPokemonsByType(typeSelected)}}
                              >
                                <Image 
                                src={ActualType.sprite_url}
                                width={30}
                                height={30}
                                />
                            </button>
                        )
                    }) : ""
                }

                <AddPokemon PokemonAdicionado={PokemonAdicionado} dados={dados} />
            </div>

            <div className={trainerPage.pokemonList}>
                {
                    pokemons != [] ? pokemons.map((pokemonAtual) => {
                        return(
                            <PokemonCard key={pokemonAtual.name} pokemonAtual={pokemonAtual}/>
                        )
                    }) : ""
                }
            </div>
            <button className={trainerPage.pokemonListCleanFilter} onClick={() => {getPokemons()}}>Limpar filtro</button>
        </div>
    )
}