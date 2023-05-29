import styles from '../styles/PageLoader.module.css'

function PageLoader() {
    return (
        <div className={styles['page-loader']}>
            <i className="fa-solid fa-flag"></i>
            <p>loading...</p>
        </div>
    )
}

export default PageLoader;