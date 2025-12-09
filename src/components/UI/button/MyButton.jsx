import React from 'react';
import classes from './MyButton.module.css'


const MyButton = ({children, ...props}) => {
  
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