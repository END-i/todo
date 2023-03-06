import { AppProvider } from './app-context';
import InfoPanel from './components/InfoPanel';
import LeftPanel from './components/LeftPanel';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <AppProvider>
      <span className="main-title">PERSONAL TASK MANAGER</span>
      <div className="main-container flex row">
        <LeftPanel />
        <div className="flex column ml-12 full-width full-height">
          <InfoPanel />
          <TaskList />
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
