import React, { useState, useEffect } from 'react';
import DecisionCriteria from './DecisionCriteria';

const FunctionalScope = () => {
  const [functionalScopeData, setFunctionalScopeData] = useState([]);
  const [selectedPath, setSelectedPath] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [showParameterModal, setShowParameterModal] = useState(false);
  const [parameterLevel, setParameterLevel] = useState(1);
  const [proceedToDecisionCriteria, setProceedToDecisionCriteria] = useState(false);

  // Mock API data
  const mockApiData = [
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Aggregate & Disaggregate",
      "l3": "Aggregate and Disaggregate",
      "l4": "Aggregate Consensus Forecasting"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Aggregate & Disaggregate",
      "l3": "Aggregate Consensus Forecasting",
      "l4": "Aggregate demand data from multiple sources"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Aggregate & Disaggregate",
      "l3": "Aggregate demand data from multiple sources",
      "l4": "Release Of Disaggregated Forecast"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Control Products Gross to Net",
      "l3": "Plan & Review All Sales Deductions",
      "l4": "Plan & Review Gross Sales"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Control Products Gross to Net",
      "l3": "Plan & Review Gross Sales",
      "l4": "Plan Commercial Provisions"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Control Products Gross to Net",
      "l3": "Plan Commercial Provisions",
      "l4": "Review & Approve Gross Sales"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Control Products Gross to Net",
      "l3": "Review & Approve Gross Sales",
      "l4": "Review & Approve Gross Sales data"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Enrich Forecast",
      "l3": "Conduct Post Promotion Analysis",
      "l4": "Document Forecast Assumptions"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Enrich Forecast",
      "l3": "Document Forecast Assumptions",
      "l4": "Document Forecast Assumptions data"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Enrich Forecast",
      "l3": "Document Forecast Assumptions",
      "l4": "Enrich Demand Forecast"
    },
    {
      "l1": "Finance & Accounting Operations",
      "l2": "Enrich Forecast",
      "l3": "Enrich Demand Forecast",
      "l4": "Enrich Demand Forecast data"
    },
    {
      "l1": "Human Resources Operations",
      "l2": "Talent Management",
      "l3": "Recruitment & Selection",
      "l4": "Job Posting & Advertising"
    },
    {
      "l1": "Human Resources Operations",
      "l2": "Talent Management",
      "l3": "Performance Management",
      "l4": "Performance Reviews"
    },
    {
      "l1": "Human Resources Operations",
      "l2": "Employee Relations",
      "l3": "Conflict Resolution",
      "l4": "Mediation Services"
    },
    {
      "l1": "IT Operations",
      "l2": "Infrastructure Management",
      "l3": "Server Management",
      "l4": "Server Monitoring"
    },
    {
      "l1": "IT Operations",
      "l2": "Security Management",
      "l3": "Access Control",
      "l4": "User Authentication"
    }
  ];

  useEffect(() => {
    setFunctionalScopeData(mockApiData);
  }, []);

  // Filter data based on search query
  const getFilteredData = () => {
    if (!searchQuery) return functionalScopeData;
    
    return functionalScopeData.filter(item => 
      Object.values(item).some(value => 
        value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };
if (proceedToDecisionCriteria) {
    return <DecisionCriteria />;
  }
  // Get unique items for a specific level based on selected path
  const getLevelItems = (level) => {
    const filteredData = getFilteredData();
    if (!filteredData || filteredData.length === 0) return [];
    
    let levelData = filteredData;
    
    // Filter based on selected path up to the previous level
    for (let i = 1; i < level; i++) {
      const levelKey = `l${i}`;
      const selectedForLevel = selectedPath[levelKey];
      
      if (selectedForLevel && selectedForLevel.length > 0) {
        levelData = levelData.filter(item => 
          selectedForLevel.includes(item[levelKey])
        );
      }
    }
    
    // Get unique items for current level
    const levelKey = `l${level}`;
    const uniqueItems = [];
    const seen = new Set();
    
    levelData.forEach((item) => {
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
    
    if (!newSelectedPath[levelKey]) {
      newSelectedPath[levelKey] = [];
    }
    
    const currentSelections = [...newSelectedPath[levelKey]];
    const itemIndex = currentSelections.indexOf(item.name);
    
    if (itemIndex > -1) {
      currentSelections.splice(itemIndex, 1);
    } else {
      currentSelections.push(item.name);
    }
    
    newSelectedPath[levelKey] = currentSelections;
    
    // Clear deeper levels when selections change
    for (let i = level + 1; i <= 5; i++) {
      delete newSelectedPath[`l${i}`];
    }
    
    setSelectedPath(newSelectedPath);
    
    const itemId = item.id;
    setSelectedItems(prev => {
      const filteredItems = prev.filter(id => {
        const levelFromId = parseInt(id.split('-')[0].replace('l', ''));
        return levelFromId <= level;
      });
      
      if (itemIndex > -1) {
        return filteredItems.filter(id => id !== itemId);
      } else {
        return [...filteredItems, itemId];
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

  const getItemNumber = (level, item) => {
    const levelItems = getLevelItems(level);
    const currentIndex = levelItems.findIndex(levelItem => levelItem.name === item.name);
    
    if (level === 1) {
      return `${currentIndex + 1}.0`;
    }
    
    const fullItem = functionalScopeData.find(dataItem => 
      dataItem[`l${level}`] === item.name
    );
    
    if (!fullItem) return `${currentIndex + 1}`;
    
    const buildNumber = (targetLevel, targetItem) => {
      const parts = [];
      
      const l1Items = getLevelItems(1);
      const l1Index = l1Items.findIndex(l1Item => l1Item.name === targetItem.l1);
      parts.push(l1Index + 1);
      
      for (let i = 2; i <= targetLevel; i++) {
        let contextData = functionalScopeData.filter(dataItem => {
          for (let j = 1; j < i; j++) {
            if (dataItem[`l${j}`] !== targetItem[`l${j}`]) {
              return false;
            }
          }
          return true;
        });
        
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
        
        const itemIndex = uniqueItems.findIndex(uniqueItem => uniqueItem === targetItem[levelKey]);
        parts.push(itemIndex + 1);
      }
      
      return parts;
    };
    
    const numberParts = buildNumber(level, fullItem);
    
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

  const renderLevelColumn = (level, idx, totalColumns = 5) => {
    const levelItems = getLevelItems(level);
    const levelKey = `l${level}`;
    const isLevelActive = level === 1 || (selectedPath[`l${level - 1}`] && selectedPath[`l${level - 1}`].length > 0);

    return (
      <div
        key={level}
        style={{
          flex: '1 1 0',
          minWidth: '300px',
          maxWidth: 'none',
          backgroundColor: 'white',
          borderRight: idx < totalColumns - 1 ? '1px solid #e5e7eb' : 'none',
          display: 'flex',
          flexDirection: 'column',
          opacity: isLevelActive ? 1 : 0.3,
          transition: 'opacity 0.2s',
        }}
      >
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '12px 16px',
          borderBottom: '1px solid #e5e7eb',
          textAlign: 'left',
          minHeight: '64px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#374151',
            margin: 0,
            textAlign: 'left',
          }}>
            LEVEL {level} PROCESS
          </h3>
          {selectedPath[levelKey] && selectedPath[levelKey].length > 0 && (
            <div style={{
              fontSize: '12px',
              color: '#7c3aed',
              marginTop: '4px',
              textAlign: 'left',
            }}>
              {selectedPath[levelKey].length} selected
            </div>
          )}
        </div>

        <div style={{
          padding: 0,
          maxHeight: '500px',
          overflowY: 'auto',
          flex: 1,
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
          <span style={{ color: '#0036C9' }}>Home</span>
          <span>›</span>
          <span style={{ color: '#0036C9', textDecoration: 'underline' }}>Decision Tree</span>
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
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          position: 'relative'
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

          {/* Vertical line connecting all steps */}
          <div style={{
            position: 'absolute',
            left: '36px',
            top: '140px',
            bottom: '24px',
            width: '2px',
            backgroundColor: '#d1d5db',
            zIndex: 1
          }}></div>

          {/* Step indicators */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', zIndex: 2 }}>
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
              <span style={{ color: '#9ca3af', fontSize: '14px' }}>Non Functional</span>
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
                4
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
          {/* Header with search and parameters */}
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
            {/* Search Bar */}
            <div style={{
              position: 'relative',
              maxWidth: '400px',
              flex: 1
            }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px 8px 36px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#7c3aed';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  color: '#9ca3af'
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
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
                onClick={() => setShowParameterModal(true)}
              >
                Select Parameters
              </button>
            </div>
          </div>

          {/* Functional Scope Header and Select Level View */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#fff'
          }}>
            <h1 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: '#111827',
              margin: 0
            }}>
              Functional Scope
            </h1>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '14px', color: '#4B5563' }}>Select Level View</span>

                <div style={{
                  position: 'relative',
                  width: '100px',
                  height: '4px',
                  backgroundColor: '#E5E7EB',
                  borderRadius: '2px'
                }}>
                  <div style={{
                    width: `${(selectedLevel) / 5 * 100}%`,
                    height: '4px',
                    backgroundColor: '#2563eb',
                    borderRadius: '2px',
                    transition: 'width 0.3s'
                  }} />
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      style={{
                        border: 'none',
                        background: 'none',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: selectedLevel === level ? '600' : '400',
                        color: selectedLevel === level ? '#2563eb' : '#111827',
                        padding: '2px 4px'
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Multi-column layout */}
          {(() => {
            const columns = [1, 2, 3, 4, 5];
            
            return (
              <div style={{
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden',
                padding: 0,
                margin: '24px',
                border: '1px solid #e5e7eb',
                borderRadius: 0,
                background: '#fff',
                boxShadow: 'none',
                minHeight: '520px',
                maxHeight: '520px',
                width: 'calc(100% - 48px)',
              }}>
                {columns.map((level, idx) => renderLevelColumn(level, idx, columns.length))}
              </div>
            );
          })()}

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
                       onClick={() => setProceedToDecisionCriteria(true)}
          >
            Save & Proceed
          </button>
        </div>
      </div>

      {/* Parameter Modal */}
      {showParameterModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            width: '400px',
            maxWidth: '90%',
            padding: '24px',
            position: 'relative',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{
              marginBottom: '16px',
              fontSize: '18px',
              fontWeight: '600',
              borderBottom: '1px solid #eee',
              paddingBottom: '12px'
            }}>
              Select Parameters
              <button onClick={() => setShowParameterModal(false)} style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#6b7280'
              }}>&times;</button>
            </h2>

            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#7c3aed' }}>
                Process Granularity
              </div>
              {[1, 2, 3, 4, 5].map((level) => (
                <label key={level} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', fontSize: '14px' }}>
                  <input
                    type="radio"
                    name="parameterLevel"
                    value={level}
                    checked={parameterLevel === level}
                    onChange={() => setParameterLevel(level)}
                    style={{ marginRight: '8px' }}
                  />
                  Level {level}
                </label>
              ))}
            </div>

            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <button
                onClick={() => {
                  setSelectedLevel(parameterLevel);
                  setShowParameterModal(false);
                }}
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
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FunctionalScope;




