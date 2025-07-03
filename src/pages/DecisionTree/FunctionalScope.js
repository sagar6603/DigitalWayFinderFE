// import React, { useState, useEffect } from 'react';
// import './FunctionalScope.css';

// const FunctionalScope = () => {
//   const [functionalScopeData, setFunctionalScopeData] = useState([]);
//   const [selectedLevel, setSelectedLevel] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedItems, setSelectedItems] = useState([]);

//   // API call to fetch functional scope data
//   useEffect(() => {
//     const fetchFunctionalScopeData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await fetch('http://localhost:8080/api/decision-tree/functional-scope/wms/all');
        
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
        
//         const data = await response.json();
//         console.log('API Response:', data);
//         setFunctionalScopeData(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error('Error fetching functional scope data:', error);
//         setError(error.message);
//         // Fallback data for demo purposes matching the image
//         setFunctionalScopeData([
//           { id: '1.0', name: 'Demand & Revenue Planning', level: 1, description: 'Planning and forecasting for demand and revenue' },
//           { id: '2.0', name: 'Forecast Analytics', level: 1, description: 'Analytics and insights for forecasting' },
//           { id: '3.0', name: 'IBP Sales & Operations Execution (S&OE)', level: 1, description: 'Sales and operations execution processes' },
//           { id: '4.0', name: 'IBP Sales & Operations Planning (S&OP)', level: 1, description: 'Sales and operations planning processes' },
//           { id: '5.0', name: 'Operational Supply Planning', level: 1, description: 'Operational planning for supply chain' }
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFunctionalScopeData();
//   }, []);

//   // Filter data based on selected level and search query
//   const filteredData = functionalScopeData.filter(item => {
//     const matchesLevel = item.level === selectedLevel;
//     const matchesSearch = item.name ? 
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) :
//       item.title ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
//     return matchesLevel && matchesSearch;
//   });

//   const handleItemSelect = (item) => {
//     const itemId = item.id || item.functionalScopeId;
//     setSelectedItems(prev => {
//       if (prev.includes(itemId)) {
//         return prev.filter(id => id !== itemId);
//       } else {
//         return [...prev, itemId];
//       }
//     });
//     console.log('Selected item:', item);
//   };

//   const handleCheckboxChange = (item, e) => {
//     e.stopPropagation();
//     handleItemSelect(item);
//   };

//   const handleInfoClick = (item, e) => {
//     e.stopPropagation();
//     console.log('Info clicked for:', item);
//   };

//   return (
//     <div className="functional-scope-container">
//       {/* Breadcrumb */}
//       <div className="breadcrumb-section">
//         <div className="breadcrumb-nav">
//           <nav>
//             <a href="#">Home</a>
//             <span className="breadcrumb-separator">›</span>
//             <a href="#">Decision Tree</a>
//             <span className="breadcrumb-separator">›</span>
//             <span className="breadcrumb-current">Functional Scope</span>
//           </nav>
//         </div>
//       </div>

//       <div className="main-layout">
//         {/* Left Sidebar */}
//         <div className="sidebar">
//           <div className="sidebar-card">
//             <h2 className="sidebar-title">Functional Scope</h2>
//             <p className="sidebar-description">
//               Structured framework for selecting functional requirements, 
//               prioritising them based on different measures for informed decision-making.
//             </p>
            
//             {/* Step indicators */}
//             <div className="step-indicators">
//               <div className="step-item">
//                 <div className="step-number active">1</div>
//                 <span className="step-label active">Functional Scope</span>
//               </div>
//               <div className="step-item">
//                 <div className="step-number inactive">2</div>
//                 <span className="step-label inactive">Decision Criteria</span>
//               </div>
//               <div className="step-item">
//                 <div className="step-number inactive">3</div>
//                 <span className="step-label inactive">Solution</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="main-content">
//           <div className="content-card">
//             {/* Header */}
//             <div className="content-header">
//               <div className="header-top">
//                 <h1 className="header-title">Functional Scope</h1>
                
//                 <div className="header-actions">
//                   {/* Search */}
//                   <div className="search-container">
//                     <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                     <input
//                       type="text"
//                       placeholder="Search"
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                       className="search-input"
//                     />
//                   </div>
                  
//                   {/* Select Parameters Button */}
//                   <button className="select-parameters-btn">
//                     Select Parameters
//                   </button>
//                 </div>
//               </div>

