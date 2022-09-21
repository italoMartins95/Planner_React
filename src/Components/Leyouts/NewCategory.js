import styles from './NewCategory.module.css'

import Input from '../Form/Input'
import {BiCheck} from  'react-icons/bi'
import { useState } from 'react'

function NewCategory({idNewCategory , newCategoryUp}){


    const [newCategory , setNewCategory] = useState({name: '',
                                                     assignment: [],
                                                     id: idNewCategory})
 
    function submitNewCategory(){
        fetch("http://localhost:5000/category/", {
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(newCategory)})
            .then(response => response.json())
            .then(data => setNewCategory(data))
            .catch(error => console.log(error))

        newCategoryUp()
    }

    
    return(
        <aside className={styles.newCategory}>
                    <Input type='text'
                           placeholder='Insira um nome para a categoria'
                           handleOnChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    />           
                    <button onClick={submitNewCategory}><BiCheck /></button> 
        </aside>
    )
}

export default NewCategory