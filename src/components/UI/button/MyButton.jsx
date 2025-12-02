import React from 'react';
import classes from './MyButton.module.css'

const MyButton = ({children, ...props}) => {
  
  console.log('children:', children)
  console.log('props:', props)
  console.log('children, ...props:', {children, ...props})
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  )
}

export default MyButton
