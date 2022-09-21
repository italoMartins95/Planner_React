import styles from './Category.module.css'

import Assignment from './Assignment'
import NewAssignment from './NewAssignment'

import {BiLayerPlus} from  'react-icons/bi'
import { BsTrash } from 'react-icons/bs'

import { useState , useEffect } from 'react'
import { parse , v4 as uuidv4 } from 'uuid'

function Categorias({nameCategory , assignment , idCategory , refreshCategorys , selfCategory , removeCategoryUp}){

    const [category , setCategory] = useState(selfCategory)
    const [newAssignmentShow , setNewAssignmentShow] = useState(false)

    var idNewAssignment = Math.floor(Math.random() * (250 - 1) + 1)

    category.assignment.map( el => {
        if(el.id == idNewAssignment){
            idNewAssignment = Math.floor(Math.random() * (250 - 1) + 1)
        }else{
            idNewAssignment = idNewAssignment
        }
    })
    
    function callFetch(){
        fetch(`http://localhost:5000/category/${idCategory}`, {
            method:'PATCH',
            headers : {'Content-Type':'Application/json'},
            body: JSON.stringify(category)
            })
            .then(response => response.json())
            .then(data => setCategory(data))
            .catch(error => console.log(error))
    }

    function editAssignment(assignmentConcluded , idAssignment){
        category.assignment.map( (assignment , index) => {
            if(assignment.id == idAssignment){
                category.assignment[index].listCompleted = assignmentConcluded
            }
        })

        callFetch()
    }

    function assignmentEditedUp(tarefaEditing){

        category.assignment.map( (el , index) => {
            if(el.id == tarefaEditing.id){
                category.assignment[index] = tarefaEditing
            }
        })
        
        callFetch()

        refreshCategorys()
    }

    function newAssignmentSetup(newAssignment){
        category.assignment.push(newAssignment)

        callFetch()

        refreshCategorys()
        setNewAssignmentShow(!newAssignmentShow)
    }

    function removeAssignment(assignmentUp){

        category.assignment.map( (el , index) => {
            if(el.id == assignmentUp.id){
                category.assignment.splice(index , 1)
            }
        })

        callFetch()

        refreshCategorys()
    }

    function removeCategory(){
        removeCategoryUp(selfCategory.id)
    }

    return(
        <section className={styles.category} id={idCategory} key={idCategory}>
            <h2>{nameCategory}</h2>
            <button className={styles.trashCategory} onClick={removeCategory}>
                    <BsTrash />
            </button>
            <div className={styles.categoryContent}>
                {
                    assignment.map( assignment => (<Assignment nameAssignment={assignment.name} 
                                                    listAssignment={assignment.listVerification} 
                                                    assignmentConcluded={assignment.listCompleted} 
                                                    endDate={assignment.end} 
                                                    idAssignment={assignment.id} 
                                                    key={uuidv4()}
                                                    handleOnChange={editAssignment}
                                                    selfAssignment={assignment}
                                                    assignmentEdited={assignmentEditedUp}
                                                    removeAssignmentUp={removeAssignment}
                                            />)                                                
                                )
                }           
                {
                    newAssignmentShow && 
                    <NewAssignment newAssignmentUp={newAssignmentSetup}
                                idNewAssignment={idNewAssignment}/>
                }
                <div className={styles.more} onClick={(e) => {setNewAssignmentShow(!newAssignmentShow)}}>
                    <BiLayerPlus />
                    <p>Nova tarefa</p>
                </div>
            </div>
        </section>
    )
}

export default Categorias