//               {/* Level Selector */}
//               <div className="level-selector">
//                 <span className="level-selector-label">Select Level View</span>
//                 <div className="level-buttons">
//                   {[1, 2, 3, 4, 5].map((level) => (
//                     <button
//                       key={level}
//                       onClick={() => setSelectedLevel(level)}
//                       className={`level-button ${selectedLevel === level ? 'active' : 'inactive'}`}
//                     >
//                       {level}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="content-body">
//               <h3 className="level-process-title">
//                 LEVEL {selectedLevel} PROCESS
//               </h3>

//               {loading ? (
//                 <div className="loading-container">
//                   {[1, 2, 3, 4, 5].map((i) => (
//                     <div key={i} className="loading-item">
//                       <div className="loading-card">
//                         <div className="loading-checkbox"></div>
//                         <div className="loading-content">
//                           <div className="loading-text"></div>
//                         </div>
//                         <div className="loading-icon"></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : error ? (
//                 <div className="error-container">
//                   <div className="error-title">Error loading data</div>
//                   <div className="error-message">{error}</div>
//                 </div>
//               ) : filteredData.length === 0 ? (
//                 <div className="empty-container">
//                   {functionalScopeData.length === 0 
//                     ? 'No data available for this level.' 
//                     : 'No items found matching your search.'}
//                 </div>
//               ) : (
//                 <div className="items-list">
//                   {filteredData.map((item) => {
//                     const itemId = item.id || item.functionalScopeId;
//                     const isSelected = selectedItems.includes(itemId);
                    
//                     return (
//                       <div
//                         key={itemId}
//                         onClick={() => handleItemSelect(item)}
//                         className="item-card"
//                       >
//                         <input
//                           type="checkbox"
//                           checked={isSelected}
//                           className="item-checkbox"
//                           onChange={(e) => handleCheckboxChange(item, e)}
//                         />
//                         <div className="item-content">
//                           <div className="item-title">
//                             {item.id} {item.name || item.title || 'Unnamed Item'}
//                           </div>
//                           {item.description && (
//                             <div className="item-description">
//                               {item.description}
//                             </div>
//                           )}
//                         </div>
//                         <button
//                           onClick={(e) => handleInfoClick(item, e)}
//                           className="info-button"
//                           title="More information"
//                         >
//                           <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                         </button>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="content-footer">
//               <div className="selection-count">
//                 {selectedItems.length > 0 && (
//                   <span>{selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected</span>
//                 )}
//               </div>
//               <button 
//                 className="save-proceed-btn"
//                 disabled={selectedItems.length === 0}
//                 onClick={() => {
//                   console.log('Proceeding with selected items:', selectedItems);
//                 }}
//               >
//                 Save & Proceed
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FunctionalScope;

// import React, { useState, useEffect } from 'react';
// import './FunctionalScope.css';

// const FunctionalScope = () => {
//   const [functionalScopeData, setFunctionalScopeData] = useState([]);
//   const [selectedLevel, setSelectedLevel] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedItems, setSelectedItems] = useState([]);

//   // API call to fetch functional scope data
//   useEffect(() => {
//     const fetchFunctionalScopeData = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const response = await fetch('http://localhost:8080/api/decision-tree/functional-scope/wms/all');
        
//         if (!response.ok) {
//           throw new Error(`HTTP erro status: ${response.status}`);
//         }
        
//         const data = await response.json();
//         console.log('API Response:', data);
//         setFunctionalScopeData(Array.isArray(data) ? data : []);
//       } catch (error) {
//         console.error('Error fetching functional scope data:', error);
//         setError(error.message);
//         setFunctionalScopeData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFunctionalScopeData();
//   }, []);

//   // Filter data based on selected level and search query
//   const filteredData = functionalScopeData.filter(item => {
//     // const matchesLevel = item.level === selectedLevel;
//     const matchesLevel = item.level === selectedLevel || item.level === selectedLevel.toString();
//     const matchesSearch = item.name ? 
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) :
//       item.title ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
//     return matchesLevel && matchesSearch;
//   });

//   const handleItemSelect = (item) => {
//     const itemId = item.id || item.functionalScopeId;
//     setSelectedItems(prev => {
//       if (prev.includes(itemId)) {
//         return prev.filter(id => id !== itemId);
//       } else {
//         return [...prev, itemId];
//       }
//     });
//     console.log('Selected item:', item);
//   };

//   const handleCheckboxChange = (item, e) => {
//     e.stopPropagation();
//     handleItemSelect(item);
//   };

