// import React, { useState } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';
// import './DecisionCriteria.css';

// const initialCriteria = [
//   { id: 1, label: "Functional", priority: "Critical", inScope: true },
//   { id: 2, label: "Non-Functional", priority: "Critical", inScope: true },
// ];

// const DecisionCriteria = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [criteria, setCriteria] = useState(initialCriteria);
//   const [expanded, setExpanded] = useState({});

//   // Get data passed from previous page
//   const { fromNonFunctionalScope, selectedData } = location.state || {};

//   const handlePriorityChange = (id, value) => {
//     setCriteria((prev) =>
//       prev.map((c) =>
//         c.id === id ? { ...c, priority: value } : c
//       )
//     );
//   };

//   const handleInScopeChange = (id, checked) => {
//     setCriteria((prev) =>
//       prev.map((c) =>
//         c.id === id ? { ...c, inScope: checked } : c
//       )
//     );
//   };

//   const toggleExpand = (id) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const handlePrevious = () => {
//     navigate('/decision-tree/non-functional-scope');
//   };

//   const handleProceed = () => {
//     navigate('/decision-tree/solution', {
//       state: {
//         fromDecisionCriteria: true,
//         criteriaData: criteria,
//         previousData: selectedData
//       }
//     });
//   };

//   return (
//     <div className="non-functional-scope-container">
//       {/* Breadcrumb */}
//       <div className="breadcrumb">
//         <div className="breadcrumb-content">
//           <span className="breadcrumb-link" style={{ color: '#0036C9' }}>Home</span>
//           <span>›</span>
//           <span className="breadcrumb-link" style={{ color: '#0036C9' }}>Decision Tree</span>
//           <span>›</span>
//           <span className="breadcrumb-current">Decision Criteria</span>
//         </div>
//       </div>
//      <div className="decision-criteria-container">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <h2 className="sidebar-title">Decision Criteria</h2>
//         <p className="sidebar-description">
//           Structured framework for selecting functional requirements,
//           prioritising them based on different measures for informed decision-making.
//         </p>
//         <div className="vertical-line"></div>
//         {/* Step indicators */}
//         <div className="step-indicators">
//           <div className="step-item">
//             <div className="step-circle completed">
//               <svg className="step-check" viewBox="0 0 24 24" fill="none">
//                 <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </div>
//             <span className="step-label completed">Functional Scope</span>
//           </div>
//           <div className="step-item">
//             <div className="step-circle completed">
//               <svg className="step-check" viewBox="0 0 24 24" fill="none">
//                 <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </div>
//             <span className="step-label completed">Non Functional</span>
//           </div>
//           <div className="step-item">
//             <div className="step-circle active">
//               3
//             </div>
//             <span className="step-label active">Decision Criteria</span>
//           </div>
//           <div className="step-item">
//             <div className="step-circle">
//               4
//             </div>
//             <span className="step-label">Solution</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Top bar */}
//         <div className="top-bar">
//           <button className="top-button">Define Weightage</button>
//           <select className="top-select">
//             <option>Custom Criteria</option>
//           </select>
//           <button className="top-button">Select Parameters</button>
//         </div>
        
//         {/* Main white box */}
//         <div className="main-box">
//           <h2 className="main-title">Decision Criteria</h2>
//           <div className="table-container">
//             <div className="table-header">
//               <div className="header-criteria">Decision Criteria</div>
//               <div className="header-priority">Priority</div>
//               <div className="header-scope">In-Scope</div>
//             </div>
//             {criteria.map((c, idx) => (
//               <React.Fragment key={c.id}>
//                 <div className={`table-row ${idx === 0 ? 'first-row' : ''}`}>
//                   <div className="criteria-cell">
//                     <button
//                       onClick={() => toggleExpand(c.id)}
//                       className="expand-button"
//                       aria-label={expanded[c.id] ? "Collapse" : "Expand"}
//                       type="button"
//                     >
//                       {expanded[c.id] ? "−" : "+"}
//                     </button>
//                     <span className="criteria-label">{c.label}</span>
//                   </div>
//                   <div className="priority-cell">
//                     <input
//                       type="text"
//                       value={c.priority}
//                       onChange={e => handlePriorityChange(c.id, e.target.value)}
//                       className="priority-input"
//                     />
//                   </div>
//                   <div className="scope-cell">
//                     <input
//                       type="checkbox"
//                       checked={c.inScope}
//                       onChange={e => handleInScopeChange(c.id, e.target.checked)}
//                       className="scope-checkbox"
//                     />
//                   </div>
//                 </div>
//                 {expanded[c.id] && (
//                   <div className="expanded-content">
//                     Additional details for <b>{c.label}</b> criteria.
//                     {fromNonFunctionalScope && selectedData && (
//                       <div className="data-display">
//                         <p><strong>Data from Non-Functional Scope:</strong></p>
//                         <pre className="data-pre">
//                           {JSON.stringify(selectedData, null, 2)}
//                         </pre>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
        
