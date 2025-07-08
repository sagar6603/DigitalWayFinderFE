// import React, { useState, useEffect } from 'react';

// const FunctionalScope = () => {
//   const [functionalScopeData, setFunctionalScopeData] = useState([]);
//   const [selectedPath, setSelectedPath] = useState({}); // Will store arrays for each level
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectedLevel, setSelectedLevel] = useState(2);

//   // Mock API data - Level 1 shows Finance & Accounting Operations as the main option
//   const mockApiData = [
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Aggregate & Disaggregate",
//       "l3": "Aggregate and Disaggregate",
//       "l4": "Aggregate Consensus Forecasting"
//     },
//     {
//       "l1": "Finance & Accounting Operations", 
//       "l2": "Aggregate & Disaggregate",
//       "l3": "Aggregate Consensus Forecasting", 
//       "l4": "Aggregate demand data from multiple sources"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Aggregate & Disaggregate", 
//       "l3": "Aggregate demand data from multiple sources",
//       "l4": "Release Of Disaggregated Forecast"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Control Products Gross to Net",
//       "l3": "Plan & Review All Sales Deductions", 
//       "l4": "Plan & Review Gross Sales"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Control Products Gross to Net",
//       "l3": "Plan & Review Gross Sales",
//       "l4": "Plan Commercial Provisions"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Control Products Gross to Net",
//       "l3": "Plan Commercial Provisions",
//       "l4": "Review & Approve Gross Sales"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Control Products Gross to Net", 
//       "l3": "Review & Approve Gross Sales",
//       "l4": "Review & Approve Gross Sales data"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Enrich Forecast",
//       "l3": "Conduct Post Promotion Analysis",
//       "l4": "Document Forecast Assumptions"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Enrich Forecast",
//       "l3": "Document Forecast Assumptions", 
//       "l4": "Document Forecast Assumptions data"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Enrich Forecast",
//       "l3": "Document Forecast Assumptions",
//       "l4": "Enrich Demand Forecast"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Enrich Forecast",
//       "l3": "Enrich Demand Forecast",
//       "l4": "Enrich Demand Forecast data"
//     },
//     // Adding more mock data for better demonstration
//     {
//       "l1": "Human Resources Operations",
//       "l2": "Talent Management",
//       "l3": "Recruitment & Selection",
//       "l4": "Job Posting & Advertising"
//     },
//     {
//       "l1": "Human Resources Operations",
//       "l2": "Talent Management",
//       "l3": "Performance Management",
//       "l4": "Performance Reviews"
//     },
//     {
//       "l1": "Human Resources Operations",
//       "l2": "Employee Relations",
//       "l3": "Conflict Resolution",
//       "l4": "Mediation Services"
//     },
//     {
//       "l1": "IT Operations",
//       "l2": "Infrastructure Management",
//       "l3": "Server Management",
//       "l4": "Server Monitoring"
//     },
//     {
//       "l1": "IT Operations",
//       "l2": "Security Management",
//       "l3": "Access Control",
//       "l4": "User Authentication"
//     }
//   ];

//   useEffect(() => {
//     setFunctionalScopeData(mockApiData);
//   }, []);

//   // Get unique items for a specific level based on selected path
//   const getLevelItems = (level) => {
//     if (!functionalScopeData || functionalScopeData.length === 0) return [];
    
//     let filteredData = functionalScopeData;
    
//     // Filter based on selected path up to the previous level
//     for (let i = 1; i < level; i++) {
//       const levelKey = `l${i}`;
//       const selectedForLevel = selectedPath[levelKey];
      
//       if (selectedForLevel && selectedForLevel.length > 0) {
//         filteredData = filteredData.filter(item => 
//           selectedForLevel.includes(item[levelKey])
//         );
//       }
//     }
    
//     // Get unique items for current level
//     const levelKey = `l${level}`;
//     const uniqueItems = [];
//     const seen = new Set();
    
//     filteredData.forEach((item, index) => {
//       const value = item[levelKey];
//       if (value && !seen.has(value)) {
//         seen.add(value);
//         uniqueItems.push({
//           id: `${levelKey}-${value.replace(/\s+/g, '-')}`,
//           name: value,
//           level: level,
//           fullItem: item
//         });
//       }
//     });
    
//     return uniqueItems;
//   };

//   const handleItemSelect = (item, level) => {
//     const levelKey = `l${level}`;
//     const newSelectedPath = { ...selectedPath };
    
//     // Initialize array for this level if it doesn't exist
//     if (!newSelectedPath[levelKey]) {
//       newSelectedPath[levelKey] = [];
//     }
    
//     // Toggle selection for this item
//     const currentSelections = [...newSelectedPath[levelKey]];
//     const itemIndex = currentSelections.indexOf(item.name);
    
//     if (itemIndex > -1) {
//       // Remove if already selected
//       currentSelections.splice(itemIndex, 1);
//     } else {
//       // Add if not selected
//       currentSelections.push(item.name);
//     }
    
//     newSelectedPath[levelKey] = currentSelections;
    
//     // Clear deeper levels when selections change
//     for (let i = level + 1; i <= 5; i++) {
//       delete newSelectedPath[`l${i}`];
//     }
    
//     setSelectedPath(newSelectedPath);
    
//     // Also update the selectedItems for checkboxes
//     const itemId = item.id;
//     setSelectedItems(prev => {
//       if (itemIndex > -1) {
//         // Remove if already selected
//         return prev.filter(id => id !== itemId);
//       } else {
//         // Add if not selected
//         return [...prev, itemId];
//       }
//     });
//   };

//   const handleCheckboxChange = (item, level, e) => {
//     e.stopPropagation();
//     handleItemSelect(item, level);
//   };

//   const handleInfoClick = (item, e) => {
//     e.stopPropagation();
//     console.log('Info clicked for:', item);
//   };

//   const renderLevelColumn = (level) => {
//     const levelItems = getLevelItems(level);
//     const levelKey = `l${level}`;
//     const isLevelActive = level === 1 || (selectedPath[`l${level - 1}`] && selectedPath[`l${level - 1}`].length > 0);
    
//     return (
//       <div
//         key={level}
//         style={{
//           flex: '1',
//           minWidth: '280px',
//           maxWidth: '300px',
//           backgroundColor: 'white',
//           border: '1px solid #e5e7eb',
//           borderRadius: '8px',
//           overflow: 'hidden',
//           opacity: isLevelActive ? 1 : 0.3,
//           transition: 'opacity 0.2s'
//         }}
//       >
//         {/* Level Header */}
//         <div style={{
//           backgroundColor: '#f8fafc',
//           padding: '12px 16px',
//           borderBottom: '1px solid #e5e7eb'
//         }}>
//           <h3 style={{
//             fontSize: '14px',
//             fontWeight: '600',
//             color: '#374151',
//             margin: 0,
//             textAlign: 'center'
//           }}>
//             LEVEL {level} PROCESS
//           </h3>
//           {/* Show selection count */}
//           {selectedPath[levelKey] && selectedPath[levelKey].length > 0 && (
//             <div style={{
//               textAlign: 'center',
//               fontSize: '12px',
//               color: '#7c3aed',
//               marginTop: '4px'
//             }}>
//               {selectedPath[levelKey].length} selected
//             </div>
//           )}
//         </div>

