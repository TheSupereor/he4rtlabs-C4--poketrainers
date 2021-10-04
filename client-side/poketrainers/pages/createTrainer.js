import styles from '../styles/Home.module.css';
import ChangeBG from '../src/components/ChangeBG';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import router, { useRouter } from 'next/router';
import TrainerTitles from '../src/JSON/TrainerSprites.json'

export default function Home() {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('Kanto');
  const [age, setAge] = useState('');
  const [title, setTitle] = useState('Treinadora Ás');
  const [trainerSprite, setTrainerSprite] = useState('https://archives.bulbagarden.net/media/upload/0/08/Spr_B2W2_Ace_Trainer_F.png');
  const [trainerBio, setTrainerBio] = useState('');

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
      const trainer_sprite = trainerSprite;
      const trainer_bio = trainerBio;
      const body = {name, region, age, title, trainer_sprite, trainer_bio};
      const response = await fetch("http://localhost:5000/trainer", {
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

  //não consegui fazer com que ambos os valores sejam enviados pelo value do elemento,
  //então decidi fazer uma função pra filtrar e achar o elemento correto
  const settingComplexData = (titulo) => {  
    setTitle(titulo);

    const position = TrainerTitles.filter(acharSprite);
    function acharSprite(value) {
      if (value.title == titulo) {
        setTrainerSprite(value.sprite_url)
      }
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

            <form onSubmit={(e) => submitNewTrainer(e)} className={styles.CreateTrainerForm}>
              <label htmlFor="name" className={styles.inputLabel}>Nome:</label>
              <input 
                autoComplete="off"
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
                  <option value="Johto">Johto</option>
                  <option value="Hoenn">Hoenn</option>
                  <option value="Sinnoh">Sinnoh</option>
                  <option value="Galar">Galar</option>
              </select>

              <hr/>

              <label htmlFor="idade" className={styles.inputLabel}>Idade:</label>
              <input 
                autoComplete="off"
                type="number" 
                name="idade" 
                id="idade" 
                required
                value={age}
                className={styles.inputText}
                onChange={(e) => setAge(e.target.value)}
              />

              <label htmlFor="titulo" className={styles.inputLabel}>Título:</label>
              <select 
                name="titulo" 
                id="titulo" 
                required
                className={styles.inputSelect}
                onChange={(e) => settingComplexData(e.target.value)}
                >
                  {
                    TrainerTitles ? TrainerTitles.map((ActualTitle) => {
                      const title = ActualTitle.title;
                      return(
                        <option
                          key={ActualTitle.sprite_url} 
                          value={title}
                          title={ActualTitle.sprite_url}
                          >
                            {ActualTitle.title}
                        </option>
                      )
                    }) : ""
                  }
              </select>

              <hr/>

              <label name="bio" htmlFor="bio" className={styles.inputLabel}>Bio:</label>
              <hr/>
              <textarea 
                name="bio" 
                id="bio" 
                required
                value={trainerBio}
                className={styles.inputText}
                onChange={(e) => setTrainerBio(e.target.value)}
              />

              <button className={styles.newTrainerButton}><b>Começar jornada!</b></button>
            </form>
        </div>
      </div>

      <ChangeBG parentCallback={handleCallback}/>
    </div>
  )
}
