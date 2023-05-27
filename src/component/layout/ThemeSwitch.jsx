import { useTheme, useThemeUpdate } from '../../context/ThemeContext';
import styles from '../styles/ThemeSwitch.module.css'


function ThemeSwitch() {
    const darkTheme = useTheme();
    const toggleTheme = useThemeUpdate();

    return(

        <button id="themeSwitch"
                className={styles['theme-switch']}
                title="Switch Theme"
                onClick={toggleTheme}
                aria-pressed={!darkTheme}>
            Dark Mode
        </button>

    );
}


export default ThemeSwitch;