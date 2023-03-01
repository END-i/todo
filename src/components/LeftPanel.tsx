import { useState } from 'react';
import Modal from './Modal';

const LeftPanel = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const addNewCategory = () => {
    setIsOpenModal(false);
    console.log('submit form: add new category');
  };

  return (
    <>
      <div className="left-panel flex column align-center full-height container">
        <div className="title">Categories</div>
        <div className="category-list">
          <div className="category-label mb-12 green">Completed</div>
          <div className="category-label mb-12 red">Urgent</div>
          <div className="category-label mb-12 yellow">Important</div>
          <div className="category-label mb-12 purpura">Later</div>
          <div className="category-label mb-12 light-green">To study</div>
        </div>
        <button className="button" onClick={() => setIsOpenModal(true)}>
          Add category
        </button>
      </div>
      <Modal className="create-task-modal" onClose={() => setIsOpenModal(false)} onSubmit={addNewCategory} isOpen={isOpenModal}>
        <span className="title">Create new category</span>
        <input type="text" placeholder="Category name..." />
      </Modal>
    </>
  );
};

export default LeftPanel;
