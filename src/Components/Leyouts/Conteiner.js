import styles from './Conteiner.module.css'

function Conteiner(props){
    return (
        <main className={styles.mainConteiner}>
                {props.children}
        </main>
    )
}

export default Conteiner