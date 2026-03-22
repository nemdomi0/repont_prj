import React from "react";

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};




function Modal({ children, onClose }: ModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
    >
      <div
        className="panel"
        style={{
          width: "500px",
          maxHeight: "80vh",
          overflow: "hidden"
        }}
      >
        {children}

        <button
          style={{ marginTop: "10px" }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;