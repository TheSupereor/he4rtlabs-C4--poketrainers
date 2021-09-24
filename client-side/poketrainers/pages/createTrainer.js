import styles from '../styles/Home.module.css';
import ChangeBG from '../src/components/ChangeBG';
import { useState } from 'react';
import router, { useRouter } from 'next/router';

export default function Home() {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('Kanto');
  const [age, setAge] = useState('');

  //variável para setar o tema
  const [actTheme, setActTheme] = useState('')

  //função que vai receber a resposta do ChangeBG
  const handleCallback = (ChosenTheme) => {
    setActTheme(ChosenTheme)
    console.log(ChosenTheme)
  }

  const submitNewTrainer = async e => {
    e.preventDefault();
    //console.log(name, region, age);

    try {
      const body = {name, region, age};
      const response = await fetch("http://localhost:5000/trainers", {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })
      
      //verificando a resposta do servidor
      console.log(response.ok + response.status + response.statusText);
      
      //enviando o usuário para a página correta
      if(response.ok == true){
        router.push({
          pathname: '/trainerPage',
          query: {name: name}
        });
      }else{
        alert(`Algo deu errado, tente novamente! Erro:${response.status}`)
      };
      
    } catch (err) {
      console.log(err.message)
    }
  }



  return (
    <div 
    className=
      {`${styles.container} 
      ${actTheme == 'purplered' ? styles.roxoVermelho : ''} 
      ${actTheme == 'greenblue' ? styles.azulVerde : ''} 
      ${actTheme == 'greendark' ? styles.adrian : ''} 
      `}
    >
      <div className={styles.topDetail}></div>
      <div className={styles.defaultBg}>
        <div className={styles.trainer}>
            <h2>Criar novo treinador(a)</h2>

            <form onSubmit={(e) => submitNewTrainer(e)}>
              <label htmlFor="name" className={styles.inputLabel}>Nome:</label>
              <input 
                name="name" 
                id="name" 
                value={name}
                className={styles.inputText}
                onChange={(e) => setName(e.target.value)}
                required
                />

              <label htmlFor="region" className={styles.inputLabel}>Região:</label>
              <select 
                name="region" 
                id="region" 
                required
                value={region}
                className={styles.inputSelect}
                onChange={(e) => setRegion(e.target.value)}
                >
                  <option defaultValue value="kanto">Kanto</option>
                  <option value="johto">Johto</option>
                  <option value="hoenn">Hoenn</option>
                  <option value="sinnoh">Sinnoh</option>
              </select>

              <label htmlFor="idade" className={styles.inputLabel}>Idade:</label>
              <input 
                type="number" 
                name="idade" 
                id="idade" 
                required
                value={age}
                className={styles.inputText}
                onChange={(e) => setAge(e.target.value)}
                />

              <button className={styles.newTrainerButton}><b>Começar jornada!</b></button>
            </form>
        </div>
      </div>

      <ChangeBG parentCallback={handleCallback}/>
    </div>
  )
}
