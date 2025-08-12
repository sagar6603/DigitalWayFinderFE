import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FunctionalScope.css';

// Dummy data to replace API calls
const dummyFunctionalScopeData = [
  // Level 1: Order Management
  {
    l1: 'Order Management',
    l2: 'Order Processing',
    l3: 'Order Creation',
    l4: 'Manual Order Entry'
  },
  {
    l1: 'Order Management',
    l2: 'Order Processing',
    l3: 'Order Creation',
    l4: 'Bulk Order Import'
  },
  {
    l1: 'Order Management',
    l2: 'Order Processing',
    l3: 'Order Validation',
    l4: 'Inventory Check'
  },
  {
    l1: 'Order Management',
    l2: 'Order Processing',
    l3: 'Order Validation',
    l4: 'Credit Verification'
  },
  {
    l1: 'Order Management',
    l2: 'Order Fulfillment',
    l3: 'Pick Planning',
    l4: 'Wave Planning'
  },
  {
    l1: 'Order Management',
    l2: 'Order Fulfillment',
    l3: 'Pick Planning',
    l4: 'Pick Path Optimization'
  },
  // Level 1: Inventory Management
  {
    l1: 'Inventory Management',
    l2: 'Stock Control',
    l3: 'Receiving',
    l4: 'Inbound Processing'
  },
  {
    l1: 'Inventory Management',
    l2: 'Stock Control',
    l3: 'Receiving',
    l4: 'Quality Control'
  },
  {
    l1: 'Inventory Management',
    l2: 'Stock Control',
    l3: 'Put-away',
    l4: 'Location Assignment'
  },
  {
    l1: 'Inventory Management',
    l2: 'Stock Control',
    l3: 'Put-away',
    l4: 'Slotting Optimization'
  },
  {
    l1: 'Inventory Management',
    l2: 'Cycle Counting',
    l3: 'Count Planning',
    l4: 'ABC Classification'
  },
  {
    l1: 'Inventory Management',
    l2: 'Cycle Counting',
    l3: 'Count Execution',
    l4: 'Mobile Counting'
  },
  // Level 1: Shipping Management
  {
    l1: 'Shipping Management',
    l2: 'Carrier Integration',
    l3: 'Rate Shopping',
    l4: 'Multi-carrier Rating'
  },
  {
    l1: 'Shipping Management',
    l2: 'Carrier Integration',
    l3: 'Label Generation',
    l4: 'Automated Printing'
  },
  {
    l1: 'Shipping Management',
    l2: 'Load Planning',
    l3: 'Container Loading',
    l4: 'Load Optimization'
  },
  {
    l1: 'Shipping Management',
    l2: 'Load Planning',
    l3: 'Route Planning',
    l4: 'Delivery Scheduling'
  },
  // Level 1: Reporting & Analytics
  {
    l1: 'Reporting & Analytics',
    l2: 'Operational Reports',
    l3: 'Performance Metrics',
    l4: 'KPI Dashboard'
  },
  {
    l1: 'Reporting & Analytics',
    l2: 'Operational Reports',
    l3: 'Inventory Reports',
    l4: 'Stock Level Analysis'
  },
  {
    l1: 'Reporting & Analytics',
    l2: 'Business Intelligence',
    l3: 'Trend Analysis',
    l4: 'Demand Forecasting'
  },
  {
    l1: 'Reporting & Analytics',
    l2: 'Business Intelligence',
    l3: 'Cost Analysis',
    l4: 'Labor Cost Tracking'
  },
  // --- Additional dummy data for Level 3 and Level 4 ---
  {
    l1: 'Order Management',
    l2: 'Order Fulfillment',
    l3: 'Shipping',
    l4: 'Express Shipping'
  },
  {
    l1: 'Order Management',
    l2: 'Order Fulfillment',
    l3: 'Shipping',
    l4: 'Standard Shipping'
  },
  {
    l1: 'Inventory Management',
    l2: 'Stock Control',
    l3: 'Inventory Adjustment',
    l4: 'Manual Adjustment'
  },
  {
    l1: 'Inventory Management',
    l2: 'Stock Control',
    l3: 'Inventory Adjustment',
    l4: 'Automated Adjustment'
  },
  {
    l1: 'Shipping Management',
    l2: 'Carrier Integration',
    l3: 'Tracking',
    l4: 'Real-time Tracking'
  },
  {
    l1: 'Shipping Management',
    l2: 'Carrier Integration',
    l3: 'Tracking',
    l4: 'Batch Tracking'
  },
  {
    l1: 'Reporting & Analytics',
    l2: 'Business Intelligence',
    l3: 'Data Mining',
    l4: 'Pattern Recognition'
  },
  {
    l1: 'Reporting & Analytics',
    l2: 'Business Intelligence',
    l3: 'Data Mining',
    l4: 'Anomaly Detection'
  }
];

