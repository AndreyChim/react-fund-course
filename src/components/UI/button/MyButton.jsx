import React from 'react';
import classes from './MyButton.module.css'


const MyButton = ({children, ...props}) => {
  
  console.log('Inserts whatever was between `<MyButton>` and `</MyButton>` tags; children:', children)
  console.log('props:', props)
  console.log('children, ...props:', {children, ...props})
  return (

    <button {...props} className={classes.myBtn}>
        {children}
    </button>
  )
}

export default MyButton

// Desctructure
// const MyButton = ({children, ...props}) => { 
  // <button {...props} className={classes.myBtn}>
  //       {children}
  // </button>

// Without desctructure
// const MyButton = (props) => {
//   <button className={classes.myBtn}>
//     {props.children}
//   </button>