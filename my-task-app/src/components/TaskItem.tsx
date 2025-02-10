import { Task, TaskStatus } from "../types/Task";
import { useTaskContext } from "../context/TaskContext";

const TaskItem = ({ task }: { task: Task }) => {
  const { updateTaskStatus, deleteTask } = useTaskContext();

  const nextStatus: Record<TaskStatus, TaskStatus> = {
    Todo: "In-progress",
    "In-progress": "Completed",
    Completed: "Todo",
  };

  return (
    <div className="bg-white p-2 rounded shadow flex justify-between items-center">
      <div>
        <h3 className="font-medium">{task.name}</h3>
        <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
        <p className="text-sm text-gray-500">Category: {task.category}</p>
      </div>
      <div className="flex gap-2">
        <button
          className="bg-green-500 text-white px-3 py-1 rounded text-sm"
          onClick={() => updateTaskStatus(task.id, nextStatus[task.status])}
        >
          {task.status}
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded text-sm"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