const FunctionalScope = () => {
  const navigate = useNavigate();
  const [functionalScopeData, setFunctionalScopeData] = useState([]);
  const [levelSelections, setSelectedPath] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [showParameterModal, setShowParameterModal] = useState(false);
  const [parameterLevel, setParameterLevel] = useState(1);

  useEffect(() => {
    // Simulate API call with dummy data
    async function loadDummyData() {
      setLoading(true);
      setError(null);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setFunctionalScopeData(dummyFunctionalScopeData);
      } catch (err) {
        setError('Failed to load functional scope data.');
      } finally {
        setLoading(false);
      }
    }
    loadDummyData();
  }, []);

  // Check if user has selected from all 4 levels
  const hasAllLevelsSelected = () => {
    return [1, 2, 3, 4].every(level => {
      const levelKey = `l${level}`;
      return levelSelections[levelKey] && levelSelections[levelKey].length > 0;
    });
  };

  // Get the maximum level that should be visible based on selections
  const getMaxVisibleLevel = () => {
    for (let level = 1; level <= 4; level++) {
      const levelKey = `l${level}`;
      if (!levelSelections[levelKey] || levelSelections[levelKey].length === 0) {
        return level; // Return the first level without selections
      }
    }
    return 4; // All levels have selections
  };

  // Check if a level should be enabled (visible and clickable)
  const isLevelEnabled = (level) => {
    if (level === 1) return true; // Level 1 is always enabled
   
    // Check if previous level has selections
    const prevLevelKey = `l${level - 1}`;
    return levelSelections[prevLevelKey] && levelSelections[prevLevelKey].length > 0;
  };

  // Check if a level should be visible
  const isLevelVisible = (level) => {
    return level <= getMaxVisibleLevel();
  };

  // Modified function for handling Save & Proceed without API call
  const handleSaveAndProceed = async () => {
    try {
      // Validate that user has made selections
      if (!hasAllLevelsSelected()) {
        setError('Please select at least one option from each level before proceeding.');
        setTimeout(() => setError(null), 3000);
        return;
      }

      setLoading(true);

      // Prepare data for storage (no API call)
      const functionalScopeData = {
        selectedItems,
        levelSelections,
        searchQuery,
        selectedLevel,
        timestamp: new Date().toISOString()
      };

      console.log('Saving data locally:', {
        selectedItems,
        levelSelections,
        searchQuery,
        selectedLevel,
        timestamp: new Date().toISOString()
      });

      // Simulate save delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate to Non Functional Scope page and pass data
      navigate('/decision-tree/non-functional-scope', { 
        state: { 
          fromFunctionalScope: true,
          selectedData: functionalScopeData
        }
      });

    } catch (error) {
      console.error('Error saving data:', error);
      setError('Failed to save data. Please try again.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  // Filter data based on search query
  const getFilteredData = () => {
    if (!searchQuery) return functionalScopeData;
   
    return functionalScopeData.filter(item =>
      Object.values(item).some(value =>
        value.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };

  // Get unique items for a specific level based on selected path
  const getLevelItems = (level) => {
    const filteredData = getFilteredData();
    if (!filteredData || filteredData.length === 0) return [];
   
    let levelData = filteredData;
   
    // Filter based on selected path up to the previous level
    for (let i = 1; i < level; i++) {
      const levelKey = `l${i}`;
      const selectedForLevel = levelSelections[levelKey];
     
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

  // Helper function to get the highest level with selections
  const getHighestSelectedLevel = () => {
    for (let level = 4; level >= 1; level--) {
      const levelKey = `l${level}`;
      if (levelSelections[levelKey] && levelSelections[levelKey].length > 0) {
        return level;
      }
    }
    return 1; // Default to level 1 if no selections
  };

  const handleItemSelect = (item, level) => {
    const levelKey = `l${level}`;
    const newSelectedPath = { ...levelSelections };
   
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
    for (let i = level + 1; i <= 4; i++) {
      delete newSelectedPath[`l${i}`];
    }
   
    setSelectedPath(newSelectedPath);
   
    // Auto-advance logic - move to next level when selecting (if not last level)
    if (currentSelections.length > 0 && level < 4) {
      setSelectedLevel(level + 1);
    } else if (currentSelections.length === 0 && level > 1) {
      // Move backward when deselecting - go to previous level
      setSelectedLevel(level - 1);
    }
   
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
    }
   
    return numberParts.join('.');
  };

  const renderLevelColumn = (level, idx, totalColumns = 4) => {
    const levelItems = getLevelItems(level);
    const levelKey = `l${level}`;
    const isLevelActive = level === 1 || (levelSelections[`l${level - 1}`] && levelSelections[`l${level - 1}`].length > 0);

    return (
      <div
        key={level}
        className={`column ${isLevelActive ? 'active' : 'inactive'}`}
      >
        <div className="column-header">
          <h3 className="column-title">
            LEVEL {level} PROCESS
          </h3>
          {levelSelections[levelKey] && levelSelections[levelKey].length > 0 && (
            <div className="column-selected">
              {levelSelections[levelKey].length} selected
            </div>
          )}
        </div>

        <div className="column-content">
          {!isLevelActive ? (
            <div className="column-placeholder">
              Select from Level {level - 1} to view options
            </div>
          ) : loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Loading...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <div className="error-title">Error</div>
              <div className="error-message">{error}</div>
            </div>
          ) : levelItems.length === 0 ? (
            <div className="no-items">
              No items available
            </div>
          ) : (
            <div className="items-container">
              {level === 1 ? (
                <>
                  {getLevelItems(1).map((item, idx) => {
                    const isSelected = selectedItems.includes(item.id);
                    const itemNumber = getItemNumber(1, item);
                    return (
                      <div
                        key={item.id}
                        className="item"
                        style={{ minHeight: '48px', display: 'flex', alignItems: 'center' }}
                        onClick={() => handleItemSelect(item, 1)}
                      >
                        <div className="item-content">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => handleCheckboxChange(item, 1, e)}
                            className="item-checkbox"
                          />
                          <div className="item-text-container">
                            <div className="item-text">
                              {itemNumber} {item.name}
                            </div>
                          </div>
                        </div>
                        {/* Removed More Information Button */}
                      </div>
                    );
                  })}
                </>
              ) : level === 2 ? (
                <>
                  {getLevelItems(1).map((parentItem, idx) => {
                    const children = getLevelItems(2).filter(
                      child => child.fullItem.l1 === parentItem.name
                    );
                    return (
                      <div key={parentItem.id + '-group'}>
                        {children.length === 0 ? (
                          <div style={{ minHeight: '48px' }}></div>
                        ) : (
                          children.map((item, cidx) => {
                            const isSelected = selectedItems.includes(item.id);
                            const itemNumber = getItemNumber(2, item);
                            return (
                              <div
                                key={item.id}
                                className="item"
                                style={{ minHeight: '48px', display: 'flex', alignItems: 'center' }}
                                onClick={() => handleItemSelect(item, 2)}
                              >
                                <div className="item-content">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={(e) => handleCheckboxChange(item, 2, e)}
                                    className="item-checkbox"
                                  />
                                  <div className="item-text-container">
                                    <div className="item-text">
                                      {itemNumber} {item.name}
                                    </div>
                                  </div>
                                </div>
                                {/* Removed More Information Button */}
                              </div>
                            );
                          })
                        )}
                      </div>
                    );
                  })}
                </>
              ) : (
                // Default rendering for other levels
                levelItems.map((item, index) => {
                  const isSelected = selectedItems.includes(item.id);
                  const itemNumber = getItemNumber(level, item);
                  return (
                    <div
                      key={item.id}
                      className="item"
                      onClick={() => handleItemSelect(item, level)}
                    >
                      <div className="item-content">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleCheckboxChange(item, level, e)}
                          className="item-checkbox"
                        />
                        <div className="item-text-container">
                          <div className="item-text">
                            {itemNumber} {item.name}
                          </div>
                        </div>
                      </div>
                      {/* Removed More Information Button */}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="functional-scope-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <div className="breadcrumb-content">
          <span className="breadcrumb-link" style={{ color: '#0036C9' }}>Home</span>
          <span>›</span>
          <span className="breadcrumb-link " style={{ color: '#0036C9' }}>Decision Tree</span>
          <span>›</span>
          <span className="breadcrumb-current">Functional Scope</span>
        </div>
      </div>

      <div className="main-layout">
        {/* Left Sidebar Box */}
        <div className="left-sidebar">
          <h2 className="sidebar-title">Functional Scope</h2>
          <p className="sidebar-description">
            Structured framework for selecting functional requirements,
            prioritising them based on different measures for informed decision-making.
          </p>

          {/* Vertical line connecting all steps */}
          <div className="step-line"></div>

          {/* Step indicators */}
          <div className="steps-container">
            <div className="step-item">
              <div className="step-circle active">1</div>
              <span className="step-text active">Functional Scope</span>
            </div>
           
            <div className="step-item">
              <div className="step-circle inactive">2</div>
              <span className="step-text inactive">Non Functional</span>
            </div>
           
            <div className="step-item">
              <div className="step-circle inactive">3</div>
              <span className="step-text inactive">Decision Criteria</span>
            </div>
           
            <div className="step-item">
              <div className="step-circle inactive">4</div>
              <span className="step-text inactive">Solution</span>
            </div>
          </div>
        </div>

        {/* Main Content Box */}
        <div className="main-content">
          {/* Header with search and parameters */}
          <div className="content-header">
            {/* Search Bar */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="#8b5cf6"
                className="search-icon"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>

            <div className="header-buttons">
              <button
                className="parameter-button"
                onClick={() => setShowParameterModal(true)}
              >
                Select Parameters
              </button>
            </div>
          </div>

          {/* Functional Scope Header and Select Level View */}
          <div className="title-section">
            <h1 className="page-title">Functional Scope</h1>

            <div className="level-controls">
              <div className="level-control-row">
                <span className="level-label">Select Level View</span>

                <div className="level-progress">
                  <div
                    className="level-progress-fill"
                    style={{ width: `${(getHighestSelectedLevel()) / 4 * 100}%` }}
                  />
                </div>

                <div className="level-buttons">
                  {[1, 2, 3, 4].map((level) => {
                    // Check if this level should be enabled
                    const isLevelEnabled = level === 1 || (levelSelections[`l${level - 1}`] && levelSelections[`l${level - 1}`].length > 0);
                    const hasSelections = levelSelections[`l${level}`] && levelSelections[`l${level}`].length > 0;
                   
                    return (
                      <button
                        key={level}
                        onClick={() => isLevelEnabled ? setSelectedLevel(level) : null}
                        className={`level-button ${selectedLevel === level ? 'active' : 'inactive'} ${!isLevelEnabled ? 'disabled' : ''}`}
                        disabled={!isLevelEnabled}
                        style={{
                          opacity: isLevelEnabled ? 1 : 0.4,
                          cursor: isLevelEnabled ? 'pointer' : 'not-allowed',
                          backgroundColor: selectedLevel === level ? '#8b5cf6' : (hasSelections ? '#e5e7eb' : '#f3f4f6'),
                          color: selectedLevel === level ? 'white' : (hasSelections ? '#374151' : '#9ca3af')
                        }}
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Multi-column layout */}
          <div className="aligned-columns-container">
            {getLevelItems(1).map((parentItem, idx) => {
              const isParentSelected = selectedItems.includes(parentItem.id);
              const parentNumber = getItemNumber(1, parentItem);

              // Find children for this parent in level 2
              const children = getLevelItems(2).filter(
                child => child.fullItem.l1 === parentItem.name
              );

              return (
                <div className="aligned-row" key={parentItem.id} style={{ display: 'flex', alignItems: 'center', minHeight: '48px' }}>
                  {/* Level 1 cell */}
                  <div className="column item" style={{ flex: 1 }}>
                    <div className="item-content">
                      <input
                        type="checkbox"
                        checked={isParentSelected}
                        onChange={(e) => handleCheckboxChange(parentItem, 1, e)}
                        className="item-checkbox"
                      />
                      <div className="item-text-container">
                        <div className="item-text">
                          {parentNumber} {parentItem.name}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Level 2 cell(s) */}
                  <div className="column" style={{ flex: 2, display: 'flex' }}>
                    {children.length === 0 ? (
                      <div style={{ minHeight: '48px', flex: 1 }}></div>
                    ) : (
                      children.map(childItem => {
                        const isChildSelected = selectedItems.includes(childItem.id);
                        const childNumber = getItemNumber(2, childItem);
                        return (
                          <div
                            key={childItem.id}
                            className="item"
                            style={{ minWidth: '220px', display: 'flex', alignItems: 'center' }}
                            onClick={() => handleItemSelect(childItem, 2)}
                          >
                            <div className="item-content">
                              <input
                                type="checkbox"
                                checked={isChildSelected}
                                onChange={(e) => handleCheckboxChange(childItem, 2, e)}
                                className="item-checkbox"
                              />
                              <div className="item-text-container">
                                <div className="item-text">
                                  {childNumber} {childItem.name}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                  {/* You can add more columns for level 3, 4 similarly */}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="save-proceed-container" style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: '20px',
        paddingRight: '20px'
      }}>
        <button
          className={`proceed-button ${hasAllLevelsSelected() ? 'enabled' : 'disabled'}`}
          onClick={handleSaveAndProceed}
          disabled={loading || !hasAllLevelsSelected()}
          style={{
            backgroundColor: hasAllLevelsSelected() ? '#8bcf6' : '#e5e7eb',
            color: hasAllLevelsSelected() ? 'white' : '#9ca3af',
            cursor: hasAllLevelsSelected() ? 'pointer' : 'not-allowed',
            opacity: hasAllLevelsSelected() ? 1 : 0.6
          }}
        >
          {loading ? 'Saving...' : 'Save & Proceed'}
        </button>
      </div>

      {/* Parameter Modal */}
      {showParameterModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-header">
              Select Parameters
              <button
                onClick={() => setShowParameterModal(false)}
                className="modal-close"
              >
                &times;
              </button>
            </h2>

            <div>
              <div className="modal-section-title">Process Granularity</div>
              {[1, 2, 3, 4].map((level) => {
                // For parameter modal: Level 1 is always enabled, others need previous level selections
                const isParameterLevelEnabled = level === 1 || (levelSelections[`l${level - 1}`] && levelSelections[`l${level - 1}`].length > 0);

                return (
                  <label
                    key={level}
                    className={`modal-option ${!isParameterLevelEnabled ? 'disabled' : ''}`}
                    style={{
                      opacity: isParameterLevelEnabled ? 1 : 0.4,
                      cursor: isParameterLevelEnabled ? 'pointer' : 'not-allowed'
                    }}
                  >
                    <input
                      type="radio"
                      name="parameterLevel"
                      value={level}
                      checked={parameterLevel === level}
                      onChange={() => isParameterLevelEnabled ? setParameterLevel(level) : null}
                      disabled={!isParameterLevelEnabled}
                      className="modal-radio"
                    />
                    Level {level}
                  </label>
                );
              })}
            </div>

            <div className="modal-footer">
              <button
                onClick={() => {
                  setSelectedLevel(parameterLevel);
                  setShowParameterModal(false);
                }}
                className="modal-save-button"
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