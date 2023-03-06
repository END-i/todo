import { useContext, useState, MouseEvent } from 'react';
import { AppContext } from '../app-context';
import Modal from './Modal';

const LeftPanel = () => {
  const { categories, changeFilters, filters } = useContext(AppContext);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const clearSelectedCategory = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    changeFilters('');
  };

  return (
    <>
      <div className="left-panel flex column align-center full-height container">
        <div className="category-list-title mb-12">Categories</div>
        <div className="category-list mb-12 flex column align-center">
          {Object.keys(categories).length ? (
            Object.entries(categories).map(([id, { title, color }]) => {
              const active = filters === id;
              return (
                <div
                  key={id}
                  className={`category-label mb-12 green ${active ? 'active' : ''}`}
                  style={{ background: color }}
                  onClick={() => changeFilters(id)}
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
        <button className="button" onClick={() => setIsOpenModal(true)}>
          Add category
        </button>
      </div>
      <CreateCategoryModal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </>
  );
};

export default LeftPanel;

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CreateCategoryModal = ({ isOpen, onClose }: CreateCategoryModalProps) => {
  const { addNewCategory } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');

  const handleNewCategory = () => {
    addNewCategory({
      id: new Date().getTime(),
      title,
      color,
    });
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setTitle('');
    onClose(false);
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <Modal className="create-category-modal" onClose={handleCloseModal} onSubmit={handleNewCategory} isOpen={isOpen}>
      <span className="title">Create new category</span>
      <input
        type="text"
        placeholder="Category name..."
        value={title}
        onChange={({ target: { value } }) => setTitle(value)}
        autoFocus
      />
      <label className="flex row">
        Choose category color:
        <br />
        <input type="color" name="category-color" value={color} onChange={handleChangeColor} />
      </label>
    </Modal>
  );
};
