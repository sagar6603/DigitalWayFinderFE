// import React, { useState } from 'react';
// import { Home, ChevronRight, Info, BarChart3, GitCompare, Target, TrendingUp } from 'lucide-react';
// import styles from './Dashboard.module.css';

// const ExecutiveDashboard = () => {
//   const [showTooltip, setShowTooltip] = useState(false);

//   // Sample Power BI data - this will be replaced with actual Power BI embed
//   const samplePowerBIData = {
//     industryAgnostic: {
//       industry: "XXXXXXX",
//       function: "XXXXXXX"
//     },
//     wmsSystems: [
//       { name: "BY WMS", percentage: 94.2, color: "#9333EA" },
//       { name: "SAP WMS", percentage: 92.1, color: "#1E40AF" },
//       { name: "Manhattan WMS", percentage: 87.7, color: "#059669" },
//       { name: "Oracle WMS", percentage: 78.0, color: "#DC2626" },
//       { name: "Korber WMS", percentage: 71.6, color: "#374151" }
//     ],
//     decisionPoints: {
//       total: 128,
//       functional: 56,
//       nonFunctional: 79,
//       functionalCriteria: [
//         { name: "L0", count: 1 },
//         { name: "L1", count: 1 },
//         { name: "L2", count: 1 },
//         { name: "L3", count: 1 }
//       ],
//       nonFunctionalCriteria: [
//         { name: "Architecture", count: 1 },
//         { name: "Data", count: 1 },
//         { name: "Product Support", count: 1 },
//         { name: "Security", count: 1 }
//       ]
//     },
//     sankeyData: {
//       functional: [
//         { name: "BY WMS", value: 98.7 },
//         { name: "SAP WMS", value: 100.0 },
//         { name: "Manhattan WMS", value: 91.6 },
//         { name: "Oracle WMS", value: 91.2 },
//         { name: "Korber WMS", value: 83.6 }
//       ],
//       architecture: [
//         { name: "BY WMS", value: 96.1 },
//         { name: "SAP WMS", value: 100.0 },
//         { name: "Manhattan WMS", value: 88.9 },
//         { name: "Oracle WMS", value: 74.4 },
//         { name: "Korber WMS", value: 77.8 }
//       ]
//     }
//   };

//   const breadcrumbs = [
//     { label: "Home", href: "/", icon: Home },
//     { label: "Decision Tree", href: "/decision-tree" },
//     { label: "Functional Scope", href: "/functional-scope" },
//     { label: "Advance Dashboards", href: "/advance-dashboards" }
//   ];

//   const sidebarItems = [
//     { 
//       name: "Executive Dashboard", 
//       icon: BarChart3, 
//       active: true,
//       description: "To view key business data at a glance, helping to understand performance and make decisions."
//     },
//     { name: "Scorecard", icon: Target, active: false },
//     { name: "Detailed Comparison", icon: GitCompare, active: false },
//     { name: "Functional Fit", icon: TrendingUp, active: false }
//   ];

//   return (
//     <div className={styles['dashboard-container']}>
//       <div className="dashboard-layout">
//         {/* Sidebar */}
//         <div className={styles.sidebar}>
//           <div className="sidebar-content">
//             {sidebarItems.map((item, index) => (
//               <div key={index} className="sidebar-item-container">
//                 <div className={`sidebar-item ${item.active ? 'sidebar-item-active' : ''}`}>
//                   <item.icon className="sidebar-icon" />
//                   <span className="sidebar-label">{item.name}</span>
//                 </div>
                
