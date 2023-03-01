import { useState } from 'react';
import Modal from './Modal';

const InfoPanel = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const addNewTask = () => {
    setIsOpenModal(false);
    console.log('submit form: add new task');
  };
  return (
    <>
      <div className="container info-panel flex align-center justify-space-between mb-12">
        <button className="button linked" disabled>
          5 tasks
        </button>
        <button className="button" onClick={() => setIsOpenModal(true)}>
          Add new task
        </button>
        <button className="button linked">Clear completed</button>
      </div>
      <Modal className="create-task-modal" onClose={() => setIsOpenModal(false)} onSubmit={addNewTask} isOpen={isOpenModal}>
        <span className="title">Create task</span>
        <input type="text" placeholder="Description task..." />
      </Modal>
    </>
  );
};

export default InfoPanel;
