import { MouseEvent, useContext, useState } from 'react';
import { AppContext, Category } from '../app-context';
import Modal from './Modal';

const InfoPanel = () => {
  const { addNewTask, categories, clearCompleted, tasks } = useContext(AppContext);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(-1);

  const handleNewTask = () => {
    addNewTask({
      id: new Date().getTime(),
      title,
      categoryId: selectedCategory,
      completed: false,
    });
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setTitle('');
  };

  const clearSelectedCategory = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setSelectedCategory(-1);
  };

  const handleClearCompletedTasks = () => {
    if (window.confirm('Are you sure?')) {
      clearCompleted();
    }
  };
  return (
    <>
      <div className="container info-panel flex align-center justify-space-between mb-12">
        <button className="button linked" disabled>
          {`${tasks.length} tasks`}
        </button>
        <button className="button" onClick={() => setIsOpenModal(true)}>
          Add new task
        </button>
        <button className="button linked" onClick={handleClearCompletedTasks}>
          Clear completed
        </button>
      </div>
      <Modal className="create-task-modal" onClose={handleCloseModal} onSubmit={handleNewTask} isOpen={isOpenModal}>
        <span className="title">Create task</span>
        <input
          type="text"
          placeholder="Description task..."
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
          autoFocus
        />

        <div className="category-list-title mt-35 mb-12">Categories</div>
        <div className="category-list mb-12 flex row align-center justify-space-around flex-wrap">
          {Object.keys(categories).length ? (
            Object.entries(categories).map(([, { id, title, color }]: [string, Category]) => {
              const active = selectedCategory === id;
              return (
                <div
                  key={id}
                  // TODO: Check green classname and styles for this class
                  className={`category-label mb-12 green ${active ? 'active' : ''}`}
                  style={{ background: color }}
                  onClick={() => setSelectedCategory(id)}
                >
                  {title}
                  {active ? (
                    <span className="close-icon" onClick={clearSelectedCategory}>
                      &#10006;
                    </span>
                  ) : null}
                </div>
              );
            })
          ) : (
            <span className="empty-list">No Categories</span>
          )}
        </div>
      </Modal>
    </>
  );
};

export default InfoPanel;