//                 {item.active && item.description && showTooltip && (
//                   <div className="tooltip">
//                     <div className="tooltip-title">{item.name}</div>
//                     <div className="tooltip-description">{item.description}</div>
//                     <div className="tooltip-arrow"></div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="main-content">
//           {/* Breadcrumbs */}
//           <div className="breadcrumbs">
//             {breadcrumbs.map((item, index) => (
//               <React.Fragment key={index}>
//                 <div className="breadcrumb-item">
//                   {index === 0 && <item.icon className="breadcrumb-icon" />}
//                   <a href={item.href} className={`breadcrumb-link ${index === 0 ? 'breadcrumb-home' : ''}`}>
//                     {item.label}
//                   </a>
//                 </div>
//                 {index < breadcrumbs.length - 1 && <ChevronRight className="breadcrumb-separator" />}
//               </React.Fragment>
//             ))}
//           </div>

//           {/* Dashboard Header */}
//           <div className="dashboard-header">
//             <div className="dashboard-title-container">
//               <h1 className="dashboard-title">Executive Dashboard</h1>
//               <button
//                 onMouseEnter={() => setShowTooltip(true)}
//                 onMouseLeave={() => setShowTooltip(false)}
//                 className="info-button"
//               >
//                 <Info className="info-icon" />
//               </button>
//             </div>
//             <button className="view-summary-btn">
//               View Summary
//             </button>
//           </div>

//           <div className="last-updated">
//             Last Updated on Mon 14-Apr-2025 , 2:50PM
//           </div>

//           {/* Power BI Content Area */}
//           <div className="powerbi-content">
//             {/* Top Row - Industry Agnostic and WMS Chart */}
//             <div className="content-row">
//               <div className="card industry-card">
//                 <div className="card-header">
//                   <div className="card-icon">
//                     <BarChart3 className="icon" />
//                   </div>
//                   <div>
//                     <h3 className="card-title">Industry Agnostic</h3>
//                     <div className="card-underline"></div>
//                   </div>
//                 </div>
//                 <div className="card-content">
//                   <div className="industry-info">
//                     Industry: <span className="industry-value">{samplePowerBIData.industryAgnostic.industry}</span>
//                   </div>
//                   <div className="industry-info">
//                     Function: <span className="industry-value">{samplePowerBIData.industryAgnostic.function}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="card wms-chart">
//                 <div className="wms-bars">
//                   {samplePowerBIData.wmsSystems.map((system, index) => (
//                     <div key={index} className="wms-bar-container">
//                       <div 
//                         className="wms-bar" 
//                         style={{ 
//                           backgroundColor: system.color,
//                           height: `${system.percentage}%`
//                         }}
//                       >
//                         <div className="wms-percentage">{system.percentage}%</div>
//                       </div>
//                       <div className="wms-label">{system.name}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Bottom Row - Decision Points and Sankey Chart */}
//             <div className="content-row">
//               <div className="card decision-card">
//                 <div className="card-header">
//                   <div className="card-icon-purple">
//                     <Target className="icon" />
//                   </div>
//                   <div>
//                     <h3 className="card-title">Decision Points</h3>
//                     <h4 className="decision-subtitle">Evaluated: {samplePowerBIData.decisionPoints.total}</h4>
//                     <div className="card-underline"></div>
//                   </div>
//                 </div>
                
//                 <div className="decision-content">
//                   <div className="decision-section">
//                     <h4 className="decision-section-title">Functional {samplePowerBIData.decisionPoints.functional}</h4>
//                     <div className="criteria-table">
//                       <div className="table-header">
//                         <span>Criteria</span>
//                         <span>Count</span>
//                       </div>
//                       {samplePowerBIData.decisionPoints.functionalCriteria.map((item, index) => (
//                         <div key={index} className="table-row">
//                           <span>{item.name}</span>
//                           <span>{item.count}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="decision-section">
//                     <h4 className="decision-section-title">Non-Functional {samplePowerBIData.decisionPoints.nonFunctional}</h4>
//                     <div className="criteria-table">
//                       <div className="table-header">
//                         <span>Criteria</span>
//                         <span>Count</span>
//                       </div>
//                       {samplePowerBIData.decisionPoints.nonFunctionalCriteria.map((item, index) => (
//                         <div key={index} className="table-row">
//                           <span>{item.name}</span>
//                           <span>{item.count}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <button className="view-weightages-btn">
//                   View Weightages
//                 </button>
//               </div>