//         {/* Footer bar with buttons */}
//         <div className="footer-bar">
//           <button
//             className="footer-button previous"
//             onClick={handlePrevious}
//           >
//             Previous
//           </button>
//           <button
//             className="footer-button proceed"
//             onClick={handleProceed}
//           >
//             Proceed
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// };

// export default DecisionCriteria;


// import React, { useState } from "react";
// import { useLocation, useNavigate } from 'react-router-dom';
// import './DecisionCriteria.css';

// const initialCriteria = [
//   { id: 1, label: "Functional", priority: "Critical", inScope: true },
//   { id: 2, label: "Non-Functional", priority: "Critical", inScope: true },
// ];

// const DecisionCriteria = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [criteria, setCriteria] = useState(initialCriteria);
//   const [expanded, setExpanded] = useState({});

//   // Get data passed from previous page
//   const { fromNonFunctionalScope, selectedData } = location.state || {};

//   const handlePriorityChange = (id, value) => {
//     setCriteria((prev) =>
//       prev.map((c) =>
//         c.id === id ? { ...c, priority: value } : c
//       )
//     );
//   };

//   const handleInScopeChange = (id, checked) => {
//     setCriteria((prev) =>
//       prev.map((c) =>
//         c.id === id ? { ...c, inScope: checked } : c
//       )
//     );
//   };

//   const toggleExpand = (id) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [id]: !prev[id]
//     }));
//   };

//   const handlePrevious = () => {
//     navigate('/decision-tree/non-functional-scope');
//   };

//   const handleProceed = () => {
//     navigate('/decision-tree/solution', {
//       state: {
//         fromDecisionCriteria: true,
//         criteriaData: criteria,
//         previousData: selectedData
//       }
//     });
//   };

//   return (
//     <div className="decision-criteria-container">
//       {/* Breadcrumb */}
//       <div className="dc-breadcrumb">
//         <div className="dc-breadcrumb-content">
//           <span className="dc-breadcrumb-link" style={{ color: '#0036C9' }}>Home</span>
//           <span>›</span>
//           <span className="dc-breadcrumb-link" style={{ color: '#0036C9' }}>Decision Tree</span>
//           <span>›</span>
//           <span className="dc-breadcrumb-current">Decision Criteria</span>
//         </div>
//       </div>

//       <div className="dc-main-layout">
//         {/* Left Sidebar Box */}
//         <div className="dc-left-sidebar">
//           <h2 className="dc-sidebar-title">Decision Criteria</h2>
//           <p className="dc-sidebar-description">
//             Structured framework for selecting functional requirements,
//             prioritising them based on different measures for informed decision-making.
//           </p>

//           {/* Vertical line connecting all steps */}
//           <div className="dc-step-line"></div>

//           {/* Step indicators */}
//           <div className="dc-steps-container">
//             <div className="dc-step-item">
//               <div className="dc-step-circle dc-completed">
//                 <svg className="dc-step-check" viewBox="0 0 24 24" fill="none">
//                   <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </div>
//               <span className="dc-step-text dc-completed">Functional Scope</span>
//             </div>
            
//             <div className="dc-step-item">
//               <div className="dc-step-circle dc-completed">
//                 <svg className="dc-step-check" viewBox="0 0 24 24" fill="none">
//                   <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </div>
//               <span className="dc-step-text dc-completed">Non Functional</span>
//             </div>
            
//             <div className="dc-step-item">
//               <div className="dc-step-circle dc-active">3</div>
//               <span className="dc-step-text dc-active">Decision Criteria</span>
//             </div>
            
