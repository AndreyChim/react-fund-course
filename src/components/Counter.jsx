import React, { useState } from 'react'

const Counter = function () {
  // const count = useState(0)  // useState returns an array of two objects to console [0, f] f - The function is intended to change the state
  // console.log(count)       

  const [count, setCount] = useState(0) // const count destructuring to const [count, setCount]
                                          
      console.log(count)                  // we see to console a count value
      console.log(setCount)               // we see to console a setCount function

        function increment() { 
            setCount(count + 1) // we don't change count value directly count += 1 but by built-in function, e.g. setCount
        }
        
        function decrement() {
            setCount(count - 1) 
        
        }
        
        return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>   {/* We don't call the function increment(), but pass it as a reference {increment} */}
            <button onClick={decrement}>Decrement</button>
        </div>
    )
}

  
export default Counter
