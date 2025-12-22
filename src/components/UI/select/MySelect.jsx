import React from 'react'

const MySelect = ({options, defaultValue, value, onChange}) => {
  // Log all parameters
  console.log("All props MySelect:", { options, defaultValue, value, onChange });
  console.log("Options array:", options);
  console.log("Default value:", defaultValue);

  return (
    <select
        value={value}
        onChange={event => {
          console.log('Current option object:', event.target.value);
          onChange(event.target.value)}
        }
    >
        <option disabled value="">{defaultValue}</option>
        {options.map(option => (
            <option key={option.value} value={option.value}>
                {option.name}
            </option>
        ))} 
    </select>
  )
}

export default MySelect
