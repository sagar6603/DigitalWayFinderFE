// import { useState } from 'react';
// import './ProjectInfo.css';
// import { Link } from 'react-router-dom';
// import dashboardImage from "../../assets/dashboard.png";

// const ProjectInfo = () => {
//   const [projectType, setProjectType] = useState('internal');
//   const [formData, setFormData] = useState({
//     requestId: 'Finance Project',
//     clientName: 'Finance Project',
//     description: 'Lorem Ipsum dolor sit amor\nintroduction text for Product',
//     projectScope: 'Lorem Ipsum dolor sit amor\nintroduction text for Product'
//   });

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleProjectTypeChange = (type) => {
//     setProjectType(type);
//     // Reset form data based on project type
//     if (type === 'client') {
//       setFormData({
//         requestId: '',
//         clientName: '',
//         description: '',
//         projectScope: ''
//       });
//     } else {
//       setFormData({
//         requestId: 'Finance Project',
//         clientName: 'Finance Project',
//         description: 'Lorem Ipsum dolor sit amor\nintroduction text for Product',
//         projectScope: 'Lorem Ipsum dolor sit amor\nintroduction text for Product'
//       });
//     }
//   };

//   return (
//     <div className="project-info-container">

//       {/* Main Content */}
//       <div className="main-content">
//         {/* Breadcrumb */}
//         <div className="breadcrumb">
//            <Link to="/">Home</Link> &gt; 
          
//           <span>Decision Tree</span>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="nav-tabs">
//           <button className="nav-tab active">Project Information</button>
//           {/* <button className="nav-tab">FUNCTIONAL AREA</button>
//           <button className="nav-tab">INDUSTRY TYPE</button> */}
//         </div>

//         {/* Content Grid */}
//         <div className="content-grid">
//           {/* Left Side - Form */}
//           <div className="form-section">
//             <h2 className="form-title">Project Information</h2>
            
//             {/* Project Type Selection */}
//             <div className="project-type-section">
//               <p className="section-label">Select your project type</p>
//               <div className="radio-group">
//                 <label className="radio-option">
//                   <input
//                     type="radio"
//                     name="projectType"
//                     value="internal"
//                     checked={projectType === 'internal'}
//                     onChange={() => handleProjectTypeChange('internal')}
//                   />
//                   <span className="radio-text">Internal Project</span>
//                 </label>
//                 <label className="radio-option">
//                   <input
//                     type="radio"
//                     name="projectType"
//                     value="client"
//                     checked={projectType === 'client'}
//                     onChange={() => handleProjectTypeChange('client')}
//                   />
//                   <span className="radio-text">Client Project</span>
//                 </label>
//               </div>
//             </div>

//             {/* Form Fields */}
//             <div className="form-fields">
//               <p className="form-instruction">Enter the information to proceed</p>
              
//               <div className="field-group">
//                 <label className="field-label">Request ID*</label>
//                 <input
//                   type="text"
//                   value={formData.requestId}
//                   onChange={(e) => handleInputChange('requestId', e.target.value)}
//                   className="field-input"
//                   placeholder={projectType === 'internal' ? 'Enter Project ID' : 'Enter Request ID'}
//                 />
//               </div>

//               <div className="field-group">
//                 <label className="field-label">
//                   {projectType === 'internal' ? 'Project Name*' : 'Client Name*'}
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.clientName}
//                   onChange={(e) => handleInputChange('clientName', e.target.value)}
//                   className="field-input"
//                   placeholder={projectType === 'internal' ? 'Enter Project Name' : 'Enter Client Name'}
//                 />
//               </div>

//               <div className="field-group">
//                 <label className="field-label">
//                   {projectType === 'internal' ? 'Project Description' : 'Client Description'}
//                 </label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(e) => handleInputChange('description', e.target.value)}
//                   rows={4}
//                   className="field-textarea"
//                   placeholder={projectType === 'internal' ? 'Enter project description' : 'Enter client description'}
//                 />
//               </div>

//               <div className="field-group">
//                 <label className="field-label">Project Scope</label>
//                 <textarea
//                   value={formData.projectScope}
//                   onChange={(e) => handleInputChange('projectScope', e.target.value)}
//                   rows={4}
//                   className="field-textarea"
//                   placeholder="Enter project scope"
//                 />
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="form-footer">
//               <span className="step-indicator">Completed step 0 of 3</span>
//               <button className="proceed-button" >Proceed</button>
//             </div>
//           </div>