//   const handleInfoClick = (item, e) => {
//     e.stopPropagation();
//     console.log('Info clicked for:', item);
//   };

//   return (
//     <div className="functional-scope-container">
//       {/* Breadcrumb */}
//       <div className="breadcrumb-section">
//         <div className="breadcrumb-nav">
//           <nav>
//             <a href="#">Home</a>
//             <span className="breadcrumb-separator">›</span>
//             <a href="#">Decision Tree</a>
//             <span className="breadcrumb-separator">›</span>
//             <span className="breadcrumb-current">Functional Scope</span>
//           </nav>
//         </div>
//       </div>

//       <div className="main-layout">
//         {/* Left Sidebar */}
//         <div className="sidebar">
//           <div className="sidebar-card">
//             <h2 className="sidebar-title">Functional Scope</h2>
//             <p className="sidebar-description">
//               Structured framework for selecting functional requirements, 
//               prioritising them based on different measures for informed decision-making.
//             </p>
            
//             {/* Step indicators */}
//             <div className="step-indicators">
//               <div className="step-item">
//                 <div className="step-number active">1</div>
//                 <span className="step-label active">Functional Scope</span>
//               </div>
//               <div className="step-item">
//                 <div className="step-number inactive">2</div>
//                 <span className="step-label inactive">Decision Criteria</span>
//               </div>
//               <div className="step-item">
//                 <div className="step-number inactive">3</div>
//                 <span className="step-label inactive">Solution</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="main-content">
//           <div className="content-card">
//             {/* Top Actions - Search and Select Parameters */}
//             <div className="top-actions">
//               <div className="search-container">
//                 <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="search-input"
//                 />
//               </div>
              
//               <button className="select-parameters-btn">
//                 Select Parameters
//               </button>
//             </div>

//             {/* Header */}
//             <div className="content-header">
//               <h1 className="header-title">Functional Scope</h1>
              
//               {/* Level Selector */}
//               <div className="level-selector">
//                 <span className="level-selector-label">Select Level View</span>
//                 <div className="level-buttons">
//                   {[1, 2, 3, 4, 5].map((level) => (
//                     <button
//                       key={level}
//                       onClick={() => setSelectedLevel(level)}
//                       className={`level-button ${selectedLevel === level ? 'active' : 'inactive'}`}
//                     >
//                       {level}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="content-body">
//               <h3 className="level-process-title">
//                 LEVEL {selectedLevel} PROCESS
//               </h3>

//               {loading ? (
//                 <div className="loading-container">
//                   {[1, 2, 3, 4, 5].map((i) => (
//                     <div key={i} className="loading-item">
//                       <div className="loading-card">
//                         <div className="loading-checkbox"></div>
//                         <div className="loading-content">
//                           <div className="loading-text"></div>
//                         </div>
//                         <div className="loading-icon"></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : error ? (
//                 <div className="error-container">
//                   <div className="error-title">Error loading data</div>
//                   <div className="error-message">Failed to load data: {error}</div>
//                 </div>
//               ) : filteredData.length === 0 ? (
//                 <div className="empty-container">
//                   {functionalScopeData.length === 0 
//                     ? 'No data available for this level.' 
//                     : 'No items found matching your search.'}
//                 </div>
//               ) : (
//                 <div className="items-list">
//                   {filteredData.map((item) => {
//                     const itemId = item.id || item.functionalScopeId;
//                     const isSelected = selectedItems.includes(itemId);
                    
//                     return (
//                       <div
//                         key={itemId}
//                         onClick={() => handleItemSelect(item)}
//                         className="item-card"
//                       >
//                         <input
//                           type="checkbox"
//                           checked={isSelected}
//                           className="item-checkbox"
//                           onChange={(e) => handleCheckboxChange(item, e)}
//                         />
//                         <div className="item-content">
//                           <div className="item-title">
//                             {item.id} {item.name || item.title || 'Unnamed Item'}
//                           </div>
//                           {item.description && (
//                             <div className="item-description">
//                               {item.description}
//                             </div>
//                           )}
//                         </div>
//                         <button
//                           onClick={(e) => handleInfoClick(item, e)}
//                           className="info-button"
//                           title="More information"
//                         >
//                           <svg className="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                         </button>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="content-footer">
//               <div className="selection-count">
//                 {selectedItems.length > 0 && (
//                   <span>{selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected</span>
//                 )}
//               </div>
//               <button 
//                 className="save-proceed-btn"
//                 disabled={selectedItems.length === 0}
//                 onClick={() => {
//                   console.log('Proceeding with selected items:', selectedItems);
//                 }}
//               >
//                 Save & Proceed
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FunctionalScope;

