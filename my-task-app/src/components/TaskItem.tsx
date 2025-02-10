import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../types/Task";
import { useTaskContext } from "../context/TaskContext";

const TaskItem = ({ task }: { task: Task }) => {
  const { updateTaskStatus, deleteTask } = useTaskContext();

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const nextStatus: Record<Task["status"], Task["status"]> = {
    Todo: "In-progress",
    "In-progress": "Completed",
    Completed: "Todo",
  };

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
      className="bg-white p-2 rounded shadow flex justify-between items-center cursor-grab"
    >
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
