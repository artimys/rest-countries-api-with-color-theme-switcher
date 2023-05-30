import { useEffect, useState, useRef } from 'react'
import styles from '../component/styles/SearchCountries.module.css'

import SearchBox from '../component/searchBar/SearchBox'
import PageLoader from '../component/layout/PageLoader'
import CountriesList from '../component/countries/CountriesList'
import useFetch from '../hooks/UseFetch'


function SearchCountries() {

    console.log('Page re-render');

    const searchInputRef = useRef(null);
    const regionRef = useRef(null);
    const debounceTimeoutRef = useRef(null);
    // const [isLoading, setIsLoading] = useState(false);
    const [filteredCountries, setFilteredCountries] = useState([]);

    const { isLoading, error, callFetch } = useFetch();



    const handleSearchChange = () => {
        clearTimeout(debounceTimeoutRef.current);

        // if (!isLoading) {
        //     console.log('loading once');
        //     setIsLoading(true);
        // }

        debounceTimeoutRef.current = setTimeout(() => {
            const searchTerm = searchInputRef.current.value;
            console.log("calling API for:", searchTerm);

            buildEndpoint();
        }, 900);
    };

    useEffect(() => {

        console.log('Data first loaded');
        buildEndpoint();


        return () => {
            clearTimeout(debounceTimeoutRef.current);
        }
    }, []);


    const buildEndpoint = () => {
        const searchedTerm = searchInputRef.current.value.trim().toLowerCase();
        const selectedRegion = regionRef.current.value;

        if (searchedTerm.length > 0 && selectedRegion.length > 0) {
            console.log("Filter by Search+Region");


  const nameSearch = fetch(`https://restcountries.com/v3.1/name/${searchedTerm}`).then((response) => response.json());
  const regionSearch = fetch(`https://restcountries.com/v3.1/region/${selectedRegion}`).then((response) => response.json());

            Promise.all([nameSearch, regionSearch])
                .then(([nameResults, regionResults]) => {
                    const filtered = nameResults.filter((country) =>
                    regionResults.some((regionCountry) => regionCountry.name.common === country.name.common)
                );

                const newData = [];
                for (const key in filtered) {
                    const newRow = {
                        id: key,
                        ...filtered[key]
                    };
                    newData.push(newRow);
                }


                console.log("Data fetched, count:", newData.length);
                setIsLoading(false);
                setFilteredCountries(newData);
            }).catch((error) => {
                console.error('Error fetching search data:', error);
            });




        } else if (selectedRegion.length > 0) {
            console.log("Filter by Region");
            callFetch(`region/${selectedRegion}`)
            .then(d => {
                setFilteredCountries(d);
            });

        } else if (searchedTerm.length > 0) {
            console.log("Filter by SearchBox");
            callFetch(`name/${searchedTerm}`)
            .then(d => {
                setFilteredCountries(d);
            });

        } else  {
            console.log("Show all");
            callFetch("all")
            .then(d => {
                setFilteredCountries(d);
            });
        }
    }

    const changeRegion = (e) => {
        buildEndpoint();
    }


    // const fetchCountries = async (endpoint) => {
    //     const newData = [];
    //     try {
    //         const response = await fetch(`https://restcountries.com/v3.1/${endpoint}`);

    //         if (!response.ok) {
    //             throw Error(response.statusText);
    //         // } else if(response.status === 404) {
    //         //     return Promise.reject('error 404')
    //         // } else {
    //         //     return Promise.reject('some other error: ' + response.status)
    //         }


    //         const data = await response.json();

    //         for (const key in data) {
    //             const newRow = {
    //                 id: key,
    //                 ...data[key]
    //             };
    //             newData.push(newRow);
    //         }

    //         console.log("Data fetched, count:", newData.length);
    //         setIsLoading(false);
    //     } catch (error) {
    //         console.log("fetchCountries error", error);
    //         setIsLoading(false);
    //     }

    //     return newData;
    // }


    return (
        <>
            <section className={styles.search} role="search">
                <div className={styles.search__row}>
                    <SearchBox
                        reff={searchInputRef}
                        onChangeHandler={handleSearchChange}
                    />
                </div>

                <select name="searchRegion" id="searchRegion" ref={regionRef} onChange={changeRegion}>
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