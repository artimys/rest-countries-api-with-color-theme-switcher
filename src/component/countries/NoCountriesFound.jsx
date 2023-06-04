import styles from '../styles/NoCountriesFound.module.css'

function NoCountriesFound() {
    return (
        <div className={styles['no-countries-found']}>
            <i className="fa-regular fa-face-frown-open"></i>
            <p>Sorry, no countries found with that search</p>
        </div>
    )
}

export default NoCountriesFound;