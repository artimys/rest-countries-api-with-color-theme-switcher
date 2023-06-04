import { useEffect, useState, useRef } from 'react'
import styles from '../component/styles/SearchCountries.module.css'

import SearchBox from '../component/searchBar/SearchBox'
import PageLoader from '../component/layout/PageLoader'
import CountriesList from '../component/countries/CountriesList'
import useRestCountriesFetch from '../hooks/UseRestCountriesFetch'

import ErrorBoundary from '../component/ErrorBoundary'
import NoCountriesFound from '../component/countries/NoCountriesFound'


function SearchCountries() {
    console.log('Page re-render');

    const searchInputRef = useRef(null);
    const regionRef = useRef(null);
    const debounceTimeoutRef = useRef(null);

    const { isLoading, error, fetchBy, fetchByNameAndRegion } = useRestCountriesFetch();
    const [filteredCountries, setFilteredCountries] = useState([]);



    useEffect(() => {
        console.log("useEffect: page load one time");
        searchCountries();

        return () => {
            clearTimeout(debounceTimeoutRef.current);
        }
    }, []);

    const debounceSearchHandler = () => {
        clearTimeout(debounceTimeoutRef.current);

        debounceTimeoutRef.current = setTimeout(() => {
            const searchTerm = searchInputRef.current.value;
            console.log("deboundSearchHandler: final debounce to begin searchCountries() for:", searchTerm);
            searchCountries();
        }, 500);
    };

    const changeRegionHandler = (e) => {
        searchCountries();
    }

    const searchCountries = () => {
        const searchedTerm = searchInputRef.current.value.trim().toLowerCase();
        const selectedRegion = regionRef.current.value;

        const hasEnteredSearch = searchedTerm.length > 0;
        const hasSelectedRegion = selectedRegion.length > 0;

        if (hasEnteredSearch && hasSelectedRegion) {
            console.log("%cSearch: filter by Search+Region", "background: green");
            fetchByNameAndRegion(searchedTerm, selectedRegion).then(data => setFilteredCountries(data));

        } else if (hasSelectedRegion) {
            console.log("%cSearch: filter by RegionDropdown", "background: green");
            fetchBy(`region/${selectedRegion}`).then(data => setFilteredCountries(data));

        } else if (hasEnteredSearch) {
            console.log("%cSearch: filter by SearchBox", "background: green");
            fetchBy(`name/${searchedTerm}`).then(data => setFilteredCountries(data));

        } else {
            console.log("%cSearch: show all", "background: green");
            fetchBy("all").then(data => setFilteredCountries(data));
        }
    }

    const noCountryResults = !isLoading && filteredCountries.length === 0;
    const hasCountryResults = !isLoading && filteredCountries.length > 0;

    return (
        <>
            <section className={styles.search} role="search">
                <div className={styles.search__row}>
                    <SearchBox
                        reff={searchInputRef}
                        onChangeHandler={debounceSearchHandler}
                    />
                </div>

                <select name="searchRegion" id="searchRegion" ref={regionRef} onChange={changeRegionHandler}>
                    <option value="">Filter by Region</option>
                    <option value="africa">Africa</option>
                    <option value="americas">Americas</option>
                    <option value="asia">Asia</option>
                    <option value="europe">Europe</option>
                    <option value="oceania">Oceania</option>
                </select>
            </section>

            { isLoading && <PageLoader /> }

            <ErrorBoundary fallback="FATAL ERROR">
                <section>
                    { noCountryResults && <NoCountriesFound /> }
                    { hasCountryResults && <CountriesList countries={filteredCountries} /> }
                </section>
            </ErrorBoundary>
        </>
    )
}


export default SearchCountries;