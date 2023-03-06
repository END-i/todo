import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
  className?: string;
  isOpen: boolean;
}

const Modal = ({ children, onClose, onSubmit, className, isOpen }: ModalProps) => {
  // const handleKeyboardEvent = (event: KeyboardEvent) => {
  //   switch (event.key) {
  //     case 'Enter':
  //       onSubmit();
  //       break;
  //     case 'Escape':
  //       onClose();
  //       break;
  //   }
  // };

  // useEffect(() => {
  //   document.removeEventListener('keyup', handleKeyboardEvent, false);

  //   if (isOpen) {
  //     document.addEventListener('keyup', handleKeyboardEvent, false);
  //     return () => {
  //       document.removeEventListener('keyup', handleKeyboardEvent, false);
  //     };
  //   }
  // }, [isOpen]);

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
