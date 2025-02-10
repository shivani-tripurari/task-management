import { TaskProvider } from "./context/TaskContext";
import TaskBoard from "./components/TaskBoard";

function App() {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <TaskBoard />
      </div>
    </TaskProvider>
  );
}

export default App;
