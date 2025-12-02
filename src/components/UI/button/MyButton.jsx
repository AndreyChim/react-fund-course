import React from 'react';
import classes from './MyButton.module.css'

const MyButton = ({children, ...props}) => {
  
  console.log('children:', children)
  return (
    <button className={classes.myBtn}>
      {children}
    </button>
  )
}

export default MyButton
