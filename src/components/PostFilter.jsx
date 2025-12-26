import React from 'react'
import MyInput from './UI/input/MyInput'
import MySelect from './UI/select/MySelect'

const PostFilter = ({filter, setFilter}) => {
  return (
    <div>
    <MyInput
        // value={searchQuery}
        // onChange={e => setSearchQuery(e.target.value)}
        value={filter.query}    // Display current query
        onChange={e => {
          // Update filter, keeping sort the same
          setFilter({
            ...filter,                  // Copy all properties
            query: e.target.value   // Update just query
          })
        }}
        placeholder="Search"
    />
    <MySelect
        // value={selectedSort}
        // onChange={sortPosts}
        value={filter.sort}         // Display current sort
        onChange={selectedSortValue => {
          // Update filter, keeping query the same
            setFilter({
                ...filter,                // Copy all properties
                sort: selectedSortValue   // Update just sort
          })
        }}
        // e.g. selectedSortValue = "title" (automatically!)
        // onChange={"title" => setFilter({...filter, sort: "title"})}

        defaultValue="Sorting"
        options={[
          {value: 'title', name: 'By title'},
          {value: 'body', name: 'By body'}
        ]}
    />
</div>
  )
}

export default PostFilter
