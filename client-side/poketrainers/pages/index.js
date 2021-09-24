import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import router, { useRouter } from 'next/router';

export default function Home() {
  
  const [trainer, setTrainer] = useState("");

  const loginTrainer = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/trainers/${trainer}`);
      console.log(response);

      //enviando o usuário para a página correta
      if(response.ok == true){
        router.push({
          pathname: '/trainerPage',
          query: {name: trainer}
        });
      }else{
        alert(`Algo deu errado, tente novamente! Erro:${response.status}`)
      };

    } catch (err) {
      console.log(err.message)
    }
  }

  const teste = (e, value) => {
    e.preventDefault();
    console.log(value);
    setTrainer(value);
  }

  return (
    <div className={styles.container}>
      <div className={styles.topDetail}></div>
      <div className={styles.defaultBg}>
        <div className={styles.trainer}>
          <h2>Bem-vindo, treinador(a)! Quais pokemons iremos capturar hoje?</h2>

          <form className={styles.formLogin} onSubmit={e => loginTrainer(e)}>
            <input 
              required 
              name="trainer"
              className={styles.inputText}
              onChange={e => {setTrainer(e.target.value)}}
              />
            <button className={styles.buttonDefault}>Entrar</button>
          </form>

          <div className={styles.ou}>
            <hr></hr>
            <p>ou</p>
            <hr></hr>
          </div>

          <Link href="/createTrainer">
            <button className={styles.newTrainerButton}><b><a>Sou um novo treinador</a></b></button>
          </Link>
        </div>
      </div>
    </div>
  )
}
