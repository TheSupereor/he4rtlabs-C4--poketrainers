import { useState, useEffect } from 'react';
import Image from 'next/image';
import pokeCard from '../../styles/pokemonCard.module.css';
import trainerPage from '../../styles/trainerPage.module.css';
import styles from '../../styles/Home.module.css';
import theme from '../../styles/ButtonStyle.module.css';

export default function PokemonCard(props) {

  //console.log(props.pokemonAtual)
  const { name, image_url, attribute1, attribute2 } = props.pokemonAtual;
	const [show, setShow] = useState(false);
	const [pokemonInfo, setPokemonInfo] = useState([])
	let stats = [];

	///pegando os dados do pokemon com a api pelo nome
  const ShowPokemonCard = async () => {
		await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
		.then(pokemon => pokemon.json())
		.then(pokemon => {
			setPokemonInfo(pokemon)
			stats = pokemon.stats;
		})

		.catch(err => console.log(err.message))
  }

	useEffect(() => {
		if(show == true){
			ShowPokemonCard();
		}
	}, [show])

  return(
		<>
    <button className={pokeCard.actPokemonListIcon} onClick={() => setShow(true)}>
        <div className={pokeCard.pokemonImage}>
            <Image 
                src={image_url}
                width={110}
                height={110}
            />
        </div>
        <p>{name}</p>
        <div className={pokeCard.pokemonTypes}>
            <p>{attribute1}</p>
            {
              attribute2 == "a" ? "" : () => 
                <p>{attribute2}</p>
            }
        </div>
    </button>


    <div 
		  className={`${theme.modal} ${show == true ? theme.active : theme.inactive}`}
			onClick={() => setShow(false)}
    >
			<div 
				className={`${theme.modalContent} ${trainerPage.ModalPopUp} ${show == true ? theme.active : theme.inactive} ${pokeCard.popUp}`}
				onClick={e => e.stopPropagation()}
			>
				<div className={trainerPage.topDetailContainer}>
						<div className={trainerPage.topDetail}></div>
				</div>

				<div className={`${theme.modalHeader} ${pokeCard.header}`}>
					<h2>{name}</h2>
					<p>Seu pequeno amigo!</p>
				</div>
				
				<Image 
					src={image_url || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"}
					width={230}
					height={230}
				/>

{
					pokemonInfo !== [] && show == true ? 
						<div className={pokeCard.attributeTable}>
							<table>
								<tbody>
									<tr>
										<td>Height:</td>
										<td>{pokemonInfo.height || ""}</td>
									</tr>
									<tr>
										<td>Weight:</td>
										<td>{pokemonInfo.weight || ""}</td>
									</tr>
									<tr>
										<td>HP:</td>
										<td>{pokemonInfo.stats[0].base_stat || ""}</td>
									</tr>
									<tr>
										<td>Atk:</td>
										<td>{pokemonInfo.stats[1].base_stat || ""}</td>
									</tr>
									<tr>
										<td>Def:</td>
										<td>{pokemonInfo.stats[2].base_stat || ""}</td>
									</tr>
									<tr>
										<td>S-Atk:</td>
										<td>{pokemonInfo.stats[3].base_stat || ""}</td>
									</tr>
									<tr>
										<td>S-Def:</td>
										<td>{pokemonInfo.stats[4].base_stat || ""}</td>
									</tr>
									<tr>
										<td>Spd:</td>
										<td>{pokemonInfo.stats[5].base_stat || ""}</td>
									</tr>
								</tbody>
							</table>
						</div>
					 : ""
				}

				<div className={theme.modalFooter}>
					<button 
						onClick={() => setShow(false)}
						className={styles.buttonDefaultSmall}
					>Fechar</button>
				</div>
		</div>
  </div>
	</>
  );
}
