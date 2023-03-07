import { createContext, useState } from 'react';

interface AppContextProps {
  tasks: Task[];
  addNewTask: (newTask: Task) => void;
  categories: Categories;
  addNewCategory: (newCategory: Category) => void;
  toggleCompletedTask: (taskId: number) => void;
  filters: string;
  changeFilters: (filteredBy: string) => void;
  clearCompleted: () => void;
}
export const AppContext = createContext<AppContextProps>({
  tasks: [],
  addNewTask: () => null,
  categories: {},
  addNewCategory: () => null,
  toggleCompletedTask: () => null,
  filters: '',
  changeFilters: () => null,
  clearCompleted: () => null,
});
// TODO: moved types to separate file
export interface Task {
  id: number;
  title: string;
  categoryId: number;
  completed: boolean;
}
export interface Category {
  id: number;
  title: string;
  color: string;
}
export interface Categories {
  [key: number]: Category;
}
interface PropsAppProvider {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: PropsAppProvider) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 0,
      title: 'Some tasks',
      categoryId: 0,
      completed: false,
    },
    {
      id: 1,
      title: 'Some tasks',
      categoryId: 1,
      completed: false,
    },
    {
      id: 2,
      title: 'Some tasks',
      categoryId: 2,
      completed: true,
    },
    {
      id: 3,
      title: 'Some tasks',
      categoryId: 0,
      completed: false,
    },
    {
      id: 4,
      title: 'Some tasks',
      categoryId: 0,
      completed: false,
    },
    {
      id: 5,
      title: 'Some tasks',
      categoryId: 0,
      completed: false,
    },
    {
      id: 6,
      title: 'Some tasks',
      categoryId: 0,
      completed: false,
    },
    {
      id: 31,
      title: 'Some tasks',
      categoryId: 0,
      completed: false,
    },
    {
      id: 41,
      title: 'Some tasks',
      categoryId: 0,
      completed: false,
    },
    {
      id: 51,
      title: 'Some tasks',
      categoryId: 0,
      completed: false,
    },
    {
      id: 61,
      title: 'Some tasks',
      categoryId: 0,
      completed: false,
    },
  ]);
  const [categories, setCategories] = useState<Categories>({
    1: {
      id: 1,
      title: 'Urgent',
      color: '#FF5252',
    },
    2: {
      id: 2,
      title: 'Completed',
      color: '#4CAF50',
    },
    3: {
      id: 3,
      title: 'Important',
      color: '#FFC107',
    },
    4: {
      id: 4,
      title: 'Later',
      color: '#9C27B0',
    },
    5: {
      id: 5,
      title: 'To study',
      color: '#25A7B8',
    },
  });
  const [filters, setFilters] = useState('All');

  const addNewCategory = (newCategory: Category) => {
    setCategories((prev) => ({ ...prev, [newCategory.id]: newCategory }));
  };

  const addNewTask = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const toggleCompletedTask = (taskId: number) => {
    const clone = [...tasks];
    clone.forEach((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
    });
    setTasks(clone);
  };

  const changeFilters = (filteredBy: string) => {
    setFilters(filteredBy);
  };

  const clearCompleted = () => {
    const uncompletedTasks = tasks.filter((task) => !task.completed);
    setTasks(uncompletedTasks);
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        addNewTask,
        categories,
        addNewCategory,
        toggleCompletedTask,
        filters,
        changeFilters,
        clearCompleted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const UserConsumer = AppContext.Consumer;
