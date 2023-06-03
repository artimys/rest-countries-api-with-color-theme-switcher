import { useEffect, useState, useRef } from 'react'
import styles from '../component/styles/SearchCountries.module.css'

import SearchBox from '../component/searchBar/SearchBox'
import PageLoader from '../component/layout/PageLoader'
import CountriesList from '../component/countries/CountriesList'
import useRestCountriesFetch from '../hooks/UseRestCountriesFetch'


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
            console.log("calling API for:", searchTerm);

            searchCountries();
        }, 900);
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

            fetchByNameAndRegion(searchedTerm, selectedRegion)
            .then(d => {
                setFilteredCountries(d);
            });

//   const nameSearch = fetch(`https://restcountries.com/v3.1/name/${searchedTerm}`).then((response) => response.json());
//   const regionSearch = fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`).then((response) => response.json());

//             Promise.all([nameSearch, regionSearch])
//                 .then(([nameResults, regionResults]) => {
//                     const filtered = nameResults.filter((country) =>
//                     regionResults.some((regionCountry) => regionCountry.name.common === country.name.common)
//                 );

//                 const newData = [];
//                 for (const key in filtered) {
//                     const newRow = {
//                         id: key,
//                         ...filtered[key]
//                     };
//                     newData.push(newRow);
//                 }


//                 console.log("Data fetched, count:", newData.length);
//                 setIsLoading(false);
//                 setFilteredCountries(newData);
//             }).catch((error) => {
//                 console.error('Error fetching search data:', error);
//             });

        } else if (hasSelectedRegion) {
            console.log("%cSearch: filter by RegionDropdown", "background: green");

            fetchBy(`region/${selectedRegion}`)
                .then(data => setFilteredCountries(data));

        } else if (hasEnteredSearch) {
            console.log("%cSearch: filter by SearchBox", "background: green");

            fetchBy(`name/${searchedTerm}`)
                .then(data => setFilteredCountries(data));

        } else {
            console.log("%cSearch: show all", "background: green");

            fetchBy("all")
                .then(data => setFilteredCountries(data));
        }
    }


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


                <div>Loading: {isLoading.toString()}</div>
            </section>

            { isLoading && <PageLoader /> }

            <section>
                { !isLoading && filteredCountries.length === 0 && <p>No countries found for {searchInputRef.current?.value}</p>}
                { !isLoading && filteredCountries && <CountriesList countries={filteredCountries} /> }
            </section>
        </>
    )
}


export default SearchCountries;