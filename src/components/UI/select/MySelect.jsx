import React from 'react'

const MySelect = ({options, defaultValue}) => {
  // Log all parameters
  console.log("All props:", { options, defaultValue });
  console.log("Options array:", options);
  console.log("Default value:", defaultValue);

  return (
    <select>
        <option disabled value="">{defaultValue}</option>
        {options.map(option => {
            // Log each option's details
            console.log("Individual option:", option);
            console.log("Option value:", option.value);
            console.log("Option name:", option.name);

          return (
            <option key={option.value} value={option.value}>
                {option.name}
            </option>
          );
        })}
    </select>
  )
}

export default MySelect
