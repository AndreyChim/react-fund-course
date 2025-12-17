import React, {useEffect, useRef} from 'react'
import MyInput from './UI/input/MyInput'
import MySelect from './UI/select/MySelect'

const PostFilter = ({filter, setFilter}) => {
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
    console.log(`📊 PostFilter Render #${renderCount.current}`);
    console.log('   Current filter:', filter);
    console.log('   Sort value:', filter.sort);
    console.log('   Query value:', filter.query);
    console.log('---');
  }, [filter]);

  return (
    <div>
    <MyInput
        value={filter.query}
        onChange={e => setFilter({...filter, query: e.target.value})}
        placeholder="Search"
    />
    <MySelect
        value={filter.sort}
        onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
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
