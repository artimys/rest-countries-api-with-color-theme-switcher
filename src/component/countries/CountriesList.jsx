import styles from '../styles/CountriesList.module.css';
import CountryItem from './CountryItem';

function CountriesList(props) {
    return(
        <section className={styles.results}>
            <div id="content" className={styles.results__row}>
                    {props.countries && props.countries.map((country) => (
                        <CountryItem
                            key={country.id}
                            flags={country.flags}
                            name={country.name}
                            population={country.population}
                            region={country.region}
                            capital={country.capital}
                        />
                    ))}
            </div>
        </section>
    );
}

export default CountriesList;