//               <div className="card sankey-card">
//                 <div className="sankey-placeholder">
//                   <div className="sankey-flow">
//                     <div className="flow-column">
//                       <div className="flow-header">Functional</div>
//                       <div className="flow-items">
//                         {samplePowerBIData.sankeyData.functional.map((item, index) => (
//                           <div key={index} className="flow-item" style={{ backgroundColor: samplePowerBIData.wmsSystems[index]?.color }}>
//                             {item.value}%
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="flow-column">
//                       <div className="flow-header">Architecture</div>
//                       <div className="flow-items">
//                         {samplePowerBIData.sankeyData.architecture.map((item, index) => (
//                           <div key={index} className="flow-item" style={{ backgroundColor: samplePowerBIData.wmsSystems[index]?.color }}>
//                             {item.value}%
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="flow-column">
//                       <div className="flow-header">Data</div>
//                       <div className="flow-items">
//                         <div className="flow-item" style={{ backgroundColor: "#9333EA" }}>77.8%</div>
//                         <div className="flow-item" style={{ backgroundColor: "#1E40AF" }}>100.0%</div>
//                         <div className="flow-item" style={{ backgroundColor: "#059669" }}>100.0%</div>
//                         <div className="flow-item" style={{ backgroundColor: "#DC2626" }}>100.0%</div>
//                         <div className="flow-item" style={{ backgroundColor: "#374151" }}>88.8%</div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="sankey-legend">
//                     <div className="legend-item"><div className="legend-color" style={{ backgroundColor: "#9333EA" }}></div>BY WMS</div>
//                     <div className="legend-item"><div className="legend-color" style={{ backgroundColor: "#374151" }}></div>Korber WMS</div>
//                     <div className="legend-item"><div className="legend-color" style={{ backgroundColor: "#059669" }}></div>Manhattan WMS</div>
//                     <div className="legend-item"><div className="legend-color" style={{ backgroundColor: "#DC2626" }}></div>Oracle WMS</div>
//                     <div className="legend-item"><div className="legend-color" style={{ backgroundColor: "#1E40AF" }}></div>SAP WMS</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExecutiveDashboard;

import React, { useState } from 'react';
import {
  Home,
  ChevronRight,
  Info,
  BarChart3,
  GitCompare,
  Target,
  TrendingUp
} from 'lucide-react';
import styles from './Dashboard.module.css';

