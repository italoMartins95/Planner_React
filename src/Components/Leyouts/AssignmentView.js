import styles from './AssignmentView.module.css'

import Select from '../Form/Select'
import Input from '../Form/Input'

import { FiX } from "react-icons/fi"
import { FaBell } from 'react-icons/fa'
import { BsExclamation , BsFillRecordFill } from 'react-icons/bs'
import { AiOutlineArrowDown} from 'react-icons/ai'
import { BsFillCheckCircleFill , BsCircleHalf , BsCircle , BsTrash} from 'react-icons/bs'

import { useState } from 'react'

function EditTarefa({closedEditedAssignment , assignment , assignmentEditedUp}){

    const [assignmentEditing , setTarefaEditing] = useState(assignment)
    const [listVerification , setListVerification] = useState(assignmentEditing.listVerification)
    const [listCompleted , setListCompleted] = useState(assignmentEditing.listCompleted)

    var progress = ['Não iniciada' , 'Em andamento' , 'Concluída']
        var positionProgress = 0
            progress.map( (el , index) => {
                if(el == assignment.progress){
                    positionProgress = index
                }
            })

    var priorities = ['Urgente' , 'Importante' , 'Média' , 'Baixa'] 
        var positionPriorities = 0
            priorities.map( (el , index) => {
                if(el == assignment.priorities){
                    positionPriorities = index
                }
            })

    function updateArray(arr , from){
        arr.splice(0, 0, arr.splice(from, 1)[0]);
        return arr;
    }

    updateArray(progress , positionProgress)
    updateArray(priorities , positionPriorities)

    function submitAssignmentEdited(){
        assignmentEditedUp(assignmentEditing)
    }

    function closeEditAssignment(){
        closedEditedAssignment(false)

        submitAssignmentEdited()
    }

    function addAssignmentInList(e){
        e.preventDefault()

        assignmentEditing.listVerification.push(document.getElementById('newTarefa').value)

        document.getElementById('newTarefa').value = ''
        document.getElementById('newTarefa').focus()

        setTarefaEditing({...assignmentEditing, notes: assignmentEditing.notes += ''})
    }    

    function addAssignmentInConcluded(item , index){
        if(listCompleted.indexOf(item) != -1){
            listCompleted.splice(index, 1)
            setTarefaEditing({...assignmentEditing, listCompleted: listCompleted})
            console.log(listCompleted)
        }else{
            listCompleted.push(item)
            setTarefaEditing({...assignmentEditing, listCompleted: listCompleted})
            console.log(listCompleted)
        }
    }

    function removeItenList(iten){
        listVerification.map( (el , index) => {
            if(iten == el){
                listVerification.splice(index , 1)
            }
        })

        listCompleted.map( (el , index) => {
            if(iten == el){
                listCompleted.splice(index , 1)
            }
        })

        setTarefaEditing({...assignmentEditing, listVerification: listVerification})
        setTarefaEditing({...assignmentEditing, listCompleted: listCompleted})
    }
    
    return(
        <section className={styles.newAssignment}>
            <button className={styles.exit} onClick={closeEditAssignment} >
                <FiX />
            </button>
            <fieldset className={styles.identificationAssignment}>
                <div className={styles.nameAssignment}>
                    <label>Nome</label>
                    <Input type='text'
                           placeholder={assignment.name}
                           value={assignmentEditing.name}
                           handleOnChange={(e) => setTarefaEditing({...assignmentEditing, name: e.target.value})}
                    />
                </div>
                <div className={styles.statusAssignment}>
                    <div className={styles.dataProgress}>
                        <label>Progresso</label>
                        <div className={styles.progress}>
                            {
                                    assignmentEditing.progress == 'Não iniciada' ? (
                                        <BsCircle className={styles.BsCircle}/>
                                    ) : ( assignmentEditing.progress == 'Em andamento' ? (
                                            <BsCircleHalf className={styles.BsCircleHalf}/>
                                        ) : ( 
                                                <BsFillCheckCircleFill className={styles.BsFillCheckCircleFill}/>          
                                            )
                                        )                          
                            }   
                            <Select options={progress}
                                    handleOnChange={(e) => setTarefaEditing({...assignmentEditing, progress: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className={styles.dataPrioritie}>
                        <label>Prioridade</label>
                        <div className={styles.priorities}>  
                            {
                                assignmentEditing.priorities == 'Urgente' ? (
                                    <FaBell className={styles.FaBell}/>
                                ) : ( assignmentEditing.priorities == 'Importante' ? (
                                        <BsExclamation className={styles.BsExclamation}/>
                                    ) : ( assignmentEditing.priorities == 'Média' ? (
                                            <BsFillRecordFill className={styles.BsFillRecordFill}/>
                                        ) : (
                                                <AiOutlineArrowDown className={styles.AiOutlineArrowDown}/>                                  
                                            )
                                        ) 
                                    )                            
                            }                          
                            <Select options={priorities}
                                    handleOnChange={(e) => setTarefaEditing({...assignmentEditing, priorities: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className={styles.start}>
                        <label>Início</label>
                        <Input type='date' 
                               value={assignmentEditing.start}
                               handleOnChange={(e) => setTarefaEditing({...assignmentEditing, start: e.target.value})}
                        />  
                    </div>
                    <div className={styles.end}>
                        <label>Fim</label>
                        <Input type='date' 
                               value={assignmentEditing.end}
                               handleOnChange={(e) => setTarefaEditing({...assignmentEditing, end: e.target.value})}
                        />  
                    </div>
                </div>
            </fieldset>

            <fieldset className={styles.notes}>
                <label>Anotações</label>
                <textarea placeholder='Escreva aqui algo importante sobre essa tarefa'
                          value={assignmentEditing.notes}
                          onChange={(e) => setTarefaEditing({...assignmentEditing, notes: e.target.value})}          
                />
            </fieldset>

            <fieldset className={styles.list}>
                <label>Lista de verificação</label>
                <form onSubmit={addAssignmentInList}>
                    <Input type='text'
                           inputId='newTarefa'
                           placeholder={'Insira novo itens'}
                    />
                </form> 
                <ul>
                    {                        
                        listVerification &&

                        listVerification.map( (el ,index) => {
                                if(listCompleted.indexOf(el) == -1){
                                    return(
                                        <li className={styles.liAssignment} key={index}>
                                            <Input type='checkbox' 
                                                   checked={false}
                                                   handleOnChange={(e) => {addAssignmentInConcluded(el)}}
                                            />
                                            <span>{el}</span>
                                            <button onClick={(e) => {removeItenList(el)}}>
                                                <BsTrash />
                                            </button>
                                        </li>
                                    )
                                } 
                        })
                    }
                    {
                        assignmentEditing.listCompleted && 

                        listCompleted.map( (el , index) => {
                            return(
                                <li className={styles.liAssignment} key={index}>
                                    <Input type='checkbox' 
                                        checked={true}
                                        handleOnChange={(e) => {addAssignmentInConcluded(el , index)}}
                                    />
                                    <span><del>{el}</del></span>
                                    <button onClick={(e) => {removeItenList(el)}}>
                                        <BsTrash />
                                    </button>
                                </li>   
                            )
                        })   
                    }
                </ul>                                 
            </fieldset>
        </section>
    )
}

export default EditTarefa
