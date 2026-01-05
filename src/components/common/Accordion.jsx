import { useState } from "react";

const SimpleAccordion = ({ title, children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div style={{ width: '100%', marginBottom: '1rem' }}>
      <div 
        onClick={() => setOpen(!open)}
        style={{
          cursor: 'pointer',
          background: '#eee',
          padding: '0.5rem 1rem',
          borderRadius: '8px',
          fontWeight: 'bold'
        }}
      >
        {title} {open ? "▲" : "▼"}
      </div>
      {open && (
        <div style={{ padding: '1rem', border: '1px solid #ccc', borderTop: 'none' }}>
          {children}
        </div>
      )}
    </div>
  );
};
export default SimpleAccordion;