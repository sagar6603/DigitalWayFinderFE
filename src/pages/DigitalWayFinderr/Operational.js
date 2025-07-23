import React, { useState } from 'react';
import './Operational.css';

const Questionnaire = () => {
  const [currentStep, setCurrentStep] = useState(2);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      text: "Is the WMS system capable to integrate with warehouse assets as ASRS/ AGVS/ conveyor belts ?"
    },
    {
      id: 2,
      text: "Please rate existing WMS's capability to integrate with warehouse assets such as ASRS/AGVs."
    },
    {
      id: 3,
      text: "Is the WMS system capable of performing optimised pick path planning for forklift drivers/pickers ?"
    },
    {
      id: 4,
      text: "Do you leverage any cloud based solution to plan optimised picking path for forklift drivers/pickers ?"
    },
    {
      id: 5,
      text: "Please rate the existing pick path planning capability"
    },
    {
      id: 6,
      text: "Please rate the WMS system for handling of returns and reverse logistics capability"
    }
  ];

  const sidebarItems = [
    { id: 1, title: "Data and Cloud", completed: true },
    { id: 2, title: "Operational Innovations", active: true },
    { id: 3, title: "Visibility and Proactive" },
    { id: 4, title: "Generative AI" }
  ];

  // Calculate completed questions count
  const completedQuestions = Object.keys(answers).filter(key => answers[key]).length;
  const totalQuestions = questions.length;
  const progressPercentage = (completedQuestions / totalQuestions) * 100;
  const allQuestionsAnswered = completedQuestions === totalQuestions;

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveAndProceed = () => {
    // Handle save and proceed logic
    console.log('Saving answers:', answers);
  };

  return (
    <div className="questionnaire-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span className="breadcrumb-item">Home</span>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-item">Digital Wayfinder</span>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-item active">Questionnaire</span>
      </div>

      <div className="questionnaire-content">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h3>Questionnaire</h3>
            <p>Structured framework for selecting functional requirements, prioritising them based on different measures for informed decision-making.</p>
          </div>
          
          <div className="sidebar-items">
            {sidebarItems.map((item) => (
              <div 
                key={item.id} 
                className={`sidebar-item ${item.completed ? 'completed' : ''} ${item.active ? 'active' : ''}`}
              >
                <div className="sidebar-item-number">
                  {item.completed ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.5 4.5L6 12L2.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    item.id
                  )}
                </div>
                <span className="sidebar-item-title">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="content-header">
            <h1>Operational Innovations</h1>
            <div className="progress-container">
              <span className="progress-text">Completed question {completedQuestions}/{totalQuestions}</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>
          </div>

          <div className="questions-container">
            {questions.map((question) => (
              <div key={question.id} className="question-item">
                <h3 className="question-text">
                  {question.id}. {question.text}
                </h3>
                <div className="radio-group">
                  {['High', 'Medium', 'Low'].map((option) => (
                    <label key={option} className="radio-option">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      />
                      <span className="radio-custom"></span>
                      <span className="radio-label">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="action-buttons">
            <button 
              className="btn-secondary" 
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </button>
            <button 
              className="btn-primary" 
              onClick={handleSaveAndProceed}
              disabled={!allQuestionsAnswered}
            >
              Save & Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;