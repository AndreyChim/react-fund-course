import React from 'react';
import classes from './MyButton.module.css'

const MyButton = (props) => {
  console.log('props', props)
  console.log('props.children', props.children)
  return (
    <button className={classes.myBtn}>
      {props.children}
    </button>
  )
}

export default MyButton
