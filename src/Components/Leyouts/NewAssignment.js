import styles from './NewAssignment.module.css'

import Input from '../Form/Input'
import {BiCheck} from  'react-icons/bi'
import { useState } from 'react'

function NewAssignment({newAssignmentUp , idNewAssignment}){

    const date = new Date

    var year = date.getFullYear()
    var month = date.getMonth()
    var day = date.getDate()

    if (month < 10) {
        month = `0${month}`
    }

    if (day < 10){
        day = `0${day}`
    }

    const fullDate = `${year}-${month}-${day}`

    const [newAssignment , setnewAssignment] = useState({listVerification: [],
                                                         listCompleted: [],
                                                         progress: 'Não iniciada',
                                                         priorities: 'Média',
                                                         start: fullDate,
                                                         id: idNewAssignment})


                                                         
    const submitNewAssignment = (e) => {
        newAssignmentUp(newAssignment)
    }


    return(
        <aside className={styles.newAssignment}>
                    <Input type='text'
                           placeholder='Insira um nome para a tarefa'
                           handleOnChange={(e) => setnewAssignment({...newAssignment, name: e.target.value})}
                    />
                    <div>
                        <label>Data de conclusão</label>
                        <div>
                            <Input type='date'
                                   handleOnChange={(e) => setnewAssignment({...newAssignment, end: e.target.value})}
                            />
                        </div>                        
                    </div>            
                    <button onClick={submitNewAssignment}><BiCheck /></button> 
        </aside>
    )
}

export default NewAssignment
