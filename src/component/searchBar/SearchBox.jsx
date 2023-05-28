import styles from '../styles/SearchBox.module.css';

function SearchBox(props) {
    return(
        <div className={styles.search__country}>
            <div className={styles['custom-textbox']}>
                <input type="text" id="searchCountry"
                                  className={styles['custom-textbox__input']}
                                  title="Search for a country..."
                                  placeholder="Search for a country..."
                                  autoComplete="off"
                />
            </div>
        </div>
    );
}

export default SearchBox;