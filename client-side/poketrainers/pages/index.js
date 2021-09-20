import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {
  
  const [trainer, setTrainer] = useState("");

  const loginTrainer = async e => {
    e.preventDefalt();

    try {
      const response = await fetch(`http://localhost:5000/trainers/${trainer}`);
      console.log(response);
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.topDetail}></div>
      <div className={styles.defaultBg}>
        <div className={styles.trainer}>
          <h2>Bem-vindo, treinador(a)! Quais pokemons iremos capturar hoje?</h2>

          <form className={styles.formLogin} >
            <input required onChange={e => setTrainer(e.target.value)} className={styles.inputText}/>
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