//         {/* Level Content */}
//         <div style={{
//           padding: '16px',
//           maxHeight: '500px',
//           overflowY: 'auto'
//         }}>
//           {!isLevelActive ? (
//             <div style={{
//               textAlign: 'center',
//               padding: '40px 0',
//               color: '#9ca3af',
//               fontSize: '14px'
//             }}>
//               Select from Level {level - 1} to view options
//             </div>
//           ) : loading ? (
//             <div style={{ padding: '40px 0', textAlign: 'center' }}>
//               <div style={{
//                 display: 'inline-block',
//                 width: '24px',
//                 height: '24px',
//                 border: '2px solid #e5e7eb',
//                 borderTop: '2px solid #7c3aed',
//                 borderRadius: '50%',
//                 animation: 'spin 1s linear infinite'
//               }}></div>
//               <p style={{ marginTop: '8px', color: '#6b7280', fontSize: '12px' }}>Loading...</p>
//             </div>
//           ) : error ? (
//             <div style={{
//               backgroundColor: '#fef2f2',
//               border: '1px solid #fecaca',
//               borderRadius: '4px',
//               padding: '12px',
//               fontSize: '12px'
//             }}>
//               <div style={{ color: '#dc2626', fontWeight: '500' }}>Error</div>
//               <div style={{ color: '#dc2626', marginTop: '4px' }}>
//                 {error}
//               </div>
//             </div>
//           ) : levelItems.length === 0 ? (
//             <div style={{
//               textAlign: 'center',
//               padding: '40px 0',
//               color: '#6b7280',
//               fontSize: '14px'
//             }}>
//               No items available
//             </div>
//           ) : (
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//               {levelItems.map((item) => {
//                 const isSelected = selectedItems.includes(item.id);
//                 const isPathSelected = selectedPath[levelKey] && selectedPath[levelKey].includes(item.name);
                
//                 return (
//                   <div
//                     key={item.id}
//                     style={{
//                       display: 'flex',
//                       alignItems: 'flex-start',
//                       justifyContent: 'space-between',
//                       padding: '10px 12px',
//                       border: isPathSelected ? '2px solid #7c3aed' : '1px solid #e5e7eb',
//                       borderRadius: '6px',
//                       backgroundColor: isSelected ? '#f0f9ff' : isPathSelected ? '#faf5ff' : 'white',
//                       transition: 'all 0.2s'
//                     }}
//                   >
//                     <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flex: 1 }}>
//                       <input
//                         type="checkbox"
//                         checked={isSelected}
//                         onChange={(e) => handleCheckboxChange(item, level, e)}
//                         style={{
//                           width: '14px',
//                           height: '14px',
//                           accentColor: '#7c3aed',
//                           marginTop: '2px',
//                           flexShrink: 0,
//                           cursor: 'pointer'
//                         }}
//                       />
//                       <div style={{ flex: 1 }}>
//                         <div style={{
//                           fontWeight: isPathSelected ? '600' : '500',
//                           color: isPathSelected ? '#7c3aed' : '#111827',
//                           fontSize: '13px',
//                           lineHeight: '1.4',
//                           wordBreak: 'break-word'
//                         }}>
//                           {level}.{levelItems.indexOf(item) + 1} {item.name}
//                           {isPathSelected && (
//                             <span style={{
//                               marginLeft: '8px',
//                               fontSize: '11px',
//                               backgroundColor: '#7c3aed',
//                               color: 'white',
//                               padding: '2px 6px',
//                               borderRadius: '12px'
//                             }}>
//                               Selected
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <button
//                       onClick={(e) => handleInfoClick(item, e)}
//                       style={{
//                         backgroundColor: 'transparent',
//                         border: 'none',
//                         cursor: 'pointer',
//                         padding: '2px',
//                         borderRadius: '2px',
//                         color: '#9ca3af',
//                         flexShrink: 0,
//                         marginLeft: '8px'
//                       }}
//                       title="More information"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={1.5}
//                         stroke="currentColor"
//                         style={{
//                           width: '16px',
//                           height: '16px',
//                           color: '#6b7280',
//                           pointerEvents: 'none'
//                         }}
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2.25M12 15h.01m-.01-10.5a9 9 0 100 18 9 9 0 000-18z" />
//                       </svg>
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       backgroundColor: '#f8fafc',
//       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
//     }}>
//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
      
//       {/* Breadcrumb */}
//       <div style={{
//         padding: '12px 24px',
//         backgroundColor: 'white',
//         borderBottom: '1px solid #e5e7eb'
//       }}>
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '8px',
//           fontSize: '14px',
//           color: '#6b7280'
//         }}>
//           <span>Home</span>
//           <span>›</span>
//           <span>Decision Tree</span>
//           <span>›</span>
//           <span style={{ color: '#111827' }}>Functional Scope</span>
//         </div>
//       </div>

//       <div style={{ 
//         display: 'flex',
//         padding: '24px',
//         gap: '24px',
//         minHeight: 'calc(100vh - 120px)'
//       }}>
//         {/* Left Sidebar Box */}
//         <div style={{
//           width: '280px',
//           backgroundColor: 'white',
//           border: '1px solid #e5e7eb',
//           borderRadius: '8px',
//           padding: '24px',
//           height: 'fit-content',
//           boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
//         }}>
//           <h2 style={{
//             fontSize: '20px',
//             fontWeight: '600',
//             marginBottom: '8px',
//             color: '#111827'
//           }}>Functional Scope</h2>
//           <p style={{
//             fontSize: '14px',
//             color: '#6b7280',
//             marginBottom: '24px',
//             lineHeight: '1.5'
//           }}>
//             Structured framework for selecting functional requirements,
//             prioritising them based on different measures for informed decision-making.
//           </p>
          

          
//           {/* Step indicators */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//               <div style={{
//                 width: '24px',
//                 height: '24px',
//                 backgroundColor: '#7c3aed',
//                 borderRadius: '50%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 color: 'white',
//                 fontSize: '12px',
//                 fontWeight: '600'
//               }}>
//                 1
//               </div>
//               <span style={{ color: '#7c3aed', fontWeight: '500', fontSize: '14px' }}>Functional Scope</span>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//               <div style={{
//                 width: '24px',
//                 height: '24px',
//                 backgroundColor: '#d1d5db',
//                 borderRadius: '50%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 color: 'white',
//                 fontSize: '12px',
//                 fontWeight: '600'
//               }}>
//                 2
//               </div>
//               <span style={{ color: '#9ca3af', fontSize: '14px' }}>Decision Criteria</span>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//               <div style={{
//                 width: '24px',
//                 height: '24px',
//                 backgroundColor: '#d1d5db',
//                 borderRadius: '50%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 color: 'white',
//                 fontSize: '12px',
//                 fontWeight: '600'
//               }}>
//                 3
//               </div>
//               <span style={{ color: '#9ca3af', fontSize: '14px' }}>Solution</span>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Box */}
//         <div style={{
//           flex: 1,
//           backgroundColor: 'white',
//           border: '1px solid #e5e7eb',
//           borderRadius: '8px',
//           boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
//           overflow: 'hidden'
//         }}>
//           {/* Header with search, parameters and level view selector */}
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             padding: '20px 24px',
//             borderBottom: '1px solid #e5e7eb',
//             backgroundColor: '#f9fafb',
//             flexWrap: 'wrap',
//             gap: '16px'
//           }}>
//             {/* Title */}
//             <h1 style={{
//               fontSize: '20px',
//               fontWeight: '600',
//               color: '#111827',
//               margin: 0
//             }}>
//               Functional Scope
//             </h1>

