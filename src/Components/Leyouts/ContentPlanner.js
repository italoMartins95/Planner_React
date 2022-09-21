import style from './ContentPlanner.module.css'

import Category from './Category'
import NewCategory from './NewCategory'

import {AiFillPlusCircle} from  'react-icons/ai'

import { useEffect , useState } from 'react'
import { parse , v4 as uuidv4 } from 'uuid'

function ContentPlanner(){
 
    const [categorys , setCategorys] = useState([])
    const [newCategoryShow , setNewCategoryShow] = useState(false)
    
    var idNewCategory = Math.floor(Math.random() * (250 - 1) + 1)

    
    categorys.map( el => {
        if(el.id == idNewCategory){
            idNewCategory = Math.floor(Math.random() * (250 - 1) + 1)
        }else{
            idNewCategory = idNewCategory
        }
    })

    useEffect( () => {
        refresh()
    },[])

    function refresh(){
        fetch('http://localhost:5000/category', {
            method:'GET',
            headers : {'Content-Type':'Application/json'}
            })
            .then(response => response.json())
            .then(data => setCategorys(data))
            .catch(error => console.log(error))

            setNewCategoryShow(false)
    }

    function removeCategory(id){
        fetch(`http://localhost:5000/category/${id}` , {
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json'
            }})
            .then(response => response.json())
            .then(() => {
                setCategorys(categorys.filter((category) =>
                category.id != id))
            })
            .catch(error => console.log(error))
    }

    return(
        <>
            {categorys &&
                (   
                    categorys.map( category => (<Category nameCategory={category.name} 
                                                          assignment={category.assignment} 
                                                          idCategory={category.id}
                                                          key={uuidv4()}
                                                          refreshCategorys={refresh}
                                                          selfCategory={category}
                                                          removeCategoryUp={removeCategory}
                                                />))
                )                                     
            } 
            <div className={style.more}>
                <div className={style.moreContent} onClick={(e) => {setNewCategoryShow(!newCategoryShow)}}>
                    <AiFillPlusCircle />
                    <p>Nova Categoria</p>
                </div> 
                {
                    newCategoryShow &&
                    <NewCategory newCategoryUp={refresh}
                                 idNewCategory={idNewCategory}/>
                } 
            </div>                 
        </>
    )
}

export default ContentPlanner