//           {/* Right Side - Dashboard Preview */}
//           <div className="dashboard-section">
//             <div className="dashboard-preview">
//               <img 
//                 src={dashboardImage} 
//                 alt="Dashboard Preview" 
//                 className="dashboard-image"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectInfo;

import { useState } from 'react';
import './ProjectInfo.css';
import { Link, useNavigate } from 'react-router-dom';
import dashboardImage from "../../assets/dashboard.png";

const ProjectInfo = () => {
  const [projectType, setProjectType] = useState('internal');
  const [formData, setFormData] = useState({
    requestId: 'Finance Project',
    clientName: 'Finance Project',
    description: 'Lorem Ipsum dolor sit amor\nintroduction text for Product',
    projectScope: 'Lorem Ipsum dolor sit amor\nintroduction text for Product'
  });

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProjectTypeChange = (type) => {
    setProjectType(type);
    // Reset form data based on project type
    if (type === 'client') {
      setFormData({
        requestId: '',
        clientName: '',
        description: '',
        projectScope: ''
      });
    } else {
      setFormData({
        requestId: 'Finance Project',
        clientName: 'Finance Project',
        description: 'Lorem Ipsum dolor sit amor\nintroduction text for Product',
        projectScope: 'Lorem Ipsum dolor sit amor\nintroduction text for Product'
      });
    }
  };

  const handleProceed = () => {
    // Basic validation - check if required fields are filled
    if (!formData.requestId.trim() || !formData.clientName.trim()) {
      alert('Please fill in all required fields (Request ID and Client/Project Name)');
      return;
    }

    // Navigate to FuncAreaPage with project data
    navigate('/decision-tree/functional-area', {
      state: {
        projectData: formData,
        projectType: projectType
      }
    });
  };

  return (
    <div className="project-info-container">

      {/* Main Content */}
      <div className="main-content">
        {/* Breadcrumb */}
        <div className="breadcrumb">
           <Link to="/">Home</Link> &gt; 
          
          <span>Decision Tree</span>
        </div>

        {/* Navigation Tabs */}
        <div className="nav-tabs">
          <button className="nav-tab active">Project Information</button>
          <button className="nav-tab">FUNCTIONAL AREA</button>
          <button className="nav-tab">INDUSTRY TYPE</button>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Left Side - Form */}
          <div className="form-section">
            <h2 className="form-title">Project Information</h2>
            
            {/* Project Type Selection */}
            <div className="project-type-section">
              <p className="section-label">Select your project type</p>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="projectType"
                    value="internal"
                    checked={projectType === 'internal'}
                    onChange={() => handleProjectTypeChange('internal')}
                  />
                  <span className="radio-text">Internal Project</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="projectType"
                    value="client"
                    checked={projectType === 'client'}
                    onChange={() => handleProjectTypeChange('client')}
                  />
                  <span className="radio-text">Client Project</span>
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="form-fields">
              <p className="form-instruction">Enter the information to proceed</p>
              
              <div className="field-group">
                <label className="field-label">Request ID*</label>
                <input
                  type="text"
                  value={formData.requestId}
                  onChange={(e) => handleInputChange('requestId', e.target.value)}
                  className="field-input"
                  placeholder={projectType === 'internal' ? 'Enter Project ID' : 'Enter Request ID'}
                />
              </div>

              <div className="field-group">
                <label className="field-label">
                  {projectType === 'internal' ? 'Project Name*' : 'Client Name*'}
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  className="field-input"
                  placeholder={projectType === 'internal' ? 'Enter Project Name' : 'Enter Client Name'}
                />
              </div>

              <div className="field-group">
                <label className="field-label">
                  {projectType === 'internal' ? 'Project Description' : 'Client Description'}
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="field-textarea"
                  placeholder={projectType === 'internal' ? 'Enter project description' : 'Enter client description'}
                />
              </div>

              <div className="field-group">
                <label className="field-label">Project Scope</label>
                <textarea
                  value={formData.projectScope}
                  onChange={(e) => handleInputChange('projectScope', e.target.value)}
                  rows={4}
                  className="field-textarea"
                  placeholder="Enter project scope"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="form-footer">
              <span className="step-indicator">Completed step 0 of 3</span>
              <button className="proceed-button" onClick={handleProceed}>Proceed</button>
            </div>
          </div>

          {/* Right Side - Dashboard Preview */}
          <div className="dashboard-section">
            <div className="dashboard-preview">
              <img 
                src={dashboardImage} 
                alt="Dashboard Preview" 
                className="dashboard-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;