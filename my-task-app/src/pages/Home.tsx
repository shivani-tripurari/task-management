import { TaskProvider } from "../context/TaskContext";
import TaskBoard from "../components/TaskBoard";

const Home = () => {
  return (
    <TaskProvider>
      <div className="min-h-screen bg-gray-100 p-4">
        <TaskBoard />
      </div>
    </TaskProvider>
  );
};

export default Home;