//             <div className="dc-step-item">
//               <div className="dc-step-circle dc-inactive">4</div>
//               <span className="dc-step-text dc-inactive">Solution</span>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Box */}
//         <div className="dc-main-content">
//           {/* Header with buttons */}
//           <div className="dc-content-header">
//             <div></div> {/* Empty div for spacing */}
//             <div className="dc-header-buttons">
//               <button className="dc-top-button">
//                 Define Weightage
//               </button>
//               <select className="dc-top-select dc-disabled" disabled>
//                 <option>Custom Criteria</option>
//               </select>
//               <button className="dc-top-button">
//                 Select Parameters
//               </button>
//             </div>
//           </div>

//           {/* Decision Criteria Header */}
//           <div className="dc-title-section">
//             <h1 className="dc-page-title">Decision Criteria</h1>
//           </div>

//           {/* Table Container */}
//           <div className="dc-table-container">
//             <div className="dc-table-header">
//               <div className="dc-header-criteria">Decision Criteria</div>
//               <div className="dc-header-priority">Priority</div>
//               <div className="dc-header-scope">In-Scope</div>
//             </div>
//             <div className="dc-table-content">
//               {criteria.map((c) => (
//                 <React.Fragment key={c.id}>
//                   <div className="dc-table-row">
//                     <div className="dc-criteria-cell">
//                       <button
//                         onClick={() => toggleExpand(c.id)}
//                         className="dc-expand-button"
//                         aria-label={expanded[c.id] ? "Collapse" : "Expand"}
//                         type="button"
//                       >
//                         {expanded[c.id] ? "−" : "+"}
//                       </button>
//                       <span className="dc-criteria-label">{c.label}</span>
//                     </div>
//                     <div className="dc-priority-cell">
//                       <input
//                         type="text"
//                         value={c.priority}
//                         onChange={e => handlePriorityChange(c.id, e.target.value)}
//                         className="dc-priority-input"
//                       />
//                     </div>
//                     <div className="dc-scope-cell">
//                       <input
//                         type="checkbox"
//                         checked={c.inScope}
//                         onChange={e => handleInScopeChange(c.id, e.target.checked)}
//                         className="dc-scope-checkbox"
//                       />
//                     </div>
//                   </div>
//                   {expanded[c.id] && (
//                     <div className="dc-expanded-content">
//                       Additional details for <b>{c.label}</b> criteria.
//                       {fromNonFunctionalScope && selectedData && (
//                         <div className="dc-data-display">
//                           <p><strong>Data from Non-Functional Scope:</strong></p>
//                           <pre className="dc-data-pre">
//                             {JSON.stringify(selectedData, null, 2)}
//                           </pre>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>
//           </div>

//           {/* Footer buttons inside main content */}
//           <div className="dc-footer-buttons-container">
//             <div className="dc-footer-content">
//               <button
//                 className="dc-footer-button dc-previous"
//                 onClick={handlePrevious}
//               >
//                 Previous
//               </button>
//               <button
//                 className="dc-footer-button dc-proceed"
//                 onClick={handleProceed}
//               >
//                 Proceed
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DecisionCriteria;

import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import './DecisionCriteria.css';

const initialCriteria = [
  { id: 1, label: "Functional", priority: "Critical", inScope: true },
  { id: 2, label: "Non-Functional", priority: "Critical", inScope: true },
];

