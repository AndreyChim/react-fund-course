import React from 'react'

const MySelect = ({options, defaultValue, value, onChange}) => {
  // Log all parameters
  // console.log("All props:", { options, defaultValue });
  // console.log("Options array:", options);
  // console.log("Default value:", defaultValue);
  // console.log("MySelect rendering with value:", value);
  // console.log("onChange:", onChange);

  return (
    <select
        value={value}
        onChange={event => {
          // console.log("=== EVENT TARGET DETAILS ===");
          // console.log("event.target:", event.target);
          // console.log("User selected:", event.target.value);
          // console.log("Calling parent's onChange with:", event.target.value);
          // console.log("event.target.selectedIndex:", event.target.selectedIndex);
          // console.log("event.target.options:", event.target.options);
          
          // Get the selected option text
          const selectedOption = event.target.options[event.target.selectedIndex];
          // console.log("Selected option text:", selectedOption?.text);
          
          // Call the original onChange handler
          onChange(event.target.value);
        }}
    >
        <option disabled value="">{defaultValue}</option>
        {options.map(option => {
            // Log each option's details
            // console.log('Current option object:', option);
            // console.log('Type of option:', typeof option);
            // console.log('Keys in option:', Object.keys(option));
            // console.log("Option value:", option.value);
            // console.log("Option name:", option.name);

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