const ExecutiveDashboard = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const samplePowerBIData = {
    industryAgnostic: {
      industry: "XXXXXXX",
      function: "XXXXXXX"
    },
    wmsSystems: [
      { name: "BY WMS", percentage: 94.2, color: "#9333EA" },
      { name: "SAP WMS", percentage: 92.1, color: "#1E40AF" },
      { name: "Manhattan WMS", percentage: 87.7, color: "#059669" },
      { name: "Oracle WMS", percentage: 78.0, color: "#DC2626" },
      { name: "Korber WMS", percentage: 71.6, color: "#374151" }
    ],
    decisionPoints: {
      total: 128,
      functional: 56,
      nonFunctional: 79,
      functionalCriteria: [
        { name: "L0", count: 1 },
        { name: "L1", count: 1 },
        { name: "L2", count: 1 },
        { name: "L3", count: 1 }
      ],
      nonFunctionalCriteria: [
        { name: "Architecture", count: 1 },
        { name: "Data", count: 1 },
        { name: "Product Support", count: 1 },
        { name: "Security", count: 1 }
      ]
    },
    sankeyData: {
      functional: [
        { name: "BY WMS", value: 98.7 },
        { name: "SAP WMS", value: 100.0 },
        { name: "Manhattan WMS", value: 91.6 },
        { name: "Oracle WMS", value: 91.2 },
        { name: "Korber WMS", value: 83.6 }
      ],
      architecture: [
        { name: "BY WMS", value: 96.1 },
        { name: "SAP WMS", value: 100.0 },
        { name: "Manhattan WMS", value: 88.9 },
        { name: "Oracle WMS", value: 74.4 },
        { name: "Korber WMS", value: 77.8 }
      ]
    }
  };

  const breadcrumbs = [
    { label: "Home", href: "/", icon: Home },
    { label: "Decision Tree", href: "/decision-tree" },
    { label: "Functional Scope", href: "/functional-scope" },
    { label: "Advance Dashboards", href: "/advance-dashboards" }
  ];

  const sidebarItems = [
    {
      name: "Executive Dashboard",
      icon: BarChart3,
      active: true,
      description: "To view key business data at a glance, helping to understand performance and make decisions."
    },
    { name: "Scorecard", icon: Target, active: false },
    { name: "Detailed Comparison", icon: GitCompare, active: false },
    { name: "Functional Fit", icon: TrendingUp, active: false }
  ];

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardLayout}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            {sidebarItems.map((item, index) => (
              <div key={index} className={styles.sidebarItemContainer}>
                <div className={`${styles.sidebarItem} ${item.active ? styles.sidebarItemActive : ''}`}>
                  <item.icon className={styles.sidebarIcon} />
                  <span className={styles.sidebarLabel}>{item.name}</span>
                </div>
                {item.active && item.description && showTooltip && (
                  <div className={styles.tooltip}>
                    <div className={styles.tooltipTitle}>{item.name}</div>
                    <div className={styles.tooltipDescription}>{item.description}</div>
                    <div className={styles.tooltipArrow}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.breadcrumbs}>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <div className={styles.breadcrumbItem}>
                  {index === 0 && <item.icon className={styles.breadcrumbIcon} />}
                  <a
                    href={item.href}
                    className={`${styles.breadcrumbLink} ${index === 0 ? styles.breadcrumbHome : ''}`}
                  >
                    {item.label}
                  </a>
                </div>
                {index < breadcrumbs.length - 1 && <ChevronRight className={styles.breadcrumbSeparator} />}
              </React.Fragment>
            ))}
          </div>

          <div className={styles.dashboardHeader}>
            <div className={styles.dashboardTitleContainer}>
              <h1 className={styles.dashboardTitle}>Executive Dashboard</h1>
              <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className={styles.infoButton}
              >
                <Info className={styles.infoIcon} />
              </button>
            </div>
            <button className={styles.viewSummaryBtn}>View Summary</button>
          </div>

          <div className={styles.lastUpdated}>
            Last Updated on Mon 14-Apr-2025 , 2:50PM
          </div>

          <div className={styles.powerbiContent}>
            <div className={styles.contentRow}>
              <div className={`${styles.card} ${styles.industryCard}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>
                    <BarChart3 className={styles.icon} />
                  </div>
                  <div>
                    <h3 className={styles.cardTitle}>Industry Agnostic</h3>
                    <div className={styles.cardUnderline}></div>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.industryInfo}>
                    Industry: <span className={styles.industryValue}>{samplePowerBIData.industryAgnostic.industry}</span>
                  </div>
                  <div className={styles.industryInfo}>
                    Function: <span className={styles.industryValue}>{samplePowerBIData.industryAgnostic.function}</span>
                  </div>
                </div>
              </div>

              <div className={`${styles.card} ${styles.wmsChart}`}>
                <div className={styles.wmsBars}>
                  {samplePowerBIData.wmsSystems.map((system, index) => (
                    <div key={index} className={styles.wmsBarContainer}>
                      <div
                        className={styles.wmsBar}
                        style={{
                          backgroundColor: system.color,
                          height: `${system.percentage}%`
                        }}
                      >
                        <div className={styles.wmsPercentage}>{system.percentage}%</div>
                      </div>
                      <div className={styles.wmsLabel}>{system.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.contentRow}>
              <div className={`${styles.card} ${styles.decisionCard}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIconPurple}>
                    <Target className={styles.icon} />
                  </div>
                  <div>
                    <h3 className={styles.cardTitle}>Decision Points</h3>
                    <h4 className={styles.decisionSubtitle}>Evaluated: {samplePowerBIData.decisionPoints.total}</h4>
                    <div className={styles.cardUnderline}></div>
                  </div>
                </div>

                <div className={styles.decisionContent}>
                  <div className={styles.decisionSection}>
                    <h4 className={styles.decisionSectionTitle}>Functional {samplePowerBIData.decisionPoints.functional}</h4>
                    <div className={styles.criteriaTable}>
                      <div className={styles.tableHeader}>
                        <span>Criteria</span>
                        <span>Count</span>
                      </div>
                      {samplePowerBIData.decisionPoints.functionalCriteria.map((item, index) => (
                        <div key={index} className={styles.tableRow}>
                          <span>{item.name}</span>
                          <span>{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.decisionSection}>
                    <h4 className={styles.decisionSectionTitle}>Non-Functional {samplePowerBIData.decisionPoints.nonFunctional}</h4>
                    <div className={styles.criteriaTable}>
                      <div className={styles.tableHeader}>
                        <span>Criteria</span>
                        <span>Count</span>
                      </div>
                      {samplePowerBIData.decisionPoints.nonFunctionalCriteria.map((item, index) => (
                        <div key={index} className={styles.tableRow}>
                          <span>{item.name}</span>
                          <span>{item.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button className={styles.viewWeightagesBtn}>View Weightages</button>
              </div>

              <div className={`${styles.card} ${styles.sankeyCard}`}>
                <div className={styles.sankeyPlaceholder}>
                  <div className={styles.sankeyFlow}>
                    <div className={styles.flowColumn}>
                      <div className={styles.flowHeader}>Functional</div>
                      <div className={styles.flowItems}>
                        {samplePowerBIData.sankeyData.functional.map((item, index) => (
                          <div
                            key={index}
                            className={styles.flowItem}
                            style={{ backgroundColor: samplePowerBIData.wmsSystems[index]?.color }}
                          >
                            {item.value}%
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={styles.flowColumn}>
                      <div className={styles.flowHeader}>Architecture</div>
                      <div className={styles.flowItems}>
                        {samplePowerBIData.sankeyData.architecture.map((item, index) => (
                          <div
                            key={index}
                            className={styles.flowItem}
                            style={{ backgroundColor: samplePowerBIData.wmsSystems[index]?.color }}
                          >
                            {item.value}%
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={styles.flowColumn}>
                      <div className={styles.flowHeader}>Data</div>
                      <div className={styles.flowItems}>
                        <div className={styles.flowItem} style={{ backgroundColor: "#9333EA" }}>77.8%</div>
                        <div className={styles.flowItem} style={{ backgroundColor: "#1E40AF" }}>100.0%</div>
                        <div className={styles.flowItem} style={{ backgroundColor: "#059669" }}>100.0%</div>
                        <div className={styles.flowItem} style={{ backgroundColor: "#DC2626" }}>100.0%</div>
                        <div className={styles.flowItem} style={{ backgroundColor: "#374151" }}>88.8%</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.sankeyLegend}>
                    <div className={styles.legendItem}><div className={styles.legendColor} style={{ backgroundColor: "#9333EA" }}></div>BY WMS</div>
                    <div className={styles.legendItem}><div className={styles.legendColor} style={{ backgroundColor: "#374151" }}></div>Korber WMS</div>
                    <div className={styles.legendItem}><div className={styles.legendColor} style={{ backgroundColor: "#059669" }}></div>Manhattan WMS</div>
                    <div className={styles.legendItem}><div className={styles.legendColor} style={{ backgroundColor: "#DC2626" }}></div>Oracle WMS</div>
                    <div className={styles.legendItem}><div className={styles.legendColor} style={{ backgroundColor: "#1E40AF" }}></div>SAP WMS</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
