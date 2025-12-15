import React from 'react'

const PostFilter = () => {
  return (
    <div>
    <MyInput
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search"
    />
    <MySelect
        value={selectedSort}
        onChange={sortPosts}
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
