import { useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import { useTaskContext } from "../context/TaskContext";

const TaskBoard = () => {
  const [view, setView] = useState<"list" | "board">("list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(""); 
  const [dueDateFilter, setDueDateFilter] = useState(""); 
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  const { tasks } = useTaskContext();
  const categories = [...new Set(tasks.map((task) => task.category))]; // Get unique categories

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">TaskBuddy</h1>
      </div>

        <div className="mb-2 flex gap-2 justify-left items-start">
          {/* view */}
          <button
            className={`px-4 py-2 rounded ${view === "list" ? "border-b-4 border-b-black text-black" : "bg-transparent text-gray-500"}`}
            onClick={() => setView("list")}
          >
            List View
          </button>
          <button
            className={`px-4 py-2 rounded ${view === "board" ? "border-b-4 border-b-black text-black" : "bg-transparent text-gray-500"}`}
            onClick={() => setView("board")}
          >
            Board View
          </button>
        </div>
      {/* Filters, search, add */}
      <div className="flex justify-between items-center">
      <div className="mb-4 flex justify-center items-center gap-4">
        {/* Category Filter */}
        <h3 className="font-semibold text-gray-500">Filter by :</h3>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-400 rounded-full"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {/* Due Date Filter */}
        <input
          type="date"
          value={dueDateFilter}
          onChange={(e) => setDueDateFilter(e.target.value)}
          className="px-4 py-2 border border-gray-400 rounded-full"
        />

      </div>
      <div className="mb-4 flex gap-2 justify-end items-center">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-400 rounded-full w-64"
        />
        {/* add task */}
          <button className="px-8 py-2 bg-[#7B1984] text-white rounded-full" onClick={() => setIsModalOpen(true)}>
            Add Task
          </button>

      </div>
      </div>

      {/* Task Form Modal */}
      {isModalOpen && <TaskForm closeModal={() => setIsModalOpen(false)} />}

      {/* Pass filters & search query to TaskList */}
      {view === "list" ? (
        <TaskList categoryFilter={categoryFilter} dueDateFilter={dueDateFilter} searchQuery={searchQuery} />
      ) : (
        <TaskList boardView categoryFilter={categoryFilter} dueDateFilter={dueDateFilter} searchQuery={searchQuery} />
      )}
    </div>
  );
};

export default TaskBoard;
