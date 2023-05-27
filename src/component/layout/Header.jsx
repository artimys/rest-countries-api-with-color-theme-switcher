import styles from '../styles/Header.module.css';
import ThemeSwitch from './ThemeSwitch'


function Header() {
    return(
        <header className={styles.header}>

            <div className={`${styles.container} ${styles.header__row}`}>
                <div className={styles.header__title}>
                    <h1>Where in the world?</h1>
                </div>

                <div className={styles.header__theme}>
                    <ThemeSwitch />
                </div>
            </div>

        </header>
    );
}


export default Header;