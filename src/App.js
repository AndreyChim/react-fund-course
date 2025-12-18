import React, { useMemo, useState } from "react";
import PostFilter from "./components/PostFilter";

function App() {
  const posts = [
    { id: 1, title: 'aa', body: 'zz'}, 
    { id: 2, title: 'gg', body: 'yy'}, 
    { id: 3, title: 'bb', body: 'cc'}
  ]
 
  // APPROACH 1: Single object state
  const [filter, setFilter] = useState({sort: '', query: ''})
  
  // APPROACH 2: Separate states  
  const [selectedSort, setSelectedSort] = useState('')
  const [query, setQuery] = useState('')

  // Function to demonstrate both approaches
  const logBothApproaches = (action, newSort, newQuery) => {
    console.log(`\n=== ${action} ===`);
    console.log('APPROACH 1 (Single Object):', {filter, newFilter: {sort: newSort, query: newQuery}});
    console.log('APPROACH 2 (Separate):', {selectedSort, newSort, query, newQuery});
  };

  // Demo: Change sort (simulate dropdown selection)
  const handleSortChange = (sortValue) => {
    logBothApproaches('CHANGING SORT', sortValue, query);
    
    // Approach 1 update
    setFilter({...filter, sort: sortValue});
    
    // Approach 2 update  
    setSelectedSort(sortValue);
  };

  // Demo: Change query (simulate typing)
  const handleQueryChange = (queryValue) => {
    logBothApproaches('CHANGING QUERY', selectedSort, queryValue);
    
    // Approach 1 update
    setFilter({...filter, query: queryValue});
    
    // Approach 2 update
    setQuery(queryValue);
  };

  return (
    <div>
      <h2>State Approach Comparison</h2>
      
      <div style={{margin: '20px 0', padding: '10px', background: '#f0f0f0'}}>
        <h3>Current State Values:</h3>
        <p><strong>Approach 1 (filter):</strong> {JSON.stringify(filter)}</p>
        <p><strong>Approach 2 separate:</strong> sort='{selectedSort}', query='{query}'</p>
      </div>

      <div style={{display: 'flex', gap: '20px'}}>
        <div style={{flex: 1, padding: '10px', border: '1px solid #ccc'}}>
          <h3>Approach 1: Single Object</h3>
          <button onClick={() => handleSortChange('title')}>
            Set Sort to 'title'
          </button>
          <button onClick={() => handleSortChange('body')}>
            Set Sort to 'body'
          </button>
          <br/>
          <input 
            value={filter.query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Type for query..."
          />
        </div>

        <div style={{flex: 1, padding: '10px', border: '1px solid #ccc'}}>
          <h3>Approach 2: Separate States</h3>
          <button onClick={() => setSelectedSort('title')}>
            Set Sort to 'title'
          </button>
          <button onClick={() => setSelectedSort('body')}>
            Set Sort to 'body'
          </button>
          <br/>
          <input 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type for query..."
          />
        </div>
      </div>
    </div>
  );
}

export default App;