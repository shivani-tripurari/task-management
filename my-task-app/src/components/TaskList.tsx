import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const TaskList = ({ boardView = false }: { boardView?: boolean }) => {
  const { tasks } = useTaskContext();

  const groupedTasks = {
    Todo: tasks.filter((task) => task.status === "Todo"),
    "In-progress": tasks.filter((task) => task.status === "In-progress"),
    Completed: tasks.filter((task) => task.status === "Completed"),
  };

  return (
    <div className={`flex ${boardView ? "flex-row gap-4" : "flex-col"} w-full`}>
      {Object.entries(groupedTasks).map(([status, tasks]) => (
        <div key={status} className="p-4 bg-gray-200 rounded shadow w-full">
          <h2 className="text-xl font-semibold mb-2">{status}</h2>
          <div className="space-y-2">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
