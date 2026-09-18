import "./Modal.css";

function Modal({ title, onClose, children }) {
  return (
    <div className="ss-modal-overlay" onClick={onClose}>
      <div
        className="ss-modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ss-modal-header">
          <h3>{title}</h3>

          <button
            type="button"
            className="ss-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="ss-modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
