import styles from '../../styles/Home.module.css'
import trainerPage from '../../styles/trainerPage.module.css';
import theme from '../../styles/ButtonStyle.module.css'
import { useState } from 'react'

const ChangeBG = (props) => {
    const [show, setShow] = useState(false);
    const [actualTheme, setActualTheme] = useState('');

    //verificando se a função está sendo passada corretamente
    //console.log(props.parentCallback)
 
    //enviar de volta para a página 
    const returnValue = (e) => {
      e.preventDefault();

      props.parentCallback(actualTheme)
      console.log(e)
    }

    return(
        <>
        <button
          className={theme.changeThemeButton}
          onClick={() => setShow(true)}
        ></button>

        <div
          className={`${theme.modal} ${show == true ? theme.active : theme.inactive}`}
          onClick={() => setShow(false)}
          >
          <div 
            className={`${theme.modalContent} ${trainerPage.ModalPopUp} ${show == true ? theme.active : theme.inactive}`}
            onClick={e => e.stopPropagation()}
            >
            <div className={theme.modalHeader}>
              <h2>Escolha o tema de background!</h2>
            </div>

            <form onSubmit={(e) => {returnValue(e)}}>
              <div className={theme.modalBody}>
                <button 
                 className={theme.buttonThemePreview} 
                 onClick={() => setActualTheme('purplered')}
                 >
                  <div className={`${theme.ThemePreview} ${theme.GhostFire}`}></div>
                  <p className={theme.ThemePreviewText}>Chamas Fantasmas</p>
                </button>

                <button 
                 className={theme.buttonThemePreview}
                 onClick={() => setActualTheme('greenblue')}
                 >
                  <div className={`${theme.ThemePreview} ${theme.WaterGreen}`}></div>
                  <p className={theme.ThemePreviewText}>Água da vida</p>
                </button>

                <button 
                 className={theme.buttonThemePreview} 
                 onClick={() => setActualTheme('greendark')}
                 >
                  <div className={`${theme.ThemePreview} ${theme.GreenEarth}`}></div>
                  <p className={theme.ThemePreviewText}>Pântano</p>
                </button>
              </div>

              <div className={theme.modalFooter}>
                <button 
                  onClick={() => setShow(false)}
                  className={styles.buttonDefaultSmall}
                  >Fechar</button>
              </div>
            </form>
          </div>
        </div>
        </>
    )
}

export default ChangeBG;