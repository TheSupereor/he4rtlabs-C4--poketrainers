import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.topDetail}></div>
      <div className={styles.defaultBg}>
        <div className={styles.login}>
          <h2>Bem-vindo, treinador(a)! Quais pokemons iremos capturar hoje?</h2>

          <div className={styles.formLogin}>
            <input className={styles.inputText}></input>
            <button className={styles.buttonDefault}>Entrar</button>
          </div>

          <div className={styles.ou}>
            <hr></hr>
            <p>ou</p>
            <hr></hr>
          </div>

          <button className={styles.newTrainerButton}><b>Sou um novo treinador</b></button>
        </div>
      </div>
    </div>
  )
}
