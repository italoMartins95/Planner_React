function Input({type , checked , inputId , handleOnChange , placeholder , value}){
    return(
        <input type={type} 
               placeholder={placeholder} 
               defaultChecked={checked}
               onChange={handleOnChange}
               id={inputId}
               value={value}
        />
    )
}

export default Input