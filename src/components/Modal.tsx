import React from "react";

interface ModalProps {
  isOpen: boolean; // Estado que controla si el modal está abierto
  title: string; // Título del modal
  message: string; // Mensaje del modal
  onConfirm: () => void; // Callback para el botón "Yes"
  onCancel?: () => void; // Callback opcional para el botón "Cancel"
}

const Modal: React.FC<ModalProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  return (
    <dialog open={isOpen} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          {/* Botón Yes */}
          <button className="btn btn-primary" onClick={onConfirm}>
            Yes
          </button>
          {/* Botón Cancel */}
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
