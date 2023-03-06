import { useContext, useMemo } from 'react';
import { AppContext, Task } from '../app-context';

const TABS = ['Active', 'All', 'Completed'];

const Filters = () => {
  const { changeFilters, filters } = useContext(AppContext);

  return (
    <div className="filters flex row align-center justify-center">
      {TABS.map((tabText, idx) => (
        <div key={idx} className={`${filters === tabText ? 'active' : ''} item`} onClick={() => changeFilters(tabText)}>
          {tabText}
        </div>
      ))}
    </div>
  );
};

interface CompletedIconProps {
  id: number;
  completed: boolean;
}
const CompletedIcon = ({ completed, id }: CompletedIconProps) => {
  const { toggleCompletedTask } = useContext(AppContext);

  const handleComplete = () => {
    toggleCompletedTask(id);
  };

  return (
    <div className="completed-icon flex mr-12" onClick={handleComplete}>
      {completed ? (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="15" fill="#4CAF50" />
          <path
            d="M21.6861 10.3144C22.1046 10.733 22.1046 11.4093 21.6861 11.8279L13.1142 20.3998C12.6956 20.8183 12.0193 20.8183 11.6007 20.3998L7.31381 16.1138C6.8954 15.6953 6.8954 15.0189 7.31381 14.6004C7.7323 14.1818 8.41068 14.1818 8.82923 14.6004L12.3273 18.1262L20.1726 10.3144C20.5912 9.8952 21.2675 9.8952 21.6861 10.3144Z"
            fill="white"
          />
        </svg>
      ) : null}
    </div>
  );
};

type TaskProps = Task;
const TaskItem = ({ title, completed, categoryId, id }: TaskProps) => {
  const { categories } = useContext(AppContext);
  const category = categories[categoryId];
  return (
    <div className="task-item flex row align-center justify-space-between">
      <CompletedIcon completed={completed} id={id} />
      <span>{title}</span>
      {category ? (
        <div className="category-label w150 red ml-12" style={{ background: category.color }}>
          {category.title}
        </div>
      ) : null}
    </div>
  );
};

const TaskList = () => {
  const { tasks, filters } = useContext(AppContext);

  const filteredTasks = useMemo(() => {
    if (!filters) {
      return tasks;
    }

    return tasks.filter((task) => {
      switch (filters) {
        case 'Completed':
          return !!task.completed;
        case 'Active':
          return !task.completed;
        default: {
          const selectedCategoryId = Number(filters);
          if (isNaN(selectedCategoryId)) {
            return tasks;
          }
          return selectedCategoryId === task.categoryId;
        }
      }
    });
  }, [tasks, filters]);

  return (
    <div className="container task-list-container flex column">
      <div className="task-list flex column">
        {filteredTasks.length ? (
          filteredTasks.map((task) => <TaskItem key={task.id} {...task} />)
        ) : (
          <span className="empty-list">No Tasks</span>
        )}
      </div>
      <Filters />
    </div>
  );
};

export default TaskList;
