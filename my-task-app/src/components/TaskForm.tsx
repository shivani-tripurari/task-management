import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Task, TaskStatus } from "../types/Task";
import { v4 as uuidv4 } from "uuid";

const TaskForm = () => {
  const { addTask } = useTaskContext();
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName || !dueDate || !category) return;

    const newTask: Task = {
      id: uuidv4(),
      name: taskName,
      dueDate,
      status: "Todo",
      category,
    };

    addTask(newTask);
    setTaskName("");
    setDueDate("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white rounded shadow">
      <div className="grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Category (e.g., Work, Personal)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="col-span-3 bg-blue-500 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
