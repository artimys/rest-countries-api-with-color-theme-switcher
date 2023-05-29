import { Link } from 'react-router-dom';
import styles from '../styles/CountryItem.module.css';

function CountryItem(props) {

    const country = {
        flag: 'https://flagcdn.com/ua.svg',
        name:  'Ukraine',
        population: 44134695,
        region: 'Europe',
        capital: 'Kyiv'
    }


    return(
        <article className={styles.card}>
            <header className={styles.card__flag}>
                    <img src={props.flag} alt={`${country.name} Flag`} />
            </header>

            <div className={styles.card__content}>
                <h2 className={styles.card__country}>
                    {/* <a href="detail.html?country=${country.name}" title={country.name}>{country.name}</a> */}
                    <Link to='/country?c='>{props.name}</Link>
                </h2>

                <ul className={styles.card__list}>
                    <li>
                        <strong className={styles.card__term}>Population: </strong>
                        <span className={styles.card__value}>{Number(props.population).toLocaleString()}</span>
                    </li>
                    <li>
                        <strong className={styles.card__term}>Region: </strong>
                        <span className={styles.card__value}>{props.region}</span>
                    </li>
                    <li>
                        <strong className={styles.card__term}>Capital: </strong>
                        <span className={styles.card__value}>{props.capital}</span>
                    </li>
                </ul>
            </div>
        </article>
    );
}

export default CountryItem;