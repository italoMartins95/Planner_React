import styles from './Select.module.css'

function Select({options , id , handleOnChange}){
    return(
        <select className={styles.select} onChange={handleOnChange} id={id}>
            {
                options &&
                (
                    options.map( el => 
                        <option value={el.nome || el} key={el.id || el}>
                                {el.nome || el}
                        </option>
                    )
                )
            }
        </select>
    )
}

export default Select