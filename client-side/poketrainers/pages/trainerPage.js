import Image from 'next/image';
import styles from '../styles/Home.module.css'
import trainerPage from '../styles/trainerPage.module.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link'
//import Mochila from '../src/components/Mochila';
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
                const response = await fetch(`http://localhost:5000/trainer/${name}`);
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
                {/* -- ia fazer um botão pra mudar os dados do treinador, mas acabei deixando pra lá, quero seguir para outro projeto,
                       precisaria só fazer uma rota e um método pra isso, um outro pop up e uma função update.
                <button >Customizar</button>
                */}
                <button >
                  <Link href="/createTrainer">
                    <a>Deslogar</a>
                  </Link>
                </button>
            </div>

            <div className={trainerPage.trainerData}>
                <h3>{dados.name || "..."}</h3>
                <p>{dados.title || "..."}</p>

                <div className={trainerPage.trainerDataImage}>
                    <Image 
                      src={dados.trainer_sprite || "https://archives.bulbagarden.net/media/upload/3/30/Spr_B2W2_Backpacker_M.png"}
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
                        {dados.trainer_bio || "..."}
                    </p>
                </div>

            </div>
            
        </div>

        <Pokemons dados={dados}/>

        {/* <Mochila /> */}

      </div>
    </div>
  )
}