//             {/* Right side controls */}
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '16px',
//               flexWrap: 'wrap'
//             }}>
//               {/* Search */}
//               <div style={{ position: 'relative' }}>
//                 <svg
//                   style={{
//                     position: 'absolute',
//                     left: '12px',
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     width: '16px',
//                     height: '16px',
//                     color: '#9ca3af'
//                   }}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   style={{
//                     width: '200px',
//                     paddingLeft: '36px',
//                     paddingRight: '12px',
//                     paddingTop: '8px',
//                     paddingBottom: '8px',
//                     border: '1px solid #d1d5db',
//                     borderRadius: '8px',
//                     fontSize: '14px',
//                     backgroundColor: 'white'
//                   }}
//                 />
//               </div>

//               {/* Select Parameters button */}
//               <button
//                 style={{
//                   backgroundColor: '#8b5cf6',
//                   color: 'white',
//                   padding: '8px 16px',
//                   borderRadius: '20px',
//                   border: 'none',
//                   cursor: 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '500',
//                   whiteSpace: 'nowrap'
//                 }}
//                 onClick={() => {
//                   console.log('Select Parameters clicked');
//                 }}
//               >
//                 Select Parameters
//               </button>

//               {/* Select Level View */}
//               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
//                 <span style={{ fontSize: '14px', color: '#4B5563' }}>Select Level View</span>

//                 {/* Progress Bar */}
//                 <div style={{
//                   position: 'relative',
//                   width: '150px',
//                   height: '6px',
//                   backgroundColor: '#E5E7EB',
//                   borderRadius: '3px'
//                 }}>
//                   <div style={{
//                     width: `${(selectedLevel - 1) / 4 * 100}%`,
//                     height: '6px',
//                     backgroundColor: '#2563eb',
//                     borderRadius: '3px',
//                     transition: 'width 0.3s'
//                   }} />
//                 </div>

