import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
  className?: string;
  isOpen: boolean;
}

const Modal = ({ children, onClose, onSubmit, className, isOpen }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <>
      <div className="modal-back-shadow" onClick={onClose}></div>
      <div className={`flex column modal-container ${className}`}>
        {children}
        <div className="actions-bar flex">
          <button className="button linked" onClick={onClose}>
            Close
          </button>
          <button className="button" onClick={onSubmit}>
            Save
          </button>
        </div>
      </div>
    </>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById('portal-wrapper')!,
  );
};

export default Modal;
