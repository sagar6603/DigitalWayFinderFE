import React, { useState } from "react";

const initialCriteria = [
  { id: 1, label: "Functional", priority: "Critical", inScope: true },
  { id: 2, label: "Non-Functional", priority: "Critical", inScope: true },
];

export default function DecisionCriteria({ onPrevious }) {
  const [criteria, setCriteria] = useState(initialCriteria);
  const [expanded, setExpanded] = useState({});

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

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: "#f8fafc",
      position: "relative"
    }}>
      {/* Sidebar */}
      <div style={{
        width: '280px',
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRight: 'none',
        borderRadius: '8px 0 0 8px',
        padding: '24px',
        height: '100vh',
        boxSizing: 'border-box',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.04)',
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
        {/* Vertical line */}
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
              backgroundColor: '#22c55e',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              <span>✓</span>
            </div>
            <span style={{ color: '#22c55e', fontWeight: '500', fontSize: '14px' }}>Functional Scope</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#a78bfa',
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
            <span style={{ color: '#a78bfa', fontWeight: '500', fontSize: '14px' }}>Decision Criteria</span>
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
              color: '#6b7280',
              fontSize: '12px',
              fontWeight: '600'
            }}>
              3
            </div>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>Solution</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh"
      }}>
        {/* Top bar */}
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 12,
          padding: "32px 32px 0 32px"
        }}>
          <button style={{
            border: "1px solid #a78bfa",
            background: "#fff",
            color: "#a78bfa",
            borderRadius: 20,
            padding: "6px 18px",
            fontWeight: 500,
            cursor: "pointer"
          }}>Define Weightage</button>
          <select style={{
            border: "1px solid #e5e7eb",
            borderRadius: 20,
            padding: "6px 18px",
            fontWeight: 500,
            color: "#444"
          }}>
            <option>Custom Criteria</option>
          </select>
          <button style={{
            border: "1px solid #a78bfa",
            background: "#fff",
            color: "#a78bfa",
            borderRadius: 20,
            padding: "6px 18px",
            fontWeight: 500,
            cursor: "pointer"
          }}>Select Parameters</button>
        </div>
        {/* Main white box */}
        <div style={{
          margin: "24px 32px 0 32px",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          background: "#fff",
          flex: 1,
          display: "flex",
          flexDirection: "column"
        }}>
          <h2 style={{
            fontWeight: 600,
            fontSize: 22,
            margin: "24px 0 0 24px"
          }}>Decision Criteria</h2>
          <div style={{
            border: "1px solid #f3f4f6",
            borderRadius: 8,
            overflow: "hidden",
            background: "#fff",
            margin: "24px"
          }}>
            <div style={{
              background: "#f9fafb",
              display: "flex",
              fontWeight: 600,
              fontSize: 15,
              padding: "12px 24px"
            }}>
              <div style={{ flex: 2 }}>Decision Criteria</div>
              <div style={{ flex: 1 }}>Priority</div>
              <div style={{ width: 90, textAlign: "center" }}>In-Scope</div>
            </div>
            {criteria.map((c, idx) => (
              <React.Fragment key={c.id}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  borderTop: idx === 0 ? "none" : "1px solid #f3f4f6",
                  padding: "16px 24px",
                  background: "#fff"
                }}>
                  <div style={{ flex: 2, display: "flex", alignItems: "center", gap: 12 }}>
                    <button
                      onClick={() => toggleExpand(c.id)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        border: "2px solid #a78bfa",
                        color: "#a78bfa",
                        fontWeight: 700,
                        fontSize: 18,
                        marginRight: 8,
                        background: "#fff",
                        cursor: "pointer",
                        outline: "none"
                      }}
                      aria-label={expanded[c.id] ? "Collapse" : "Expand"}
                      type="button"
                    >
                      {expanded[c.id] ? "−" : "+"}
                    </button>
                    <span style={{ fontWeight: 500 }}>{c.label}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      value={c.priority}
                      onChange={e => handlePriorityChange(c.id, e.target.value)}
                      style={{
                        width: "90%",
                        padding: "6px 10px",
                        border: "1px solid #e5e7eb",
                        borderRadius: 6,
                        fontSize: 15
                      }}
                    />
                  </div>
                  <div style={{ width: 90, textAlign: "center" }}>
                    <input
                      type="checkbox"
                      checked={c.inScope}
                      onChange={e => handleInScopeChange(c.id, e.target.checked)}
                      style={{
                        width: 18,
                        height: 18,
                        accentColor: "#a78bfa"
                      }}
                    />
                  </div>
                </div>
                {expanded[c.id] && (
                  <div style={{
                    background: "#f6f5fd",
                    padding: "16px 48px",
                    borderTop: "1px solid #f3f4f6",
                    fontSize: 15,
                    color: "#6b7280"
                  }}>
                    {/* Replace this with your actual expanded content */}
                    Additional details for <b>{c.label}</b> criteria.
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* Footer bar with buttons */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 32,
          gap: 16,
          padding: "0 32px 32px 32px"
        }}>
          <button
            style={{
              background: "#fff",
              color: "#a78bfa",
              border: "1px solid #a78bfa",
              borderRadius: 20,
              padding: "10px 32px",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer"
            }}
            onClick={() => {
              if (onPrevious) onPrevious();
              else window.history.back();
            }}
          >
            Previous
          </button>
          <button
            style={{
              background: "#a78bfa",
              color: "#fff",
              border: "none",
              borderRadius: 20,
              padding: "10px 32px",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer"
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
}