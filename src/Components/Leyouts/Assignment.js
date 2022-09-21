import styles from './Assignment.module.css'

import Input from '../Form/Input'
import AssignmentView from './AssignmentView'

import {BiCalendar} from 'react-icons/bi'
import { FaBell } from 'react-icons/fa'
import { BsExclamation , BsFillRecordFill } from 'react-icons/bs'
import { AiOutlineArrowDown} from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'

import { useState } from 'react'

function Tarefas({nameAssignment , listAssignment , assignmentConcluded , endDate , idAssignment , handleOnChange , selfAssignment , assignmentEdited , removeAssignmentUp}){

    const [editAssignmentShow , setEditAssignmentShow] = useState(false)
    const [selfTarefa , setSelfTarefa] = useState(selfAssignment)

    var assignmentOk = 0
    var totAssignment = 0

    listAssignment.map( el => {
        totAssignment += 1
        if(assignmentConcluded.includes(el)){
            assignmentOk += 1
        }
    })

    var tarefasConcluidas = assignmentOk == totAssignment ? true : false
    
    const assignmentRefresh = listAssignment.filter( el => {
        return assignmentConcluded.indexOf(el) == -1
    })

    function completeAssignment(el){
        assignmentConcluded.push(el)       
            handleOnChange(assignmentConcluded , idAssignment)
    }

    function assignmentEditedUp(tarefaEditing){
        assignmentEdited(tarefaEditing)
    }

    function removeAssignment(){
        removeAssignmentUp(selfAssignment)
    }

    return(
        <article className={styles.assignment} key={idAssignment} id={idAssignment}> 
            <div className={styles.nameAssignment}>
                <Input type='checkbox' 
                       checked={tarefasConcluidas}
                />
                <span onClick={(e) => {setEditAssignmentShow(!editAssignmentShow)}}>{nameAssignment}</span>
                <button className={styles.trashAssignment} onClick={removeAssignment}>
                    <BsTrash />
                </button>
            </div>
            <ul className={styles.listAssignment}>
                {
                    assignmentRefresh.map( (el , index) =>
                    <li key={index}>
                        <Input type='checkbox' handleOnChange={(e) => {completeAssignment(el)}} checked={false}/>
                        <span>{el}</span>
                    </li>)
                }
            </ul>
            <div className={styles.detailsAssignment}>
                <div className={styles.assignmentSteps}>
                    {
                        selfTarefa.priorities == 'Urgente' ? (
                            <FaBell className={styles.FaBell}/>
                        ) : ( selfTarefa.priorities == 'Importante' ? (
                                <BsExclamation className={styles.BsExclamation}/>
                            ) : ( selfTarefa.priorities == 'Média' ? (
                                    <BsFillRecordFill className={styles.BsFillRecordFill}/>
                                ) : (
                                        <AiOutlineArrowDown className={styles.AiOutlineArrowDown}/>
                                    )
                                ) 
                            )  
                    }
                    <span>{assignmentOk}/{totAssignment}</span>
                </div>
                <div className={styles.dateAssignment}>
                    <BiCalendar />
                    {endDate.substring(8,10)}/{endDate.substring(5,7)}
                </div>
            </div>
            {
                editAssignmentShow && <AssignmentView closedEditedAssignment={setEditAssignmentShow}
                                                      assignment={selfAssignment}
                                                      assignmentEditedUp={assignmentEditedUp}
                                    />
            }
        </article>
    )
}

export default Tarefas