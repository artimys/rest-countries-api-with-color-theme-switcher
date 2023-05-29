import { useEffect, useState } from 'react'
import SearchBox from '../searchBar/SearchBox'
import styles from '../styles/SearchCountries.module.css'
import data from '../../data.json'

function SearchCountries() {

    const [searchTerm, setSearchTerm] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const searchDelay = setTimeout(() => {
            console.log("calling API for:", searchTerm);
            setIsLoading(false);
            setData(data);
        }, 900);

        return () => {
            clearTimeout(searchDelay);
        }
    }, [searchTerm])

    const getSearchTermHandler = (e) => {
        const value = e.target.value;
        // console.log(value);
        setSearchTerm(value)
        setIsLoading(true);
    }

    console.log('page re-render');

    return (
        <>
            <section className={styles.search} role="search">
                <div className={styles.search__row}>
                    <SearchBox
                        value={searchTerm}
                        onChangeHandler={getSearchTermHandler}
                    />
                </div>
               <div>{searchTerm}, Loading: {isLoading.toString()}</div>
            </section>
        </>
    )
}


export default SearchCountries;