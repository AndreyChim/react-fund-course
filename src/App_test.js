import React, { useState } from "react";

// Helper to track array references
const arrayTracker = new Map();
let nextId = 0;

const getArrayId = (array) => {
  if (!arrayTracker.has(array)) {
    arrayTracker.set(array, nextId++);
  }
  return arrayTracker.get(array);
};

// Helper to create deep copy for logging
const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

// Helper to log array state with timestamp
const logArrayState = (label, array) => {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  console.log(`[${timestamp}] ${label}:`, deepCopy(array));
  console.log(`${label} order:`, array.map(item => `"${item.title}"`).join(', '));
};

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'cc', body: 'zz' },
    { id: 2, title: 'bb', body: 'yy' },
    { id: 3, title: 'aa', body: 'xx' }
  ]);
  
  const [selectedSort, setSelectedSort] = useState('');
  const [logs, setLogs] = useState([]);
  const [sortMethod, setSortMethod] = useState('');

  // Method 1: Direct mutation (WRONG WAY) - FIXED
  const sortPostsDirect = (sort) => {
    console.clear();
    console.log("=== METHOD 1: DIRECT MUTATION (WRONG) ===");
    setSortMethod('direct');
    
    // Create DEEP COPY for logging BEFORE state
    const postsBeforeSort = deepCopy(posts);
    const originalRefId = getArrayId(posts);
    
    console.log("📌 BEFORE Mutation:");
    console.log("Array object (reference):", posts);
    console.log("Deep copy (actual values):", postsBeforeSort);
    console.log("Reference ID:", originalRefId);
    console.log("Original order:", postsBeforeSort.map(p => p.title).join(', '));
    
    // ❌ Direct mutation - modifies the existing array
    console.log("\n🔄 Mutating array with .sort()...");
    posts.sort((a, b) => {
      const comparison = a[sort].localeCompare(b[sort]);
      console.log(`   Comparing "${a[sort]}" vs "${b[sort]}": ${comparison}`);
      return comparison;
    });
    
    // Create DEEP COPY for logging AFTER state
    const postsAfterSort = deepCopy(posts);
    const currentRefId = getArrayId(posts);
    
    console.log("\n📌 AFTER Mutation:");
    console.log("Array object (same reference):", posts);
    console.log("Deep copy (actual values):", postsAfterSort);
    console.log("Reference ID:", currentRefId);
    console.log("Sorted order:", postsAfterSort.map(p => p.title).join(', '));
    
    console.log("\n🔍 COMPARISON:");
    console.log("Same reference?", originalRefId === currentRefId ? "✅ YES - Same array object" : "❌ NO - Different array");
    console.log("React will update?", originalRefId === currentRefId ? "❌ Probably NOT (same reference)" : "✅ YES (new reference)");
    
    setSelectedSort(sort);
    setPosts(posts); // ❌ Setting the same reference
    
    // Add to logs
    setLogs(prev => [...prev, {
      method: 'Direct Mutation',
      before: postsBeforeSort,
      after: postsAfterSort,
      referenceSame: true,
      referenceId: originalRefId
    }]);
  };

  // Method 2: Copy then sort (CORRECT WAY)
  const sortPostsCopy = (sort) => {
    console.clear();
    console.log("=== METHOD 2: COPY THEN SORT (CORRECT) ===");
    setSortMethod('copy');
    
    // Log original state
    const originalPosts = deepCopy(posts);
    const originalRefId = getArrayId(posts);
    
    console.log("📌 BEFORE Creating Copy:");
    console.log("Original array:", originalPosts);
    console.log("Reference ID:", originalRefId);
    console.log("Original order:", originalPosts.map(p => p.title).join(', '));
    
    // ✅ Create copy first (NEW REFERENCE!)
    const postsCopy = [...posts];
    const copyRefId = getArrayId(postsCopy);
    
    console.log("\n📌 Created Copy:");
    console.log("New array reference ID:", copyRefId);
    console.log("Copy (before sorting):", deepCopy(postsCopy));
    console.log("Same as original?", posts === postsCopy ? "❌ Yes (BAD)" : "✅ No (GOOD)");
    
    // Sort the copy
    console.log("\n🔄 Sorting the copy...");
    postsCopy.sort((a, b) => {
      const comparison = a[sort].localeCompare(b[sort]);
      console.log(`   Comparing "${a[sort]}" vs "${b[sort]}": ${comparison}`);
      return comparison;
    });
    
    const sortedCopy = deepCopy(postsCopy);
    
    console.log("\n📌 AFTER Sorting Copy:");
    console.log("Sorted copy:", sortedCopy);
    console.log("Sorted order:", sortedCopy.map(p => p.title).join(', '));
    
    console.log("\n📌 Original Array (unchanged):");
    console.log("Original array:", deepCopy(posts));
    console.log("Original order:", posts.map(p => p.title).join(', '));
    
    console.log("\n🔍 COMPARISON:");
    console.log("Different references?", posts !== postsCopy ? "✅ YES - Different array objects" : "❌ NO - Same array");
    console.log("React will update?", posts !== postsCopy ? "✅ YES (new reference)" : "❌ NO (same reference)");
    
    setSelectedSort(sort);
    setPosts(postsCopy); // ✅ Setting new array reference
    
    setLogs(prev => [...prev, {
      method: 'Copy Then Sort',
      before: originalPosts,
      after: sortedCopy,
      referenceSame: false,
      originalRefId: originalRefId,
      copyRefId: copyRefId
    }]);
  };

  // Original sort function with proper logging
  const sortPosts = (sort) => {
    console.clear();
    console.log("=== ORIGINAL SORT FUNCTION ===");
    
    const original = deepCopy(posts);
    const originalRef = getArrayId(posts);
    
    console.log("Current state:", original);
    console.log("Reference ID:", originalRef);
    
    setSelectedSort(sort);
    
    const newPosts = [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));
    const newRef = getArrayId(newPosts);
    
    console.log("\nNew array created:", deepCopy(newPosts));
    console.log("New reference ID:", newRef);
    console.log("References different?", posts !== newPosts);
    
    setPosts(newPosts);
  };

  // Other functions
  const createPost = (newPost) => {
    const oldRef = getArrayId(posts);
    const newPosts = [...posts, newPost];
    const newRef = getArrayId(newPosts);
    
    console.log("=== CREATE POST ===");
    console.log("Old reference:", oldRef);
    console.log("New reference:", newRef);
    console.log("New post added:", newPost);
    
    setPosts(newPosts);
  };
  
  const removePost = (post) => {
    const oldRef = getArrayId(posts);
    const newPosts = posts.filter(p => p.id !== post.id);
    const newRef = getArrayId(newPosts);
    
    console.log("=== REMOVE POST ===");
    console.log("Removing post:", post);
    console.log("Old reference:", oldRef);
    console.log("New reference:", newRef);
    
    setPosts(newPosts);
  };

  // Test console logging issue
  const testConsoleIssue = () => {
    console.clear();
    console.log("=== DEMONSTRATING CONSOLE REFERENCE ISSUE ===");
    
    const testArray = [
      { id: 1, title: 'Charlie' },
      { id: 2, title: 'Bravo' },
      { id: 3, title: 'Alpha' }
    ];
    
    console.log("\n1. Logging object REFERENCE (problematic):");
    console.log("testArray object:", testArray);
    
    console.log("\n2. Logging STRINGIFIED snapshot (correct):");
    console.log("Stringified:", JSON.stringify(testArray, null, 2));
    
    console.log("\n3. Now mutating array...");
    testArray.sort((a, b) => a.title.localeCompare(b.title));
    
    console.log("\n4. Look at first log now - it shows SORTED values!");
    console.log("Because console stored a reference, not a copy.");
    
    console.log("\n5. Second log still shows original order.");
    console.log("Because stringify created a snapshot at that moment.");
  };

  return (
    <div className="App" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#333' }}>Array Reference & Mutation Demo</h1>
      
      <div style={{ 
        margin: '20px 0', 
        padding: '15px', 
        border: '2px solid #1976d2',
        borderRadius: '8px',
        background: '#e3f2fd'
      }}>
        <h3 style={{ marginTop: 0, color: '#0d47a1' }}>Testing Controls</h3>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', flexWrap: 'wrap' }}>
          <button 
            style={{
              padding: '10px 15px',
              background: '#ffebee',
              border: '2px solid #d32f2f',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => sortPostsDirect('title')}
          >
            🔴 Sort Directly (Wrong)
          </button>
          
          <button 
            style={{
              padding: '10px 15px',
              background: '#e8f5e9',
              border: '2px solid #388e3c',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
            onClick={() => sortPostsCopy('title')}
          >
            ✅ Sort with Copy (Correct)
          </button>
          
          <button 
            style={{
              padding: '10px 15px',
              background: '#fff3e0',
              border: '2px solid #f57c00',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={testConsoleIssue}
          >
            🧪 Test Console Issue
          </button>
          
          <button 
            style={{
              padding: '10px 15px',
              background: '#f3e5f5',
              border: '2px solid #7b1fa2',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => {
              const newPost = { 
                id: Date.now(), 
                title: `Post ${posts.length + 1}`, 
                body: 'New body' 
              };
              createPost(newPost);
            }}
          >
            ➕ Add Test Post
          </button>
          
          <button 
            style={{
              padding: '10px 15px',
              background: '#e0f7fa',
              border: '2px solid #006064',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => {
              setPosts([
                { id: 1, title: 'cc', body: 'zz' },
                { id: 2, title: 'bb', body: 'yy' },
                { id: 3, title: 'aa', body: 'xx' }
              ]);
              setLogs([]);
              setSortMethod('');
              console.clear();
              console.log("🔄 Reset to initial state");
            }}
          >
            🔄 Reset All
          </button>
        </div>
        
        <div style={{ 
          background: '#fafafa', 
          padding: '15px', 
          borderRadius: '4px',
          border: '1px solid #ddd'
        }}>
          <h4 style={{ marginTop: 0 }}>
            Current Posts {sortMethod && `(Sorted with: ${sortMethod} method)`}
          </h4>
          <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
            Reference ID: {getArrayId(posts)} | Count: {posts.length}
          </div>
          {posts.map(post => (
            <div key={post.id} style={{ 
              padding: '10px', 
              margin: '5px 0', 
              border: '1px solid #bdbdbd',
              background: '#fff',
              borderRadius: '4px',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <div>
                <strong>ID: {post.id}</strong> | 
                Title: <span style={{ color: '#d81b60' }}>{post.title}</span> | 
                Body: {post.body}
              </div>
              <button 
                onClick={() => removePost(post)}
                style={{
                  padding: '3px 8px',
                  background: '#ffcdd2',
                  border: '1px solid #e57373',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ margin: '30px 0' }}>
        <h3 style={{ color: '#333', borderBottom: '2px solid #ccc', paddingBottom: '5px' }}>
          Reference Change Logs
        </h3>
        
        {logs.length === 0 ? (
          <div style={{ 
            padding: '20px', 
            textAlign: 'center', 
            background: '#f5f5f5',
            borderRadius: '4px',
            color: '#666'
          }}>
            Click sorting buttons above to see reference logs
          </div>
        ) : (
          logs.map((log, index) => (
            <div key={index} style={{ 
              marginBottom: '20px', 
              padding: '20px', 
              border: '3px solid',
              borderColor: log.referenceSame ? '#ef9a9a' : '#a5d6a7',
              background: log.referenceSame ? '#ffebee' : '#e8f5e9',
              borderRadius: '8px'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <h4 style={{ 
                  margin: 0, 
                  color: log.referenceSame ? '#c62828' : '#2e7d32'
                }}>
                  {log.method} - {log.referenceSame ? '❌ NO Reference Change' : '✅ NEW Reference'}
                </h4>
                <div style={{ 
                  padding: '5px 10px', 
                  background: log.referenceSame ? '#ffcdd2' : '#c8e6c9',
                  borderRadius: '4px',
                  fontWeight: 'bold'
                }}>
                  {log.referenceSame ? 'SAME Array Object' : 'DIFFERENT Array Object'}
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <h5 style={{ marginTop: 0, color: '#555' }}>BEFORE</h5>
                  <div style={{ 
                    padding: '10px', 
                    background: 'white', 
                    borderRadius: '4px',
                    minHeight: '100px'
                  }}>
                    {log.before.map(post => (
                      <div key={post.id} style={{ 
                        padding: '5px 0', 
                        borderBottom: '1px solid #eee' 
                      }}>
                        <strong>{post.title}</strong> (ID: {post.id})
                      </div>
                    ))}
                  </div>
                  {log.referenceId && (
                    <div style={{ marginTop: '8px', fontSize: '0.9em', color: '#666' }}>
                      Reference ID: <strong>{log.referenceId}</strong>
                    </div>
                  )}
                </div>
                
                <div>
                  <h5 style={{ marginTop: 0, color: '#555' }}>AFTER</h5>
                  <div style={{ 
                    padding: '10px', 
                    background: 'white', 
                    borderRadius: '4px',
                    minHeight: '100px'
                  }}>
                    {log.after.map(post => (
                      <div key={post.id} style={{ 
                        padding: '5px 0', 
                        borderBottom: '1px solid #eee' 
                      }}>
                        <strong>{post.title}</strong> (ID: {post.id})
                      </div>
                    ))}
                  </div>
                  {log.copyRefId && (
                    <div style={{ marginTop: '8px', fontSize: '0.9em', color: '#666' }}>
                      New Reference ID: <strong>{log.copyRefId}</strong>
                    </div>
                  )}
                </div>
              </div>
              
              <div style={{ 
                marginTop: '15px', 
                padding: '10px', 
                background: log.referenceSame ? '#fff3e0' : '#e1f5fe',
                borderRadius: '4px',
                borderLeft: '4px solid',
                borderLeftColor: log.referenceSame ? '#ff9800' : '#0288d1'
              }}>
                <strong>React Behavior:</strong> {
                  log.referenceSame 
                    ? 'Will likely NOT re-render (same array reference)'
                    : '✅ Will re-render (new array reference detected)'
                }
              </div>
            </div>
          )).reverse() // Show newest first
        )}
      </div>
      
      <div style={{ 
        marginTop: '40px', 
        padding: '15px', 
        background: '#fff8e1',
        border: '2px solid #ffb300',
        borderRadius: '8px'
      }}>
        <h4 style={{ marginTop: 0, color: '#5d4037' }}>Key Learning Points:</h4>
        <ul style={{ paddingLeft: '20px' }}>
          <li><strong>Array Reference</strong> = Memory address where array is stored</li>
          <li><code>[...posts]</code> creates a <strong>NEW reference</strong> (new memory location)</li>
          <li><code>posts.sort()</code> mutates the <strong>EXISTING reference</strong></li>
          <li>React detects changes by comparing <strong>references</strong>, not content</li>
          <li>Console logs show current state of objects, not snapshots</li>
          <li>Use <code>JSON.parse(JSON.stringify())</code> for debugging before/after states</li>
        </ul>
      </div>
    </div>
  );
}

export default App;