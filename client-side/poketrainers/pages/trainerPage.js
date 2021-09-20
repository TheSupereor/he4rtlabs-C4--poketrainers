import Image from 'next/image';
import styles from '../styles/Home.module.css'
import trainerPage from '../styles/trainerPage.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function trainerPageIndex() {
    //pegando a query passada no router
    const router = useRouter()
    const { name } = router.query;
    //console.log(name);

    //pegando os dados do treinador
    const [dados, setDados] = useState([]);
    const getDados = async () => {
        try {
            const response = await fetch(`http://localhost:5000/trainers/${name}`);
            const jsonTrainerData = await response.json();
            console.log(response);

            setDados(jsonTrainerData);
            console.log(dados);
        } catch (err) {
            console.log(err.message)
        }
    }

    const [pokemons, setPokemons] = useState([]);
    const getPokemons = async () => {
        try {
            const response = await fetch(`http://localhost:5000//pokemons/${dados.id}`);
            const jsonPokemonsData = await response.json();
            console.log(response);

            setPokemons(jsonPokemonsData);
            console.log(pokemons);
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getDados();
    },[])



  return (
    <div className={styles.container}>
      <div className={trainerPage.layout}>
    
        <div className={`${trainerPage.trainer} ${styles.defaultBg}`}>
            <div className={trainerPage.topDetailContainer}>
                <div className={trainerPage.topDetail}></div>
            </div>

            <div className={trainerPage.actTrainerButtons}>
                <button>Customizar</button>
                <button>Deslogar</button>
            </div>

            <div className={trainerPage.trainerData}>
                <h3>TheSupereor</h3>
                <p>Backpacker</p>

                <div className={trainerPage.trainerDataImage}>
                    <Image 
                      src="https://archives.bulbagarden.net/media/upload/3/30/Spr_B2W2_Backpacker_M.png"
                      width={320}
                      height={320}
                    />
                </div>

                <div className={trainerPage.regionAge}>
                    <div className={trainerPage.data}>
                        <p>Região:</p>
                        <h3>Johto</h3>
                    </div>
                    <hr/>
                    <div className={trainerPage.data}>
                        <p>Idade:</p>
                        <h3>20</h3>
                    </div>
                </div>

                <div className={trainerPage.data}>
                    <h4>Biografia:</h4>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                </div>

            </div>
            
        </div>

        <div className={trainerPage.pokemons}>
            <div className={trainerPage.topDetailContainer}>
                <div className={trainerPage.topDetail}></div>
            </div>

            <div className={trainerPage.actPokemonButtons}>
                <button className={trainerPage.actPokemonCategoryIcon}>
                    <Image 
                      src="https://cdn2.bulbagarden.net/upload/9/95/Normal_icon_SwSh.png"
                      width={40}
                      height={40}
                    />
                </button>

                <button className={trainerPage.addPokemonButton}>
                    <p><b>+</b></p>
                    <Image 
                      src="https://cdn2.bulbagarden.net/upload/7/79/Dream_Pok%C3%A9_Ball_Sprite.png"
                      width={40}
                      height={40}
                    />
                </button>
            </div>

            <div className={trainerPage.pokemonList}>
                <button className={trainerPage.actPokemonListIcon}>
                    <Image 
                      src="https://cdn2.bulbagarden.net/upload/2/21/001Bulbasaur.png"
                      width={100}
                      height={100}
                    />
                    <p>Pokemon Name</p>
                    <div className={trainerPage.pokemonTypes}>
                        <p>Grama</p>
                    </div>
                </button>
            </div>
        </div>

        <div className={`${trainerPage.mochila} ${styles.defaultBg}`}>
            <div className={trainerPage.topDetailContainer}>
                <div className={trainerPage.topDetail}></div>
            </div>

            <div className={trainerPage.actBackpackButtons}>
                <button className={trainerPage.actBackpackCategoryIcon}>
                    <Image 
                      src="https://cdn2.bulbagarden.net/upload/9/95/Normal_icon_SwSh.png"
                      width={40}
                      height={40}
                    />
                </button>

                <button className={trainerPage.addItemButton}>
                    <p><b>+</b></p>
                    <Image 
                      src="https://cdn2.bulbagarden.net/upload/7/79/Dream_Pok%C3%A9_Ball_Sprite.png"
                      width={40}
                      height={40}
                    />
                </button>
            </div>

            <div className={trainerPage.itemList}>
                <button className={trainerPage.actItemListIcon}>
                    <Image 
                      src="https://cdn2.bulbagarden.net/upload/2/21/001Bulbasaur.png"
                      width={100}
                      height={100}
                    />
                    <p>Pokemon Name</p>
                    <div className={trainerPage.itemTypes}>
                        <p>Grama</p>
                    </div>
                </button>
            </div>

        </div>

      </div>
    </div>
  )
}