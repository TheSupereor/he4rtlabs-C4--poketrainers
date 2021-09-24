import Image from 'next/image';
import styles from '../../styles/Home.module.css'
import trainerPage from '../../styles/trainerPage.module.css';
import CommomItem from '../images/item1.png'

const Mochila = () => {


    return(
        <div className={`${trainerPage.mochila} ${styles.defaultBg}`}>
            <div className={trainerPage.topDetailContainer}>
                <div className={trainerPage.topDetail}></div>
            </div>

            <div className={trainerPage.actBackpackButtons}>
                <div className={trainerPage.ItemCategories}>
                    <button className={trainerPage.actBackpackCategoryIcon}>
                        <Image 
                        src="https://cdn2.bulbagarden.net/upload/9/95/Normal_icon_SwSh.png"
                        width={30}
                        height={30}
                        alt="Items em geral"
                        />
                    </button>
                </div>

                <button className={trainerPage.addItemButton}>
                    <p><b>+</b></p>
                    <Image 
                      src={CommomItem}
                      width={30}
                      height={30}
                    />
                </button>
            </div>

            <div className={trainerPage.itemList}>
                <button className={trainerPage.actItemListIcon}>
                    <Image 
                      src="https://cdn2.bulbagarden.net/upload/2/21/001Bulbasaur.png"
                      width={70}
                      height={70}
                    />
                    <p>Pokemon Name</p>
                    <div className={trainerPage.itemTypes}>
                        <p>Grama</p>
                    </div>
                </button>
            </div>

        </div>
    )
}

export default Mochila;