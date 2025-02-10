import { useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

const TaskBoard = () => {
  const [view, setView] = useState<"list" | "board">("list");

  return (
    <div className="container mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Task Management</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setView(view === "list" ? "board" : "list")}
        >
          Switch to {view === "list" ? "Board" : "List"} View
        </button>
      </div>
      <div>
        <TaskForm/>
      </div>

      {view === "list" ? <TaskList /> : <TaskList boardView />}
    </div>
  );
};

export default TaskBoard;
