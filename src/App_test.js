import React, { useState } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MySelect from "./components/UI/select/MySelect";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'cc', body: 'zz' },
    { id: 2, title: 'bb', body: 'yy' },
    { id: 3, title: 'aa', body: 'xx' }
  ]);
  
  const [selectedSort, setSelectedSort] = useState('');
  const [logs, setLogs] = useState([]);

  // Method 1: Direct mutation (WRONG WAY) - FIXED
  const sortPostsDirect = (sort) => {
    console.log("=== METHOD 1: DIRECT MUTATION ===");
    
    // Store original posts BEFORE sorting
    const postsBeforeSort = [...posts]; // ✅ Now defined
    
    console.log("1. Original array BEFORE sort:", postsBeforeSort);
    console.log("2. Array reference (before):", posts);
    
    // ❌ Direct mutation - modifies the existing array
    posts.sort((a, b) => a[sort].localeCompare(b[sort]));
    
    console.log("3. After calling posts.sort():", [...posts]);
    console.log("4. Array reference (after):", posts, "Same reference? YES!");
    
    setPosts(posts); // ❌ Setting the same reference
    
    // Add to logs
    setLogs(prev => [...prev, {
      method: 'Direct Mutation',
      before: postsBeforeSort, // ✅ Now using defined variable
      after: [...posts],
      referenceSame: true
    }]);
  };

  // Method 2: Copy then sort (CORRECT WAY)
  const sortPostsCopy = (sort) => {
    console.log("=== METHOD 2: COPY THEN SORT ===");
    
    // Store original for comparison
    const originalPosts = [...posts];
    
    console.log("1. Original array BEFORE sort:", originalPosts);
    console.log("2. Array reference (before):", posts);
    
    // ✅ Create copy first, then sort
    const postsCopy = [...posts];
    postsCopy.sort((a, b) => a[sort].localeCompare(b[sort]));
    
    console.log("3. After sorting copy:", postsCopy);
    console.log("4. Original array unchanged:", [...posts]);
    console.log("5. Array reference (new):", postsCopy, "Same? NO!");
    
    setPosts(postsCopy); // ✅ Setting new array reference
    
    setLogs(prev => [...prev, {
      method: 'Copy Then Sort',
      before: originalPosts,
      after: postsCopy,
      referenceSame: false
    }]);
  };

  // Original sort function (fixed with proper copy)
  const sortPosts = (sort) => {
    console.log("=== ORIGINAL SORT FUNCTION ===");
    
    const original = [...posts];
    console.log("Original (before):", original.map(p => p.title));
    
    setSelectedSort(sort);
    setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
    
    // Note: posts here is still the OLD state until next render
    console.log("After setState (posts still old):", posts.map(p => p.title));
  };

  // Other functions
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };
  
  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id));
  };

  return (
    <div className="App">
      <PostForm create={createPost}/>
      <hr style={{margin: '15px 0'}}/>
      
      <div>
        {/* Original select */}
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
      
      {/* Testing section */}
      <div style={{ margin: '20px 0', padding: '10px', border: '2px solid #ccc' }}>
        <h3>Test Sorting Methods</h3>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button onClick={() => sortPostsDirect('title')}>
            Sort Directly (Wrong)
          </button>
          <button onClick={() => sortPostsCopy('title')}>
            Sort with Copy (Correct)
          </button>
          <button onClick={() => {
            // Reset to initial state
            setPosts([
              { id: 1, title: 'bb', body: 'zz' },
              { id: 2, title: 'aa', body: 'yy' },
              { id: 3, title: 'cc', body: 'xx' }
            ]);
            setLogs([]);
            console.log("Reset to initial state");
          }}>
            Reset Posts
          </button>
        </div>
        
        <h4>Current Posts:</h4>
        <div style={{ marginBottom: '20px' }}>
          {posts.map(post => (
            <div key={post.id} style={{ padding: '5px', borderBottom: '1px solid #eee' }}>
              ID: {post.id}, Title: {post.title}, Body: {post.body}
            </div>
          ))}
        </div>
        
        <h4>Test Logs:</h4>
        {logs.map((log, index) => (
          <div key={index} style={{ 
            marginBottom: '10px', 
            padding: '10px', 
            border: '1px solid #ddd',
            backgroundColor: log.method === 'Copy Then Sort' ? '#e8f5e9' : '#ffebee'
          }}>
            <strong>{log.method}</strong>
            <div>Before: [{log.before.map(p => p.title).join(', ')}]</div>
            <div>After: [{log.after.map(p => p.title).join(', ')}]</div>
            <div>Same array reference? {log.referenceSame ? 'YES ⚠️' : 'NO ✅'}</div>
          </div>
        ))}
      </div>
      
      {/* Original post list */}
      {posts.length
          ?
          <PostList remove={removePost} posts={posts} title="List of posts 1"/>
          :
          <h1 style={{textAlign: "center"}}>
              No posts found!
          </h1>
      }
    </div>
  );
}

export default App;