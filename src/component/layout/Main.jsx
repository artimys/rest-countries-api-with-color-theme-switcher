import styles from '../styles/Main.module.css'


function Main(props) {
    return(
        <main className={styles.container}>
            {props.children}
        </main>
    )
}


export default Main;