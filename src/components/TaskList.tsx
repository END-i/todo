import { useState } from 'react';

const Filters = () => {
  const [activeIdx, setActiveIdx] = useState(1);

  const tabs = ['Active', 'All', 'Completed'];
  return (
    <div className="filters flex row align-center justify-center">
      {tabs.map((tabText, idx) => (
        <div key={idx} className={`${idx === activeIdx ? 'active' : ''} item`} onClick={() => setActiveIdx(idx)}>
          {tabText}
        </div>
      ))}
    </div>
  );
};

interface CompletedIconProps {
  completed: boolean;
}
const CompletedIcon = ({ completed }: CompletedIconProps) => {
  const [done, setDone] = useState(completed);
  return (
    <div className="completed-icon flex mr-12" onClick={() => setDone((prev) => !prev)}>
      {done ? (
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

interface TaskProps {
  title: string;
  completed: boolean;
}
const Task = ({ title, completed }: TaskProps) => {
  return (
    <div className="task-item flex row align-center justify-space-between">
      <CompletedIcon completed={completed} />
      <span>{title}</span>
      <div className="category-label w150 red ml-12">Urgent</div>
    </div>
  );
};

const TaskList = () => {
  return (
    <div className="container task-list-container flex column">
      <div className="task-list">
        <Task title={'Memorize the fifty states and their capitals'} completed={true} />
        <Task title={'Memorize the fifty states and their capitals memorize the fifty states and their capitals'} completed={false} />
        <Task title={'Memorize the fifty states and their capitals'} completed={true} />
        <Task title={'Memorize the fifty states and their capitals'} completed={true} />
        <Task title={'Memorize the fifty states and their capitals'} completed={true} />
        <Task title={'Memorize the fifty states and their capitals'} completed={false} />
        <Task title={'Memorize the fifty states and their capitals'} completed={true} />
        <Task title={'Memorize the fifty states and their capitals'} completed={true} />
        <Task title={'Memorize the fifty states and their capitals'} completed={true} />
      </div>
      <Filters />
    </div>
  );
};

export default TaskList;
