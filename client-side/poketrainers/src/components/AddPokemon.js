import Image from 'next/image';
import styles from '../../styles/Home.module.css';
import theme from '../../styles/ButtonStyle.module.css';
import trainerPage from '../../styles/trainerPage.module.css';
import { useState, useEffect } from 'react';

const AddPokemon = ( props ) => {
    //controlar o aparecimento da modal
    const [show, setShow] = useState(false);

    // ----------------------------------- Procura por input e click -------------------

    //procurar por um pokemon em específico
    const [pokemonSearchName, setPokemonSearchName] = useState("");

    const [pokemonSprite, setPokemonSprite] = useState("");

    //url para requisição de dados de um pokemon específico
    const [actualPokemon, setActualPokemon] = useState([]);

    const SearchSpecificPokemon = async () => {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSearchName}`)
      .then(SpecPokemon => SpecPokemon.json())
      .then(SpecPokemon => {
        //console.log(SpecPokemon)
        setActualPokemon(SpecPokemon);
        setPokemonSprite(SpecPokemon.sprites.front_default);
      })

      .catch(err => console.log(err.message));
    }

    useEffect(() => {
      SearchSpecificPokemon();
    }, [pokemonSearchName]);

    // ----------------------------------- Lista de Pokemons -------------------

    //para que possamos controlar a requisição
    const [offset, setOffset] = useState(0);

    //lista de pokemons
    const [pokemonList, setPokemonList] = useState([]);

    //gerar a lista de pokemons
    const GeneratePokemonList = async () => {
      await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=10`)
      .then(response => response.json())
      .then(response => setPokemonList(response.results));
    }

    //controlando quais pokemons aparecem
    const IncreaseOffset = () => {
      if(offset < 1118){
        let newOffset = offset + 10;
        setOffset(newOffset);
      }
    }
    const DecreaseOffset = () => {
      if(offset > 0){
        let newOffset = offset - 10;
        setOffset(newOffset);
      }
    }

    useEffect(() => {
      if(show == true){
        GeneratePokemonList();
      }
    }, [show, offset])

    // ----------------------------------- Adicionar pokemon a treinador -------------------

    const AddPokemonToTrainer = async (e) => {
      e.preventDefault();
      setShow(false);
      const name = pokemonSearchName;
      const image_url = pokemonSprite;
      const attribute1 = actualPokemon.types[0].type.name;
      let attribute2 = "a";
      if (actualPokemon.types.length == 1) {
        attribute2 = "a";
      } else {
        attribute2 = actualPokemon.types[1].type.name;
      }

      console.log(attribute2)

      const trainer_id = props.dados.id;

      try {
        const body = { name, image_url, attribute1, attribute2 };

        const response = await fetch(`http://localhost:5000/trainer/${trainer_id}/pokemon`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)

        });

        props.PokemonAdicionado();
        console.log(response)
      } catch (err) {
        console.log(err);
      }
    }

    return(
        <>
        <button 
          className={trainerPage.addPokemonButton}
          onClick={() => setShow(true)}
          >
            <p><b>+</b></p>
            <Image 
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                width={50}
                height={50}
            />
        </button>

        <div
          className={`${theme.modal} ${show == true ? theme.active : theme.inactive}`}
          onClick={() => setShow(false)}
          >
          <div 
            className={`${theme.modalContent} ${trainerPage.ModalPopUp} ${show == true ? theme.active : theme.inactive}`}
            onClick={e => e.stopPropagation()}
            >
            <div className={trainerPage.topDetailContainer}>
                <div className={trainerPage.topDetail}></div>
            </div>

            <div className={theme.modalHeader}>
              <h2>Adicione um pokemon na sua coleção!</h2>
              <p>Digite o nome dele no campo abaixo ou pesquise na lista:</p>
            </div>

            <form autoComplete="off" onSubmit={(e) => {e.preventDefault()}}>
              <div className={styles.modalBodyAddPokemon}>
                <div className={styles.inputPokemonNameFields}>
                  <label htmlFor="name" className={styles.inputLabel}>Nome:</label>
                  {/* Input para pesquisar o nome do pokemon */}
                  <input 
                    name="name" 
                    id="name" 
                    className={styles.pokemonNameInput}
                    onChange={(e) => setPokemonSearchName(e.target.value.toLowerCase())}
                  />
                </div>
                
                <div className={styles.pokemonSelect}>
                  <div className={styles.pokemonSelectList}>
                    <ul>
                      {
                        pokemonList.map((Pokemon) => {
                          const name = Pokemon.name;
                          return(
                            <li 
                              onClick={() => setPokemonSearchName(name)}
                              key={Pokemon.url}
                            >{name}</li>
                          )
                        })
                      }
                    </ul>

                    <div>
                      <button 
                        className={styles.passPokemonpage}
                        onClick={() => DecreaseOffset()}
                        >&#60;</button>
                      <button 
                        className={styles.passPokemonpage}
                        onClick={() => IncreaseOffset()}
                        >&#62;</button>
                    </div>
                  </div>

                  <div className={styles.pokemonSelectImageField}>
                    
                    <div className={styles.pokemonSelectImage}>
                      {pokemonSearchName != "" && pokemonSprite != "" && show == true ? 
                        <Image 
                          src={pokemonSprite}
                          width={200}
                          height={200}
                        />
                        :
                        <Image 
                          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                          width={130}
                          height={130}
                        />
                      }

                    </div>
                    <p className={styles.pokemonName}>{actualPokemon.name || ""}</p>

                    <div className={styles.pokemonTypes}>
                        { pokemonSearchName != "" && actualPokemon.types != undefined && show == true ?
                          actualPokemon.types.map((type) => {
                            return(
                              <p key={type.slot}>{type.type.name || ""}</p>
                            )
                          })
                          : ""
                        }
                    </div>

                  </div>
                </div>

              </div>

              <div className={theme.modalFooter}>
                <button 
                  onClick={() => setShow(false)}
                  className={styles.buttonDefaultSmall}
                >Fechar</button>

                <button 
                  onClick={(e) => AddPokemonToTrainer(e)}
                  className={styles.buttonDefaultSmall}
                >Adicionar Pokemon</button>
              </div>
            </form>
          </div>
        </div>
        </>
    )
}

export default AddPokemon;