//                 {/* Numbers */}
//                 <div style={{ display: 'flex', justifyContent: 'space-between', width: '150px' }}>
//                   {[1, 2, 3, 4, 5].map((level) => (
//                     <button
//                       key={level}
//                       onClick={() => setSelectedLevel(level)}
//                       style={{
//                         border: 'none',
//                         background: 'none',
//                         cursor: 'pointer',
//                         fontSize: '14px',
//                         fontWeight: selectedLevel === level ? '600' : '400',
//                         color: selectedLevel === level ? '#2563eb' : '#111827'
//                       }}
//                     >
//                       {level}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Multi-column layout */}
//           <div style={{
//             display: 'flex',
//             gap: '16px',
//             overflowX: 'auto',
//             padding: '24px',
//             paddingBottom: '80px'
//           }}>
//             {[1, 2, 3].map(level => renderLevelColumn(level))}
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div style={{
//         position: 'fixed',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         backgroundColor: 'white',
//         borderTop: '1px solid #e5e7eb',
//         padding: '16px 24px',
//         zIndex: 10
//       }}>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'end',
//           alignItems: 'center'
//         }}>
//           <button
//             style={{
//               backgroundColor: '#7c3aed',
//               color: 'white',
//               padding: '8px 16px',
//               borderRadius: '8px',
//               border: 'none',
//               cursor: 'pointer',
//               fontSize: '14px',
//               fontWeight: '500'
//             }}
//             onClick={() => {
//               console.log('Proceeding with selected items:', selectedItems);
//               console.log('Current path:', selectedPath);
//             }}
//           >
//             Save & Proceed
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FunctionalScope;

// import React, { useState, useEffect } from 'react';

// const FunctionalScope = () => {
//   const [functionalScopeData, setFunctionalScopeData] = useState([]);
//   const [selectedPath, setSelectedPath] = useState({}); // Will store arrays for each level
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectedLevel, setSelectedLevel] = useState(2);

//   // Extended mock API data with Level 4 and 5
//   const mockApiData = [
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Aggregate & Disaggregate",
//       "l3": "Aggregate and Disaggregate",
//       "l4": "Aggregate Consensus Forecasting",
//       "l5": "Historical Data Analysis"
//     },
//     {
//       "l1": "Finance & Accounting Operations", 
//       "l2": "Aggregate & Disaggregate",
//       "l3": "Aggregate Consensus Forecasting", 
//       "l4": "Aggregate demand data from multiple sources",
//       "l5": "Data Validation & Cleansing"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Aggregate & Disaggregate", 
//       "l3": "Aggregate demand data from multiple sources",
//       "l4": "Release Of Disaggregated Forecast",
//       "l5": "Forecast Distribution & Communication"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Control Products Gross to Net",
//       "l3": "Plan & Review All Sales Deductions", 
//       "l4": "Plan & Review Gross Sales",
//       "l5": "Sales Performance Analysis"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Control Products Gross to Net",
//       "l3": "Plan & Review Gross Sales",
//       "l4": "Plan Commercial Provisions",
//       "l5": "Commercial Strategy Implementation"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Control Products Gross to Net",
//       "l3": "Plan Commercial Provisions",
//       "l4": "Review & Approve Gross Sales",
//       "l5": "Sales Approval Workflow"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Control Products Gross to Net", 
//       "l3": "Review & Approve Gross Sales",
//       "l4": "Review & Approve Gross Sales data",
//       "l5": "Data Quality Assurance"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Enrich Forecast",
//       "l3": "Conduct Post Promotion Analysis",
//       "l4": "Document Forecast Assumptions",
//       "l5": "Assumptions Documentation System"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Enrich Forecast",
//       "l3": "Document Forecast Assumptions", 
//       "l4": "Document Forecast Assumptions data",
//       "l5": "Forecast Tracking & Monitoring"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Enrich Forecast",
//       "l3": "Document Forecast Assumptions",
//       "l4": "Enrich Demand Forecast",
//       "l5": "Demand Pattern Recognition"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Enrich Forecast",
//       "l3": "Enrich Demand Forecast",
//       "l4": "Enrich Demand Forecast data",
//       "l5": "Advanced Analytics & Insights"
//     },
//     // Adding more mock data for better demonstration
//     {
//       "l1": "Human Resources Operations",
//       "l2": "Talent Management",
//       "l3": "Recruitment & Selection",
//       "l4": "Job Posting & Advertising",
//       "l5": "Candidate Screening Process"
//     },
//     {
//       "l1": "Human Resources Operations",
//       "l2": "Talent Management",
//       "l3": "Performance Management",
//       "l4": "Performance Reviews",
//       "l5": "360-Degree Feedback System"
//     },
//     {
//       "l1": "Human Resources Operations",
//       "l2": "Employee Relations",
//       "l3": "Conflict Resolution",
//       "l4": "Mediation Services",
//       "l5": "Post-Resolution Follow-up"
//     },
//     {
//       "l1": "IT Operations",
//       "l2": "Infrastructure Management",
//       "l3": "Server Management",
//       "l4": "Server Monitoring",
//       "l5": "Real-time Performance Alerts"
//     },
//     {
//       "l1": "IT Operations",
//       "l2": "Security Management",
//       "l3": "Access Control",
//       "l4": "User Authentication",
//       "l5": "Multi-Factor Authentication"
//     },
//     {
//       "l1": "IT Operations",
//       "l2": "Infrastructure Management",
//       "l3": "Network Management",
//       "l4": "Network Monitoring",
//       "l5": "Network Traffic Analysis"
//     },
//     {
//       "l1": "IT Operations",
//       "l2": "Security Management",
//       "l3": "Vulnerability Assessment",
//       "l4": "Security Scanning",
//       "l5": "Penetration Testing"
//     },
//     {
//       "l1": "Human Resources Operations",
//       "l2": "Talent Management",
//       "l3": "Training & Development",
//       "l4": "Skills Assessment",
//       "l5": "Learning Path Creation"
//     },
//     {
//       "l1": "Human Resources Operations",
//       "l2": "Employee Relations",
//       "l3": "Employee Engagement",
//       "l4": "Survey Management",
//       "l5": "Engagement Action Plans"
//     },
//     {
//       "l1": "Finance & Accounting Operations",
//       "l2": "Financial Reporting",
//       "l3": "Monthly Reports",
//       "l4": "P&L Analysis",
//       "l5": "Variance Analysis"
//     }
//   ];

//   useEffect(() => {
//     setFunctionalScopeData(mockApiData);
//   }, []);

//   // Get unique items for a specific level based on selected path
//   const getLevelItems = (level) => {
//     if (!functionalScopeData || functionalScopeData.length === 0) return [];
    
//     let filteredData = functionalScopeData;
    
//     // Filter based on selected path up to the previous level
//     for (let i = 1; i < level; i++) {
//       const levelKey = `l${i}`;
//       const selectedForLevel = selectedPath[levelKey];
      
//       if (selectedForLevel && selectedForLevel.length > 0) {
//         filteredData = filteredData.filter(item => 
//           selectedForLevel.includes(item[levelKey])
//         );
//       }
//     }
    
//     // Get unique items for current level
//     const levelKey = `l${level}`;
//     const uniqueItems = [];
//     const seen = new Set();
    
//     filteredData.forEach((item, index) => {
//       const value = item[levelKey];
//       if (value && !seen.has(value)) {
//         seen.add(value);
//         uniqueItems.push({
//           id: `${levelKey}-${value.replace(/\s+/g, '-')}`,
//           name: value,
//           level: level,
//           fullItem: item
//         });
//       }
//     });
    
//     return uniqueItems;
//   };

//   const handleItemSelect = (item, level) => {
//     const levelKey = `l${level}`;
//     const newSelectedPath = { ...selectedPath };
    
//     // Initialize array for this level if it doesn't exist
//     if (!newSelectedPath[levelKey]) {
//       newSelectedPath[levelKey] = [];
//     }
    
//     // Toggle selection for this item
//     const currentSelections = [...newSelectedPath[levelKey]];
//     const itemIndex = currentSelections.indexOf(item.name);
    
//     if (itemIndex > -1) {
//       // Remove if already selected
//       currentSelections.splice(itemIndex, 1);
//     } else {
//       // Add if not selected
//       currentSelections.push(item.name);
//     }
    
//     newSelectedPath[levelKey] = currentSelections;
    
//     // Clear deeper levels when selections change
//     for (let i = level + 1; i <= 5; i++) {
//       delete newSelectedPath[`l${i}`];
//     }
    
//     setSelectedPath(newSelectedPath);
    
//     // Also update the selectedItems for checkboxes
//     const itemId = item.id;
//     setSelectedItems(prev => {
//       if (itemIndex > -1) {
//         // Remove if already selected
//         return prev.filter(id => id !== itemId);
//       } else {
//         // Add if not selected
//         return [...prev, itemId];
//       }
//     });
//   };

//   const handleCheckboxChange = (item, level, e) => {
//     e.stopPropagation();
//     handleItemSelect(item, level);
//   };

//   const handleInfoClick = (item, e) => {
//     e.stopPropagation();
//     console.log('Info clicked for:', item);
//   };

//   // Get hierarchical numbering for items
//   const getItemNumber = (level, itemIndex, item) => {
//     if (level === 1) {
//       return `${itemIndex + 1}.0`;
//     } else if (level === 2) {
//       // Find which level 1 item this belongs to
//       const l1Items = getLevelItems(1);
//       const selectedL1 = selectedPath.l1;
//       if (selectedL1 && selectedL1.length > 0) {
//         const l1Index = l1Items.findIndex(l1Item => selectedL1.includes(l1Item.name));
//         return `${l1Index + 1}.${itemIndex + 1}`;
//       }
//       return `1.${itemIndex + 1}`;
//     } else if (level === 3) {
//       // Find which level 1 and level 2 items this belongs to
//       const l1Items = getLevelItems(1);
//       const l2Items = getLevelItems(2);
//       const selectedL1 = selectedPath.l1;
//       const selectedL2 = selectedPath.l2;
      
//       let l1Index = 0;
//       let l2Index = 0;
      
//       if (selectedL1 && selectedL1.length > 0) {
//         l1Index = l1Items.findIndex(l1Item => selectedL1.includes(l1Item.name));
//       }
      
//       if (selectedL2 && selectedL2.length > 0) {
//         l2Index = l2Items.findIndex(l2Item => selectedL2.includes(l2Item.name));
//       }
      
//       return `${l1Index + 1}.${l2Index + 1}.${itemIndex + 1}`;
//     } else if (level === 4) {
//       // Build path for level 4
//       const l1Items = getLevelItems(1);
//       const l2Items = getLevelItems(2);
//       const l3Items = getLevelItems(3);
//       const selectedL1 = selectedPath.l1;
//       const selectedL2 = selectedPath.l2;
//       const selectedL3 = selectedPath.l3;
      
//       let l1Index = 0;
//       let l2Index = 0;
//       let l3Index = 0;
      
//       if (selectedL1 && selectedL1.length > 0) {
//         l1Index = l1Items.findIndex(l1Item => selectedL1.includes(l1Item.name));
//       }
      
//       if (selectedL2 && selectedL2.length > 0) {
//         l2Index = l2Items.findIndex(l2Item => selectedL2.includes(l2Item.name));
//       }
      
//       if (selectedL3 && selectedL3.length > 0) {
//         l3Index = l3Items.findIndex(l3Item => selectedL3.includes(l3Item.name));
//       }
      
//       return `${l1Index + 1}.${l2Index + 1}.${l3Index + 1}.${itemIndex + 1}`;
//     } else if (level === 5) {
//       // Build path for level 5
//       const l1Items = getLevelItems(1);
//       const l2Items = getLevelItems(2);
//       const l3Items = getLevelItems(3);
//       const l4Items = getLevelItems(4);
//       const selectedL1 = selectedPath.l1;
//       const selectedL2 = selectedPath.l2;
//       const selectedL3 = selectedPath.l3;
//       const selectedL4 = selectedPath.l4;
      
//       let l1Index = 0;
//       let l2Index = 0;
//       let l3Index = 0;
//       let l4Index = 0;
      
//       if (selectedL1 && selectedL1.length > 0) {
//         l1Index = l1Items.findIndex(l1Item => selectedL1.includes(l1Item.name));
//       }
      
//       if (selectedL2 && selectedL2.length > 0) {
//         l2Index = l2Items.findIndex(l2Item => selectedL2.includes(l2Item.name));
//       }
      
//       if (selectedL3 && selectedL3.length > 0) {
//         l3Index = l3Items.findIndex(l3Item => selectedL3.includes(l3Item.name));
//       }
      
//       if (selectedL4 && selectedL4.length > 0) {
//         l4Index = l4Items.findIndex(l4Item => selectedL4.includes(l4Item.name));
//       }
      
//       return `${l1Index + 1}.${l2Index + 1}.${l3Index + 1}.${l4Index + 1}.${itemIndex + 1}`;
//     }
    
//     return `${itemIndex + 1}`;
//   };

//   const renderLevelColumn = (level) => {
//     const levelItems = getLevelItems(level);
//     const levelKey = `l${level}`;
//     const isLevelActive = level === 1 || (selectedPath[`l${level - 1}`] && selectedPath[`l${level - 1}`].length > 0);
    
//     return (
//       <div
//         key={level}
//         style={{
//           flex: level <= 3 ? '1' : 'none',
//           minWidth: level <= 3 ? '260px' : '240px',
//           maxWidth: level <= 3 ? '280px' : '250px',
//           width: level > 3 ? '240px' : 'auto',
//           backgroundColor: 'white',
//           border: '1px solid #e5e7eb',
//           borderRadius: '8px',
//           overflow: 'hidden',
//           opacity: isLevelActive ? 1 : 0.3,
//           transition: 'opacity 0.2s'
//         }}
//       >
//         {/* Level Header */}
//         <div style={{
//           backgroundColor: '#f8fafc',
//           padding: '10px 14px',
//           borderBottom: '1px solid #e5e7eb'
//         }}>
//           <h3 style={{
//             fontSize: '13px',
//             fontWeight: '600',
//             color: '#374151',
//             margin: 0,
//             textAlign: 'center'
//           }}>
//             LEVEL {level} PROCESS
//           </h3>
//           {/* Show selection count */}
//           {selectedPath[levelKey] && selectedPath[levelKey].length > 0 && (
//             <div style={{
//               textAlign: 'center',
//               fontSize: '11px',
//               color: '#7c3aed',
//               marginTop: '3px'
//             }}>
//               {selectedPath[levelKey].length} selected
//             </div>
//           )}
//         </div>

//         {/* Level Content */}
//         <div style={{
//           padding: '12px',
//           maxHeight: '480px',
//           overflowY: 'auto'
//         }}>
//           {!isLevelActive ? (
//             <div style={{
//               textAlign: 'center',
//               padding: '30px 0',
//               color: '#9ca3af',
//               fontSize: '13px'
//             }}>
//               Select from Level {level - 1} to view options
//             </div>
//           ) : loading ? (
//             <div style={{ padding: '30px 0', textAlign: 'center' }}>
//               <div style={{
//                 display: 'inline-block',
//                 width: '20px',
//                 height: '20px',
//                 border: '2px solid #e5e7eb',
//                 borderTop: '2px solid #7c3aed',
//                 borderRadius: '50%',
//                 animation: 'spin 1s linear infinite'
//               }}></div>
//               <p style={{ marginTop: '6px', color: '#6b7280', fontSize: '11px' }}>Loading...</p>
//             </div>
//           ) : error ? (
//             <div style={{
//               backgroundColor: '#fef2f2',
//               border: '1px solid #fecaca',
//               borderRadius: '4px',
//               padding: '10px',
//               fontSize: '11px'
//             }}>
//               <div style={{ color: '#dc2626', fontWeight: '500' }}>Error</div>
//               <div style={{ color: '#dc2626', marginTop: '3px' }}>
//                 {error}
//               </div>
//             </div>
//           ) : levelItems.length === 0 ? (
//             <div style={{
//               textAlign: 'center',
//               padding: '30px 0',
//               color: '#6b7280',
//               fontSize: '13px'
//             }}>
//               No items available
//             </div>
//           ) : (
//             <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//               {levelItems.map((item, index) => {
//                 const isSelected = selectedItems.includes(item.id);
//                 const isPathSelected = selectedPath[levelKey] && selectedPath[levelKey].includes(item.name);
//                 const itemNumber = getItemNumber(level, index, item);
                
//                 return (
//                   <div
//                     key={item.id}
//                     style={{
//                       display: 'flex',
//                       alignItems: 'flex-start',
//                       justifyContent: 'space-between',
//                       padding: '8px 10px',
//                       border: isPathSelected ? '2px solid #7c3aed' : '1px solid #e5e7eb',
//                       borderRadius: '5px',
//                       backgroundColor: isSelected ? '#f0f9ff' : isPathSelected ? '#faf5ff' : 'white',
//                       transition: 'all 0.2s'
//                     }}
//                   >
//                     <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', flex: 1 }}>
//                       <input
//                         type="checkbox"
//                         checked={isSelected}
//                         onChange={(e) => handleCheckboxChange(item, level, e)}
//                         style={{
//                           width: '12px',
//                           height: '12px',
//                           accentColor: '#7c3aed',
//                           marginTop: '2px',
//                           flexShrink: 0,
//                           cursor: 'pointer'
//                         }}
//                       />
//                       <div style={{ flex: 1 }}>
//                         <div style={{
//                           fontWeight: isPathSelected ? '600' : '500',
//                           color: isPathSelected ? '#7c3aed' : '#111827',
//                           fontSize: '11px',
//                           lineHeight: '1.3',
//                           wordBreak: 'break-word'
//                         }}>
//                           {itemNumber} {item.name}
//                           {isPathSelected && (
//                             <span style={{
//                               marginLeft: '6px',
//                               fontSize: '9px',
//                               backgroundColor: '#7c3aed',
//                               color: 'white',
//                               padding: '1px 4px',
//                               borderRadius: '10px'
//                             }}>
//                               Selected
//                             </span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     <button
//                       onClick={(e) => handleInfoClick(item, e)}
//                       style={{
//                         backgroundColor: 'transparent',
//                         border: 'none',
//                         cursor: 'pointer',
//                         padding: '1px',
//                         borderRadius: '2px',
//                         color: '#9ca3af',
//                         flexShrink: 0,
//                         marginLeft: '6px'
//                       }}
//                       title="More information"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth={1.5}
//                         stroke="currentColor"
//                         style={{
//                           width: '14px',
//                           height: '14px',
//                           color: '#6b7280',
//                           pointerEvents: 'none'
//                         }}
//                       >
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2.25M12 15h.01m-.01-10.5a9 9 0 100 18 9 9 0 000-18z" />
//                       </svg>
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div style={{
//       minHeight: '100vh',
//       backgroundColor: '#f8fafc',
//       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
//     }}>
//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//       `}</style>
      
//       {/* Breadcrumb */}
//       <div style={{
//         padding: '12px 24px',
//         backgroundColor: 'white',
//         borderBottom: '1px solid #e5e7eb'
//       }}>
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '8px',
//           fontSize: '14px',
//           color: '#6b7280'
//         }}>
//           <span>Home</span>
//           <span>›</span>
//           <span>Decision Tree</span>
//           <span>›</span>
//           <span style={{ color: '#111827' }}>Functional Scope</span>
//         </div>
//       </div>

//       <div style={{ 
//         display: 'flex',
//         padding: '24px',
//         gap: '24px',
//         minHeight: 'calc(100vh - 120px)'
//       }}>
//         {/* Left Sidebar Box */}
//         <div style={{
//           width: '280px',
//           backgroundColor: 'white',
//           border: '1px solid #e5e7eb',
//           borderRadius: '8px',
//           padding: '24px',
//           height: 'fit-content',
//           boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
//         }}>
//           <h2 style={{
//             fontSize: '20px',
//             fontWeight: '600',
//             marginBottom: '8px',
//             color: '#111827'
//           }}>Functional Scope</h2>
//           <p style={{
//             fontSize: '14px',
//             color: '#6b7280',
//             marginBottom: '24px',
//             lineHeight: '1.5'
//           }}>
//             Structured framework for selecting functional requirements,
//             prioritising them based on different measures for informed decision-making.
//           </p>
          

          
//           {/* Step indicators */}
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//               <div style={{
//                 width: '24px',
//                 height: '24px',
//                 backgroundColor: '#7c3aed',
//                 borderRadius: '50%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 color: 'white',
//                 fontSize: '12px',
//                 fontWeight: '600'
//               }}>
//                 1
//               </div>
//               <span style={{ color: '#7c3aed', fontWeight: '500', fontSize: '14px' }}>Functional Scope</span>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//               <div style={{
//                 width: '24px',
//                 height: '24px',
//                 backgroundColor: '#d1d5db',
//                 borderRadius: '50%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 color: 'white',
//                 fontSize: '12px',
//                 fontWeight: '600'
//               }}>
//                 2
//               </div>
//               <span style={{ color: '#9ca3af', fontSize: '14px' }}>Decision Criteria</span>
//             </div>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//               <div style={{
//                 width: '24px',
//                 height: '24px',
//                 backgroundColor: '#d1d5db',
//                 borderRadius: '50%',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 color: 'white',
//                 fontSize: '12px',
//                 fontWeight: '600'
//               }}>
//                 3
//               </div>
//               <span style={{ color: '#9ca3af', fontSize: '14px' }}>Solution</span>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Box */}
//         <div style={{
//           flex: 1,
//           backgroundColor: 'white',
//           border: '1px solid #e5e7eb',
//           borderRadius: '8px',
//           boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
//           overflow: 'hidden'
//         }}>
//           {/* Header with search, parameters and level view selector */}
//           <div style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             padding: '20px 24px',
//             borderBottom: '1px solid #e5e7eb',
//             backgroundColor: '#f9fafb',
//             flexWrap: 'wrap',
//             gap: '16px'
//           }}>
//             {/* Title */}
//             <h1 style={{
//               fontSize: '20px',
//               fontWeight: '600',
//               color: '#111827',
//               margin: 0
//             }}>
//               Functional Scope
//             </h1>

//             {/* Right side controls */}
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '16px',
//               flexWrap: 'wrap'
//             }}>
//               {/* Search */}
//               <div style={{ position: 'relative' }}>
//                 <svg
//                   style={{
//                     position: 'absolute',
//                     left: '12px',
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     width: '16px',
//                     height: '16px',
//                     color: '#9ca3af'
//                   }}
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <input
//                   type="text"
//                   placeholder="Search"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   style={{
//                     width: '200px',
//                     paddingLeft: '36px',
//                     paddingRight: '12px',
//                     paddingTop: '8px',
//                     paddingBottom: '8px',
//                     border: '1px solid #d1d5db',
//                     borderRadius: '8px',
//                     fontSize: '14px',
//                     backgroundColor: 'white'
//                   }}
//                 />
//               </div>

//               {/* Select Parameters button */}
//               <button
//                 style={{
//                   backgroundColor: '#8b5cf6',
//                   color: 'white',
//                   padding: '8px 16px',
//                   borderRadius: '20px',
//                   border: 'none',
//                   cursor: 'pointer',
//                   fontSize: '14px',
//                   fontWeight: '500',
//                   whiteSpace: 'nowrap'
//                 }}
//                 onClick={() => {
//                   console.log('Select Parameters clicked');
//                 }}
//               >
//                 Select Parameters
//               </button>

//               {/* Select Level View */}
//               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
//                 <span style={{ fontSize: '14px', color: '#4B5563' }}>Select Level View</span>

//                 {/* Progress Bar */}
//                 <div style={{
//                   position: 'relative',
//                   width: '150px',
//                   height: '6px',
//                   backgroundColor: '#E5E7EB',
//                   borderRadius: '3px'
//                 }}>
//                   <div style={{
//                     width: `${(selectedLevel - 1) / 4 * 100}%`,
//                     height: '6px',
//                     backgroundColor: '#2563eb',
//                     borderRadius: '3px',
//                     transition: 'width 0.3s'
//                   }} />
//                 </div>

//                 {/* Numbers */}
//                 <div style={{ display: 'flex', justifyContent: 'space-between', width: '150px' }}>
//                   {[1, 2, 3, 4, 5].map((level) => (
//                     <button
//                       key={level}
//                       onClick={() => setSelectedLevel(level)}
//                       style={{
//                         border: 'none',
//                         background: 'none',
//                         cursor: 'pointer',
//                         fontSize: '14px',
//                         fontWeight: selectedLevel === level ? '600' : '400',
//                         color: selectedLevel === level ? '#2563eb' : '#111827'
//                       }}
//                     >
//                       {level}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Multi-column layout with horizontal scroll for levels 4-5 only */}
//           <div style={{
//             display: 'flex',
//             gap: '16px',
//             overflowX: 'auto',
//             padding: '24px',
//             paddingBottom: '80px'
//           }}>
//             {/* First three levels always visible */}
//             {[1, 2, 3].map(level => renderLevelColumn(level))}
            
//             {/* Scrollable container for levels 4-5 */}
//             <div style={{
//               display: 'flex',
//               gap: '16px',
//               overflowX: 'auto',
//               flex: 1,
//               minWidth: 0 // Important for flex child to shrink
//             }}>
//               {[4, 5].map(level => renderLevelColumn(level))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div style={{
//         position: 'fixed',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         backgroundColor: 'white',
//         borderTop: '1px solid #e5e7eb',
//         padding: '16px 24px',
//         zIndex: 10
//       }}>
//         <div style={{
//           display: 'flex',
//           justifyContent: 'end',
//           alignItems: 'center'
//         }}>
//           <button
//             style={{
//               backgroundColor: '#7c3aed',
//               color: 'white',
//               padding: '8px 16px',
//               borderRadius: '8px',
//               border: 'none',
//               cursor: 'pointer',
//               fontSize: '14px',
//               fontWeight: '500'
//             }}
//             onClick={() => {
//               console.log('Proceeding with selected items:', selectedItems);
//               console.log('Current path:', selectedPath);
//             }}
//           >
//             Save & Proceed
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FunctionalScope;

import React, { useState, useEffect } from 'react';

const FunctionalScope = () => {
  const [functionalScopeData, setFunctionalScopeData] = useState([]);
  const [selectedPath, setSelectedPath] = useState({}); // Will store arrays for each level
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(2);

  // Extended mock API data with Level 4 and 5
  const mockApiData = [
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Aggregate & Disaggregate",
      "l3": "Aggregate and Disaggregate",
      "l4": "Aggregate Consensus Forecasting",
      "l5": "Historical Data Analysis"
    },
    {
      "l1": "Finance & Accounting Operations", 
      "l2": "Aggregate & Disaggregate",
      "l3": "Aggregate Consensus Forecasting", 
      "l4": "Aggregate demand data from multiple sources",
      "l5": "Data Validation & Cleansing"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Aggregate & Disaggregate", 
      "l3": "Aggregate demand data from multiple sources",
      "l4": "Release Of Disaggregated Forecast",
      "l5": "Forecast Distribution & Communication"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Control Products Gross to Net",
      "l3": "Plan & Review All Sales Deductions", 
      "l4": "Plan & Review Gross Sales",
      "l5": "Sales Performance Analysis"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Control Products Gross to Net",
      "l3": "Plan & Review Gross Sales",
      "l4": "Plan Commercial Provisions",
      "l5": "Commercial Strategy Implementation"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Control Products Gross to Net",
      "l3": "Plan Commercial Provisions",
      "l4": "Review & Approve Gross Sales",
      "l5": "Sales Approval Workflow"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Control Products Gross to Net", 
      "l3": "Review & Approve Gross Sales",
      "l4": "Review & Approve Gross Sales data",
      "l5": "Data Quality Assurance"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Enrich Forecast",
      "l3": "Conduct Post Promotion Analysis",
      "l4": "Document Forecast Assumptions",
      "l5": "Assumptions Documentation System"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Enrich Forecast",
      "l3": "Document Forecast Assumptions", 
      "l4": "Document Forecast Assumptions data",
      "l5": "Forecast Tracking & Monitoring"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Enrich Forecast",
      "l3": "Document Forecast Assumptions",
      "l4": "Enrich Demand Forecast",
      "l5": "Demand Pattern Recognition"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Enrich Forecast",
      "l3": "Enrich Demand Forecast",
      "l4": "Enrich Demand Forecast data",
      "l5": "Advanced Analytics & Insights"
    },
    // Adding more mock data for better demonstration
    {
      "l1": "Human Resources Operations",
      "l2": "Talent Management",
      "l3": "Recruitment & Selection",
      "l4": "Job Posting & Advertising",
      "l5": "Candidate Screening Process"
    },
    {
      "l1": "Human Resources Operations",
      "l2": "Talent Management",
      "l3": "Performance Management",
      "l4": "Performance Reviews",
      "l5": "360-Degree Feedback System"
    },
    {
      "l1": "Human Resources Operations",
      "l2": "Employee Relations",
      "l3": "Conflict Resolution",
      "l4": "Mediation Services",
      "l5": "Post-Resolution Follow-up"
    },
    {
      "l1": "IT Operations",
      "l2": "Infrastructure Management",
      "l3": "Server Management",
      "l4": "Server Monitoring",
      "l5": "Real-time Performance Alerts"
    },
    {
      "l1": "IT Operations",
      "l2": "Security Management",
      "l3": "Access Control",
      "l4": "User Authentication",
      "l5": "Multi-Factor Authentication"
    },
    {
      "l1": "IT Operations",
      "l2": "Infrastructure Management",
      "l3": "Network Management",
      "l4": "Network Monitoring",
      "l5": "Network Traffic Analysis"
    },
    {
      "l1": "IT Operations",
      "l2": "Security Management",
      "l3": "Vulnerability Assessment",
      "l4": "Security Scanning",
      "l5": "Penetration Testing"
    },
    {
      "l1": "Human Resources Operations",
      "l2": "Talent Management",
      "l3": "Training & Development",
      "l4": "Skills Assessment",
      "l5": "Learning Path Creation"
    },
    {
      "l1": "Human Resources Operations",
      "l2": "Employee Relations",
      "l3": "Employee Engagement",
      "l4": "Survey Management",
      "l5": "Engagement Action Plans"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Financial Reporting",
      "l3": "Monthly Reports",
      "l4": "P&L Analysis",
      "l5": "Variance Analysis"
    }
  ];

  useEffect(() => {
    setFunctionalScopeData(mockApiData);
  }, []);

  // Get unique items for a specific level based on selected path
  const getLevelItems = (level) => {
    if (!functionalScopeData || functionalScopeData.length === 0) return [];
    
    let filteredData = functionalScopeData;
    
    // Filter based on selected path up to the previous level
    for (let i = 1; i < level; i++) {
      const levelKey = `l${i}`;
      const selectedForLevel = selectedPath[levelKey];
      
      if (selectedForLevel && selectedForLevel.length > 0) {
        filteredData = filteredData.filter(item => 
          selectedForLevel.includes(item[levelKey])
        );
      }
    }
    
    // Get unique items for current level
    const levelKey = `l${level}`;
    const uniqueItems = [];
    const seen = new Set();
    
    filteredData.forEach((item, index) => {
      const value = item[levelKey];
      if (value && !seen.has(value)) {
        seen.add(value);
        uniqueItems.push({
          id: `${levelKey}-${value.replace(/\s+/g, '-')}`,
          name: value,
          level: level,
          fullItem: item
        });
      }
    });
    
    return uniqueItems;
  };

  const handleItemSelect = (item, level) => {
    const levelKey = `l${level}`;
    const newSelectedPath = { ...selectedPath };
    
    // Initialize array for this level if it doesn't exist
    if (!newSelectedPath[levelKey]) {
      newSelectedPath[levelKey] = [];
    }
    
    // Toggle selection for this item
    const currentSelections = [...newSelectedPath[levelKey]];
    const itemIndex = currentSelections.indexOf(item.name);
    
    if (itemIndex > -1) {
      // Remove if already selected
      currentSelections.splice(itemIndex, 1);
    } else {
      // Add if not selected
      currentSelections.push(item.name);
    }
    
    newSelectedPath[levelKey] = currentSelections;
    
    // Clear deeper levels when selections change
    for (let i = level + 1; i <= 5; i++) {
      delete newSelectedPath[`l${i}`];
    }
    
    setSelectedPath(newSelectedPath);
    
    // Also update the selectedItems for checkboxes
    const itemId = item.id;
    setSelectedItems(prev => {
      if (itemIndex > -1) {
        // Remove if already selected
        return prev.filter(id => id !== itemId);
      } else {
        // Add if not selected
        return [...prev, itemId];
      }
    });
  };

  const handleCheckboxChange = (item, level, e) => {
    e.stopPropagation();
    handleItemSelect(item, level);
  };

  const handleInfoClick = (item, e) => {
    e.stopPropagation();
    console.log('Info clicked for:', item);
  };

  // Get hierarchical numbering for items - UPDATED IMPLEMENTATION
  const getItemNumber = (level, item) => {
    // Get all level items for the current context
    const levelItems = getLevelItems(level);
    const currentIndex = levelItems.findIndex(levelItem => levelItem.name === item.name);
    
    if (level === 1) {
      return `${currentIndex + 1}.0`;
    }
    
    // For higher levels, we need to build hierarchical numbering
    // Find a full item that contains this level item
    const fullItem = functionalScopeData.find(dataItem => 
      dataItem[`l${level}`] === item.name
    );
    
    if (!fullItem) return `${currentIndex + 1}`;
    
    // Build hierarchical number
    const buildNumber = (targetLevel, targetItem) => {
      const parts = [];
      
      // Get L1 position
      const l1Items = getLevelItems(1);
      const l1Index = l1Items.findIndex(l1Item => l1Item.name === targetItem.l1);
      parts.push(l1Index + 1);
      
      // Build path for levels 2 through targetLevel
      let currentContext = [targetItem.l1];
      
      for (let i = 2; i <= targetLevel; i++) {
        // Create temporary selectedPath to get correct context
        const tempPath = {};
        for (let j = 1; j < i; j++) {
          tempPath[`l${j}`] = [targetItem[`l${j}`]];
        }
        
        // Get items for this level in current context
        let contextData = functionalScopeData.filter(dataItem => {
          for (let j = 1; j < i; j++) {
            if (dataItem[`l${j}`] !== targetItem[`l${j}`]) {
              return false;
            }
          }
          return true;
        });
        
        // Get unique items for this level
        const levelKey = `l${i}`;
        const uniqueItems = [];
        const seen = new Set();
        
        contextData.forEach(dataItem => {
          const value = dataItem[levelKey];
          if (value && !seen.has(value)) {
            seen.add(value);
            uniqueItems.push(value);
          }
        });
        
        // Find index of current item
        const itemIndex = uniqueItems.findIndex(uniqueItem => uniqueItem === targetItem[levelKey]);
        parts.push(itemIndex + 1);
      }
      
      return parts;
    };
    
    const numberParts = buildNumber(level, fullItem);
    
    // Format based on level
    if (level === 1) {
      return `${numberParts[0]}.0`;
    } else if (level === 2) {
      return `${numberParts[0]}.${numberParts[1]}`;
    } else if (level === 3) {
      return `${numberParts[0]}.${numberParts[1]}.${numberParts[2]}`;
    } else if (level === 4) {
      return `${numberParts[0]}.${numberParts[1]}.${numberParts[2]}.${numberParts[3]}`;
    } else if (level === 5) {
      return `${numberParts[0]}.${numberParts[1]}.${numberParts[2]}.${numberParts[3]}.${numberParts[4]}`;
    }
    
    return numberParts.join('.');
  };

  const renderLevelColumn = (level) => {
    const levelItems = getLevelItems(level);
    const levelKey = `l${level}`;
    const isLevelActive = level === 1 || (selectedPath[`l${level - 1}`] && selectedPath[`l${level - 1}`].length > 0);
    
    return (
      <div
        key={level}
        style={{
          flex: level <= 3 ? '1' : 'none',
          minWidth: level <= 3 ? '260px' : '240px',
          maxWidth: level <= 3 ? '280px' : '250px',
          width: level > 3 ? '240px' : 'auto',
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden',
          opacity: isLevelActive ? 1 : 0.3,
          transition: 'opacity 0.2s'
        }}
      >
        {/* Level Header */}
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '10px 14px',
          borderBottom: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            fontSize: '13px',
            fontWeight: '600',
            color: '#374151',
            margin: 0,
            textAlign: 'center'
          }}>
            LEVEL {level} PROCESS
          </h3>
          {/* Show selection count */}
          {selectedPath[levelKey] && selectedPath[levelKey].length > 0 && (
            <div style={{
              textAlign: 'center',
              fontSize: '11px',
              color: '#7c3aed',
              marginTop: '3px'
            }}>
              {selectedPath[levelKey].length} selected
            </div>
          )}
        </div>

        {/* Level Content */}
        <div style={{
          padding: '12px',
          maxHeight: '480px',
          overflowY: 'auto'
        }}>
          {!isLevelActive ? (
            <div style={{
              textAlign: 'center',
              padding: '30px 0',
              color: '#9ca3af',
              fontSize: '13px'
            }}>
              Select from Level {level - 1} to view options
            </div>
          ) : loading ? (
            <div style={{ padding: '30px 0', textAlign: 'center' }}>
              <div style={{
                display: 'inline-block',
                width: '20px',
                height: '20px',
                border: '2px solid #e5e7eb',
                borderTop: '2px solid #7c3aed',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ marginTop: '6px', color: '#6b7280', fontSize: '11px' }}>Loading...</p>
            </div>
          ) : error ? (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '4px',
              padding: '10px',
              fontSize: '11px'
            }}>
              <div style={{ color: '#dc2626', fontWeight: '500' }}>Error</div>
              <div style={{ color: '#dc2626', marginTop: '3px' }}>
                {error}
              </div>
            </div>
          ) : levelItems.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '30px 0',
              color: '#6b7280',
              fontSize: '13px'
            }}>
              No items available
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {levelItems.map((item, index) => {
                const isSelected = selectedItems.includes(item.id);
                const itemNumber = getItemNumber(level, item);
                
                return (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      padding: '8px 10px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '5px',
                      backgroundColor: 'white',
                      transition: 'all 0.2s',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleItemSelect(item, level)}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flex: 1 }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleCheckboxChange(item, level, e)}
                        style={{
                          width: '14px',
                          height: '14px',
                          accentColor: '#7c3aed',
                          marginTop: '2px',
                          flexShrink: 0,
                          cursor: 'pointer'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontWeight: '400',
                          color: '#374151',
                          fontSize: '13px',
                          lineHeight: '1.4',
                          wordBreak: 'break-word'
                        }}>
                          {itemNumber} {item.name}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleInfoClick(item, e)}
                      style={{
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '2px',
                        borderRadius: '3px',
                        color: '#9ca3af',
                        flexShrink: 0,
                        marginLeft: '8px'
                      }}
                      title="More information"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        style={{
                          width: '16px',
                          height: '16px',
                          color: '#9ca3af'
                        }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2.25M12 15h.01m-.01-10.5a9 9 0 100 18 9 9 0 000-18z" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      
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

      <div style={{ 
        display: 'flex',
        padding: '24px',
        gap: '24px',
        minHeight: 'calc(100vh - 120px)'
      }}>
        {/* Left Sidebar Box */}
        <div style={{
          width: '280px',
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '24px',
          height: 'fit-content',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            marginBottom: '8px',
            color: '#111827'
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#7c3aed',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                1
              </div>
              <span style={{ color: '#7c3aed', fontWeight: '500', fontSize: '14px' }}>Functional Scope</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#d1d5db',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                2
              </div>
              <span style={{ color: '#9ca3af', fontSize: '14px' }}>Decision Criteria</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: '#d1d5db',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                3
              </div>
              <span style={{ color: '#9ca3af', fontSize: '14px' }}>Solution</span>
            </div>
          </div>
        </div>

        {/* Main Content Box */}
        <div style={{
          flex: 1,
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          {/* Header with search, parameters and level view selector */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 24px',
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            {/* Title */}
            <h1 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#111827',
              margin: 0
            }}>
              Functional Scope
            </h1>

            {/* Right side controls */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
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
                    width: '200px',
                    paddingLeft: '36px',
                    paddingRight: '12px',
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: 'white'
                  }}
                />
              </div>

              {/* Select Parameters button */}
              <button
                style={{
                  backgroundColor: '#8b5cf6',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => {
                  console.log('Select Parameters clicked');
                }}
              >
                Select Parameters
              </button>

              {/* Select Level View */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                <span style={{ fontSize: '14px', color: '#4B5563' }}>Select Level View</span>

                {/* Progress Bar */}
                <div style={{
                  position: 'relative',
                  width: '150px',
                  height: '6px',
                  backgroundColor: '#E5E7EB',
                  borderRadius: '3px'
                }}>
                  <div style={{
                    width: `${(selectedLevel - 1) / 4 * 100}%`,
                    height: '6px',
                    backgroundColor: '#2563eb',
                    borderRadius: '3px',
                    transition: 'width 0.3s'
                  }} />
                </div>

                {/* Numbers */}
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '150px' }}>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      style={{
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: selectedLevel === level ? '600' : '400',
                        color: selectedLevel === level ? '#2563eb' : '#111827'
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Multi-column layout with horizontal scroll for levels 4-5 only */}
          <div style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            padding: '24px',
            paddingBottom: '80px'
          }}>
            {/* First three levels always visible */}
            {[1, 2, 3].map(level => renderLevelColumn(level))}
            
            {/* Scrollable container for levels 4-5 */}
            <div style={{
              display: 'flex',
              gap: '16px',
              overflowX: 'auto',
              flex: 1,
              minWidth: 0 // Important for flex child to shrink
            }}>
              {[4, 5].map(level => renderLevelColumn(level))}
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
        padding: '16px 24px',
        zIndex: 10
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center'
        }}>
          <button
            style={{
              backgroundColor: '#7c3aed',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
            onClick={() => {
              console.log('Proceeding with selected items:', selectedItems);
              console.log('Current path:', selectedPath);
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