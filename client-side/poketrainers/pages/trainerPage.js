import Image from 'next/image';
import styles from '../styles/Home.module.css'
import trainerPage from '../styles/trainerPage.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Mochila from '../src/components/Mochila';
import AddPokemon from '../src/components/AddPokemon';
import Pokemons from '../src/components/Pokemons';

export default function trainerPageIndex() {
    //pegando a query passada no router
    const router = useRouter()
    const { name } = router.query;
    //console.log(name);

    //pegando os dados do treinador
    const [dados, setDados] = useState([]);
    const getDados = async () => {
        if(name != undefined){
            try {
                const response = await fetch(`http://localhost:5000/trainers/${name}`);
                const jsonTrainerData = await response.json();
    
                //colocando os dados na variável
                setDados(jsonTrainerData);
                console.log(jsonTrainerData);
            } catch (err) {
                console.log(err.message)
            }
        }
    }

    useEffect(() => {
        getDados();
    },[name])

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
                <h3>{dados.name || "..."}</h3>
                <p>Mochileiro</p>

                <div className={trainerPage.trainerDataImage}>
                    <Image 
                      src="https://archives.bulbagarden.net/media/upload/3/30/Spr_B2W2_Backpacker_M.png"
                      width={200}
                      height={200}
                    />
                </div>

                <div className={trainerPage.regionAge}>
                    <div className={trainerPage.data}>
                        <p>Região:</p>
                        <h3>{dados.region || "..."}</h3>
                    </div>
                    <hr/>
                    <div className={trainerPage.data}>
                        <p>Idade:</p>
                        <h3>{dados.age || "..."}</h3>
                    </div>
                </div>

                <div className={trainerPage.data}>
                    <h4>Biografia:</h4>
                    <p className={trainerPage.bio}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                    </p>
                </div>

            </div>
            
        </div>

        <Pokemons dados={dados}/>

        <Mochila />

      </div>
    </div>
  )
}