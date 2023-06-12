import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useRestCountriesFetch from '../hooks/UseRestCountriesFetch'
import { useTheme } from '../context/ThemeContext'

import styles from '../component/styles/CountryDetail.module.css'

import ErrorBoundary from '../component/ErrorBoundary'

function CountryDetail() {
    console.log("Detail Page Render");

    // Get query param
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const countryParam = searchParams.get('c');

    const { isLoading, error, fetchCountryDetail } = useRestCountriesFetch();
    const [country, setCountry] = useState({});

    const darkTheme = useTheme();


    useEffect(() => {
        console.log("useEffect: page load one time");
        getCountry();

        return () => {
        }
    }, []);

    const getCountry = () => {
        fetchCountryDetail(countryParam)
            .then(data => {
                setCountry(data);
                console.log("Got the data:", data);
            })

        console.log("getCountry() done");
    }


    return (
        <>
            <ErrorBoundary fallback="FATAL ERROR">

                <nav className={styles.detail__nav}>
                    <Link to="/" className={darkTheme ? styles.btn : styles['btn-dark']}>
                        <i className="fa-solid fa-arrow-left-long"></i>Back
                    </Link>
                </nav>

                <section className={styles.detail__card}>
                    {Object.keys(country).length > 0 && (
                        <>
                            <div className={styles.detail__card__flag}>
                                <img src={country.flags.svg} alt={country.flags.alt} />
                            </div>

                            <div className={styles.detail__card__content}>
                                <h1>{country.name.common}</h1>

                                <div className={styles.detail__card__props}>
                                    <ul>
                                        <li>
                                            <strong>Native Name:</strong>
                                            {Object.values(country.name.nativeName).map(n => n.common).join(', ')}
                                        </li>

                                        <li>
                                            <strong>Population:</strong>
                                            {Number(country.population).toLocaleString()}
                                        </li>

                                        <li>
                                            <strong>Region:</strong>
                                            {country.region}
                                        </li>

                                        <li>
                                            <strong>Sub Region:</strong>
                                            {country.subregion}
                                        </li>

                                        <li>
                                            <strong>Capital:</strong>
                                            {country.capital}
                                        </li>
                                    </ul>

                                    <ul>
                                        <li>
                                            <strong>Top Level Domain:</strong>
                                            {country.tld}
                                        </li>

                                        <li>
                                            <strong>Currencies:</strong>
                                            {Object.values(country.currencies).map(c => c.name).join(', ')}
                                        </li>

                                        <li>
                                            <strong>Languages:</strong>
                                            {Object.values(country.languages).sort().join(', ')}
                                        </li>
                                    </ul>
                                </div>

                                <div className={styles.detail__card__borders}>
                                    <div>
                                        <h2>Border Countries:</h2>
                                    </div>

                                    <div>
                                        {country.borders.map((country, index) => (
                                            <Link key={index} to="/" className={`${darkTheme ? styles.btn : styles['btn-dark']} ${styles['btn-slim']}`}>{country}</Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </section>

            </ErrorBoundary>
        </>
    )
}


export default CountryDetail;