import { useEffect, useState, useRef } from 'react'
import styles from '../styles/SearchCountries.module.css'

import SearchBox from '../searchBar/SearchBox'
import PageLoader from '../layout/PageLoader'

import data from '../../data.json'

function SearchCountries() {

    console.log('Page re-render');

    const searchInputRef = useRef(null);
    const debounceTimeoutRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);

    const handleSearchChange = () => {
        clearTimeout(debounceTimeoutRef.current);

        if (!isLoading) {
            console.log('loading once');
            setIsLoading(true);
        }

        debounceTimeoutRef.current = setTimeout(() => {
            const searchTerm = searchInputRef.current.value;
            console.log("calling API for:", searchTerm);
            setIsLoading(false);
        }, 900);
    };

    useEffect(() => {
        console.log('Data first loaded');
        return () => {
            clearTimeout(debounceTimeoutRef.current);
        }
    }, []);



    return (
        <>
            <section className={styles.search} role="search">
                <div className={styles.search__row}>
                    <SearchBox
                        reff={searchInputRef}
                        onChangeHandler={handleSearchChange}
                    />
                </div>

                <div>Loading: {isLoading.toString()}</div>
            </section>

            { isLoading && <PageLoader /> }
        </>
    )
}


export default SearchCountries;