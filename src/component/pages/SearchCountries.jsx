import { useState } from 'react'
import SearchBox from '../searchBar/SearchBox'
import styles from '../styles/SearchCountries.module.css'


function SearchCountries() {

    const [searchTerm, setSearchTerm] = useState('');

    return (
        <>
            <section className={styles.search} role="search">
                <div className={styles.search__row}>
                    <SearchBox />
                </div>
            </section>
        </>
    )
}


export default SearchCountries;