import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './FuncAreaPage.css';

// Import icons
import supplyChainPlanningImg from '../../assets/supply-chain-planning.png';
import supplyChainFulfillmentImg from '../../assets/supply-chain-fulfillment.png';
import dashboardImage from "../../assets/dashboard.png";

function FuncAreaPage() {
  const [selectedArea, setSelectedArea] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [projectType, setProjectType] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Get project data from navigation state
  useEffect(() => {
    if (location.state) {
      setProjectData(location.state.projectData);
      setProjectType(location.state.projectType);
    }
  }, [location.state]);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
  };

  const showTooltip = (area) => {
    if (!isMobile) {
      setTooltipVisible(area);
    }
  };

  const hideTooltip = () => {
    if (!isMobile) {
      setTooltipVisible(null);
    }
  };

  const toggleTooltip = (area) => {
    if (isMobile) {
      setTooltipVisible(tooltipVisible === area ? null : area);
    }
  };

  const handleProceed = () => {
    if (selectedArea === 'supply-chain-planning') {
      navigate('/decision-tree/industry-type-plannd', {
        state: {
          selectedArea,
          projectData,
          projectType
        }
      });
    } else if (selectedArea === 'supply-chain-fulfillment') {
      navigate('/decision-tree/industry-type-func', {
        state: {
          selectedArea,
          projectData,
          projectType
        }
      });
    }
  };

  const tooltipContent = {
    'supply-chain-planning': 'Supply chain planning strategically balances supply and demand to optimize the flow of goods, services, and information from source to customer. Aligns supply, demand, and financial plans to drive strategic decision-making.',
    'supply-chain-fulfillment': 'Supply chain fulfillment focuses on the execution of orders and delivery to customers. It encompasses warehousing, order processing, inventory management, and logistics to ensure accurate and timely delivery.'
  };

  return (
    <div className="functional-area-page">
      <div className="breadcrumb">
        <Link to="/">Home</Link> &gt; <span>Decision Tree</span>
      </div>

      <div className="tabs">
        <div className="tab">PROJECT INFORMATION</div>
        <div className="tab active">SUB-FUNCTIONAL AREA</div>
        <div className="tab">INDUSTRY TYPE</div>
      </div>

      <div className="content-area">
        <div className="content-left">
          <h1>Select a Functional Area</h1>
          <p className="subtitle">Begin by choosing a key area</p>

          {/* Display project information if available */}
          {projectData && (
            <div className="project-summary">
              <p><strong>Project:</strong> {projectData.clientName} ({projectType})</p>
            </div>
          )}

          <div className="area-cards">
            <div
              className={`area-card ${selectedArea === 'supply-chain-planning' ? 'selected' : ''}`}
              onClick={() => handleAreaSelect('supply-chain-planning')}
            >
              <div className="card-content">
                <div className="card-image">
                  <img src={supplyChainPlanningImg} alt="Supply Chain Planning" />
                </div>
                <div className="card-text">
                  <h3>Supply Chain Planning</h3>
                  <p>The process of optimizing the flow of goods and resources to meet demand efficiently.</p>
                </div>
              </div>
              <div className="info-icon">
                <div
                  className="tooltip-wrapper"
                  onMouseEnter={() => showTooltip('supply-chain-planning')}
                  onMouseLeave={hideTooltip}
                  onClick={() => toggleTooltip('supply-chain-planning')}
                  tabIndex={-1} // Remove from tab order
                  style={{ outline: 'none' }} // Remove focus outline
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true" focusable="false" style={{ pointerEvents: 'none' }}>
                    <circle cx="12" cy="12" r="10" stroke="#666" strokeWidth="2" />
                    <rect x="11.25" y="7" width="1.5" height="1.5" rx="0.75" fill="#666" />
                    <rect x="11.25" y="10" width="1.5" height="7" rx="0.75" fill="#666" />
                  </svg>
                  {tooltipVisible === 'supply-chain-planning' && (
                    <div className="tooltip" style={{
                      position: 'absolute',
                      left: 'calc(100% + 16px)', // 16px gap to the right of the icon
                      top: '50%',
                      transform: 'translateY(-50%)',
                      minWidth: '320px',
                      background: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                      padding: '20px 24px',
                      zIndex: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      fontSize: '16px',
                      fontWeight: 400
                    }}>
                      <div className="tooltip-header" style={{
                        fontWeight: 600,
                        fontSize: '18px',
                        marginBottom: '8px',
                        color: '#111827',
                        borderBottom: '1px solid #e5e7eb',
                        paddingBottom: '8px'
                      }}>
                        Supply Chain Planning
                      </div>
                      <div className="tooltip-content" style={{ color: '#222', fontSize: '15px', marginTop: '8px' }}>
                        A centralized platform to track, control, and automate the order process across multiple sales channels, warehouses, and customer touchpoints.
                      </div>
                      <div style={{
                        position: 'absolute',
                        left: '-12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 0,
                        height: 0,
                        borderTop: '8px solid transparent',
                        borderBottom: '8px solid transparent',
                        borderRight: '12px solid #fff',
                        filter: 'drop-shadow(-1px 0 1px #e5e7eb)'
                      }} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div
              className={`area-card ${selectedArea === 'supply-chain-fulfillment' ? 'selected' : ''}`}
              onClick={() => handleAreaSelect('supply-chain-fulfillment')}
            >
              <div className="card-content">
                <div className="card-image">
                  <img src={supplyChainFulfillmentImg} alt="Supply Chain Fulfillment" />
                </div>
                <div className="card-text">
                  <h3>Supply Chain Fulfillment</h3>
                  <p>The process of delivering orders to customers accurately and on time.</p>
                </div>
              </div>
              <div className="info-icon">
                <div
                  className="tooltip-wrapper"
                  onMouseEnter={() => showTooltip('supply-chain-fulfillment')}
                  onMouseLeave={hideTooltip}
                  onClick={() => toggleTooltip('supply-chain-fulfillment')}
                  tabIndex={-1} // Remove from tab order
                  style={{ outline: 'none' }} // Remove focus outline
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true" focusable="false" style={{ pointerEvents: 'none' }}>
                    <circle cx="12" cy="12" r="10" stroke="#666" strokeWidth="2" />
                    <rect x="11.25" y="7" width="1.5" height="1.5" rx="0.75" fill="#666" />
                    <rect x="11.25" y="10" width="1.5" height="7" rx="0.75" fill="#666" />
                  </svg>
                  {tooltipVisible === 'supply-chain-fulfillment' && (
                    <div className="tooltip" style={{
                      position: 'absolute',
                      left: 'calc(100% + 16px)', // 16px gap to the right of the icon
                      top: '50%',
                      transform: 'translateY(-50%)',
                      minWidth: '320px',
                      background: '#fff',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                      padding: '20px 24px',
                      zIndex: 100,
                      display: 'flex',
                      flexDirection: 'column',
                      fontSize: '16px',
                      fontWeight: 400
                    }}>
                      <div className="tooltip-header" style={{
                        fontWeight: 600,
                        fontSize: '18px',
                        marginBottom: '8px',
                        color: '#111827',
                        borderBottom: '1px solid #e5e7eb',
                        paddingBottom: '8px'
                      }}>
                        Supply Chain Fulfillment
                      </div>
                      <div className="tooltip-content" style={{ color: '#222', fontSize: '15px', marginTop: '8px' }}>
                        Supply chain fulfillment focuses on the execution of orders and delivery to customers. It encompasses warehousing, order processing, inventory management, and logistics to ensure accurate and timely delivery.
                      </div>
                      <div style={{
                        position: 'absolute',
                        left: '-12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 0,
                        height: 0,
                        borderTop: '8px solid transparent',
                        borderBottom: '8px solid transparent',
                        borderRight: '12px solid #fff',
                        filter: 'drop-shadow(-1px 0 1px #e5e7eb)'
                      }} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional functional areas can be added here */}
          </div>

          <div className="progress-footer">
            <div className="progress-text">Completed step 1 of 3</div>
            <button
              className="finish-button"
              disabled={!selectedArea}
              onClick={handleProceed}
            >
              Proceed
            </button>
          </div>
        </div>

        <div className="content-right">
          <div className="preview-container">
            <img
              src={dashboardImage}
              alt="Dashboard Preview"
              className="dashboard-preview"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FuncAreaPage;