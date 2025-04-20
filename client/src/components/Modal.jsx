// Modal.jsx
import React from 'react';

function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;