import React, { useState, useEffect } from 'react';

const FunctionalScope = () => {
  const [functionalScopeData, setFunctionalScopeData] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  // API call to fetch functional scope data
  useEffect(() => {
    const fetchFunctionalScopeData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:8080/api/decision-tree/functional-scope/wms/all');
        
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        // Transform and process the API data
        const processedData = processApiData(data);
        setFunctionalScopeData(processedData);
      } catch (error) {
        console.error('Error fetching functional scope data:', error);
        setError(error.message);
        setFunctionalScopeData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFunctionalScopeData();
  }, []);

  // Process API data to create hierarchical structure with level information
  const processApiData = (apiData) => {
    const processedItems = [];
    
    if (!Array.isArray(apiData)) {
      return processedItems;
    }

    apiData.forEach((item, index) => {
      const { l1, l2, l3, l4, l5 } = item;
      
      // Create level 1 items
      if (l1) {
        const l1Item = {
          id: `l1-${index}`,
          functionalScopeId: `l1-${index}`,
          name: l1,
          level: 1,
          description: `Level 1: ${l1}`
        };
        
        // Only add if not already exists
        if (!processedItems.find(existing => existing.level === 1 && existing.name === l1)) {
          processedItems.push(l1Item);
        }
      }

      // Create level 2 items
      if (l2) {
        const l2Item = {
          id: `l2-${index}`,
          functionalScopeId: `l2-${index}`,
          name: l2,
          level: 2,
          parent: l1,
          description: `Level 2: ${l2}`
        };
        
        if (!processedItems.find(existing => existing.level === 2 && existing.name === l2)) {
          processedItems.push(l2Item);
        }
      }

      // Create level 3 items
      if (l3) {
        const l3Item = {
          id: `l3-${index}`,
          functionalScopeId: `l3-${index}`,
          name: l3,
          level: 3,
          parent: l2,
          description: `Level 3: ${l3}`
        };
        
        if (!processedItems.find(existing => existing.level === 3 && existing.name === l3)) {
          processedItems.push(l3Item);
        }
      }

      // Create level 4 items
      if (l4) {
        const l4Item = {
          id: `l4-${index}`,
          functionalScopeId: `l4-${index}`,
          name: l4,
          level: 4,
          parent: l3,
          description: `Level 4: ${l4}`
        };
        
        processedItems.push(l4Item);
      }

      // Create level 5 items if they exist
      if (l5) {
        const l5Item = {
          id: `l5-${index}`,
          functionalScopeId: `l5-${index}`,
          name: l5,
          level: 5,
          parent: l4,
          description: `Level 5: ${l5}`
        };
        
        processedItems.push(l5Item);
      }
    });

    return processedItems;
  };

  // Filter data based on selected level and search query
  const filteredData = functionalScopeData.filter(item => {
    const matchesLevel = item.level === selectedLevel || item.level === selectedLevel.toString();
    const matchesSearch = item.name ? 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) :
      item.title ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesLevel && matchesSearch;
  });

  const handleItemSelect = (item) => {
    const itemId = item.id || item.functionalScopeId;
    setSelectedItems(prev => {
      if (prev.includes(itemId)) {
        return prev.filter(id => id !== itemId);
      } else {
        return [...prev, itemId];
      }
    });
    console.log('Selected item:', item);
  };

  const handleCheckboxChange = (item, e) => {
    e.stopPropagation();
    handleItemSelect(item);
  };

  const handleInfoClick = (item, e) => {
    e.stopPropagation();
    console.log('Info clicked for:', item);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 24px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#7c3aed',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                ▶
              </div>
              <span style={{ fontSize: '20px', fontWeight: '600' }}>Digital Wayfinder</span>
            </div>
            <nav style={{ display: 'flex', gap: '24px', marginLeft: '32px' }}>
              <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>Home</a>
              <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>Digital Wayfinder</a>
              <a href="#" style={{ 
                color: '#7c3aed', 
                textDecoration: 'none',
                borderBottom: '2px solid #7c3aed',
                paddingBottom: '4px'
              }}>Decision Tree</a>
              <a href="#" style={{ color: '#6b7280', textDecoration: 'none' }}>Report</a>
            </nav>
          </div>
          <button style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer'
          }}>
            Select Parameters
          </button>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{
        padding: '12px 24px',
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <span>Home</span>
          <span>›</span>
          <span>Decision Tree</span>
          <span>›</span>
          <span style={{ color: '#111827' }}>Functional Scope</span>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={{
          width: '320px',
          backgroundColor: 'white',
          borderRight: '1px solid #e5e7eb',
          minHeight: 'calc(100vh - 120px)',
          padding: '24px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '8px'
          }}>Functional Scope</h2>
          <p style={{
            fontSize: '14px',
            color: '#6b7280',
            marginBottom: '24px',
            lineHeight: '1.5'
          }}>
            Structured framework for selecting functional requirements,
            prioritising them based on different measures for informed decision-making.
          </p>
          
          {/* Step indicators */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#7c3aed',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                1
              </div>
              <span style={{ color: '#7c3aed', fontWeight: '500' }}>Functional Scope</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#d1d5db',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                2
              </div>
              <span style={{ color: '#9ca3af' }}>Decision Criteria</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#d1d5db',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                3
              </div>
              <span style={{ color: '#9ca3af' }}>Solution</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '24px' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <h1 style={{ fontSize: '24px', fontWeight: '600', margin: 0 }}>Functional Scope</h1>
                
                {/* Level Selector */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Select Level View</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedLevel(level)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '4px',
                          border: 'none',
                          cursor: 'pointer',
                          backgroundColor: selectedLevel === level ? '#2563eb' : '#f3f4f6',
                          color: selectedLevel === level ? 'white' : '#6b7280'
                        }}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Search */}
              <div style={{ position: 'relative' }}>
                <svg
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '16px',
                    height: '16px',
                    color: '#9ca3af'
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    paddingLeft: '40px',
                    paddingRight: '16px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '24px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '500',
                color: '#111827',
                marginBottom: '16px'
              }}>
                LEVEL {selectedLevel} PROCESS
              </h3>

              {loading ? (
                <div style={{ padding: '40px 0', textAlign: 'center' }}>
                  <div style={{ 
                    display: 'inline-block',
                    width: '32px',
                    height: '32px',
                    border: '3px solid #e5e7eb',
                    borderTop: '3px solid #7c3aed',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}></div>
                  <p style={{ marginTop: '16px', color: '#6b7280' }}>Loading functional scope data...</p>
                  <style>{`
                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                  `}</style>
                </div>
              ) : error ? (
                <div style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  padding: '16px'
                }}>
                  <div style={{ color: '#dc2626', fontWeight: '500' }}>Error loading data</div>
                  <div style={{ color: '#dc2626', fontSize: '14px', marginTop: '4px' }}>
                    Failed to load data: {error}
                  </div>
                </div>
              ) : filteredData.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 0',
                  color: '#6b7280'
                }}>
                  {functionalScopeData.length === 0 
                    ? 'No data available for this level.' 
                    : 'No items found matching your search.'}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {filteredData.map((item) => {
                    const itemId = item.id || item.functionalScopeId;
                    const isSelected = selectedItems.includes(itemId);
                    
                    return (
                      <div
                        key={itemId}
                        onClick={() => handleItemSelect(item)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '16px',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          backgroundColor: isSelected ? '#f0f9ff' : 'white'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => handleCheckboxChange(item, e)}
                            style={{
                              width: '16px',
                              height: '16px',
                              accentColor: '#7c3aed'
                            }}
                          />
                          <div>
                            <div style={{ 
                              fontWeight: '500',
                              color: '#111827',
                              fontSize: '14px'
                            }}>
                              {item.id} {item.name || item.title || 'Unnamed Item'}
                            </div>
                            {item.description && (
                              <div style={{
                                fontSize: '12px',
                                color: '#6b7280',
                                marginTop: '4px'
                              }}>
                                {item.description}
                              </div>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={(e) => handleInfoClick(item, e)}
                          style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '4px',
                            color: '#9ca3af'
                          }}
                          title="More information"
                        >
                          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTop: '1px solid #e5e7eb',
        padding: '16px 24px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ color: '#6b7280', fontSize: '14px' }}>
            {selectedItems.length > 0 && (
              <span>{selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected</span>
            )}
          </div>
          <button 
            style={{
              backgroundColor: selectedItems.length === 0 ? '#d1d5db' : '#7c3aed',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: selectedItems.length === 0 ? 'not-allowed' : 'pointer'
            }}
            disabled={selectedItems.length === 0}
            onClick={() => {
              console.log('Proceeding with selected items:', selectedItems);
            }}
          >
            Save & Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default FunctionalScope;