const DecisionCriteria = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [criteria, setCriteria] = useState(initialCriteria);
  const [expanded, setExpanded] = useState({});

  // Get data passed from previous page
  const { fromNonFunctionalScope, selectedData } = location.state || {};

  const handlePriorityChange = (id, value) => {
    setCriteria((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, priority: value } : c
      )
    );
  };

  const handleInScopeChange = (id, checked) => {
    setCriteria((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, inScope: checked } : c
      )
    );
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handlePrevious = () => {
    navigate('/decision-tree/non-functional-scope');
  };

  const handleProceed = () => {
    navigate('/decision-tree/solution', {
      state: {
        fromDecisionCriteria: true,
        criteriaData: criteria,
        previousData: selectedData
      }
    });
  };

  return (
    <div className="decision-criteria-container">
      {/* Breadcrumb */}
      <div className="dc-breadcrumb">
        <div className="dc-breadcrumb-content">
          <span className="dc-breadcrumb-link" style={{ color: '#0036C9' }}>Home</span>
          <span>›</span>
          <span className="dc-breadcrumb-link" style={{ color: '#0036C9' }}>Decision Tree</span>
          <span>›</span>
          <span className="dc-breadcrumb-current">Decision Criteria</span>
        </div>
      </div>

      <div className="dc-main-layout">
        {/* Left Sidebar Box */}
        <div className="dc-left-sidebar">
          <h2 className="dc-sidebar-title">Decision Criteria</h2>
          <p className="dc-sidebar-description">
            Structured framework for selecting functional requirements,
            prioritising them based on different measures for informed decision-making.
          </p>

          {/* Vertical line connecting all steps */}
          <div className="dc-step-line"></div>

          {/* Step indicators */}
          <div className="dc-steps-container">
            <div className="dc-step-item">
              <div className="dc-step-circle dc-completed">
                <svg className="step-check" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="dc-step-text dc-completed">Functional Scope</span>
            </div>
            
            <div className="dc-step-item">
              <div className="dc-step-circle dc-completed">
                <svg className="step-check" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="dc-step-text dc-completed">Non Functional</span>
            </div>
            
            <div className="dc-step-item">
              <div className="dc-step-circle dc-active">3</div>
              <span className="dc-step-text dc-active">Decision Criteria</span>
            </div>
            
            <div className="dc-step-item">
              <div className="dc-step-circle dc-inactive">4</div>
              <span className="dc-step-text dc-inactive">Solution</span>
            </div>
          </div>
        </div>

        {/* Main Content Box */}
        <div className="dc-main-content">
          {/* Header with buttons */}
          <div className="dc-content-header">
            <div></div> {/* Empty div for spacing */}
            <div className="dc-header-buttons">
              <button className="dc-top-button">
                Define Weightage
              </button>
              <button className="dc-top-button dc-disabled" disabled>
                Custom Criteria
              </button>
              <button className="dc-top-button">
                Select Parameters
              </button>
            </div>
          </div>

          {/* Decision Criteria Header */}
          <div className="dc-title-section">
            <h1 className="dc-page-title">Decision Criteria</h1>
          </div>

          {/* Table Container */}
          <div className="dc-table-container">
            <div className="dc-table-header">
              <div className="dc-header-criteria">Decision Criteria</div>
              <div className="dc-header-priority">Priority</div>
              <div className="dc-header-scope">In-Scope</div>
            </div>
            <div className="dc-table-content">
              {criteria.map((c) => (
                <React.Fragment key={c.id}>
                  <div className="dc-table-row">
                    <div className="dc-criteria-cell">
                      <button
                        onClick={() => toggleExpand(c.id)}
                        className="dc-expand-button"
                        aria-label={expanded[c.id] ? "Collapse" : "Expand"}
                        type="button"
                      >
                        {expanded[c.id] ? "−" : "+"}
                      </button>
                      <span className="dc-criteria-label">{c.label}</span>
                    </div>
                    <div className="dc-priority-cell">
                      <input
                        type="text"
                        value={c.priority}
                        onChange={e => handlePriorityChange(c.id, e.target.value)}
                        className="dc-priority-input"
                      />
                    </div>
                    <div className="dc-scope-cell">
                      <input
                        type="checkbox"
                        checked={c.inScope}
                        onChange={e => handleInScopeChange(c.id, e.target.checked)}
                        className="dc-scope-checkbox"
                      />
                    </div>
                  </div>
                  {expanded[c.id] && (
                    <div className="dc-expanded-content">
                      Additional details for <b>{c.label}</b> criteria.
                      {fromNonFunctionalScope && selectedData && (
                        <div className="dc-data-display">
                          <p><strong>Data from Non-Functional Scope:</strong></p>
                          <pre className="dc-data-pre">
                            {JSON.stringify(selectedData, null, 2)}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Footer buttons inside main content */}
          <div className="dc-footer-buttons-container">
            <div className="dc-footer-content">
              <button
                className="dc-footer-button dc-previous"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                className="dc-footer-button dc-proceed"
                onClick={handleProceed}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionCriteria;