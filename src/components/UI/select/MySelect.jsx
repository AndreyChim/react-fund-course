import React from 'react'

const MySelect = ({options, defaultValue, value, onChange}) => {
  // Log all parameters
  console.log("All props:", { options, defaultValue });
  console.log("Options array:", options);
  console.log("Default value:", defaultValue);

  return (
    <select
        value={value}
        onChange={event => onChange(event.target.value)}
    >
        <option disabled value="">{defaultValue}</option>
        {options.map(option => {
            // Log each option's details
            console.log('Current option object:', option);
            console.log('Type of option:', typeof option);
            console.log('Keys in option:', Object.keys(option));
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
