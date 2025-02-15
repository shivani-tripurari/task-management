import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task, TaskStatus } from "../types/Task";
import { useTaskContext } from "../context/TaskContext";
import TaskFormModal from "./TaskFormModal";

const TaskItem = ({ task }: { task: Task }) => {
  const { updateTaskStatus, deleteTask } = useTaskContext();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id ?? "fallback-id" });

  const handleStatusChange = (newStatus: TaskStatus) => {
    if (!task.id) return; 
    updateTaskStatus(task.id, newStatus);
    setDropdownOpen(false);
};


  return (
    <>
      <div
        ref={setNodeRef}
        style={{ transform: CSS.Transform.toString(transform), transition }}
        {...attributes}
        {...listeners}
        className="bg-white p-2 rounded shadow flex justify-between items-center cursor-grab relative"
      >
        <div>
          <h3 className="font-medium">{task.name}</h3>
          <p className="text-sm text-gray-600">Due: {task.dueDate}</p>
          <p className="text-sm text-gray-500">Category: {task.category}</p>
        </div>
        <div className="flex gap-2 items-center">
          {/* Dropdown for status change */}
          <div className="relative">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              {task.status} ▼
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 bg-white shadow-md rounded w-36">
                {["Todo", "In-progress", "Completed"].map((status) => (
                  <button
                    key={status}
                    className={`block w-full text-left px-3 py-1 text-sm hover:bg-gray-200 ${
                      task.status === status ? "bg-gray-300" : ""
                    }`}
                    onClick={() => handleStatusChange(status as TaskStatus)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
            onClick={() => setEditModalOpen(true)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            onClick={() => {
            if (task.id) deleteTask(task.id); 
            }}
          >
            Delete
          </button>

        </div>
      </div>

      {/* Edit Task Modal */}
      {isEditModalOpen && (
        <TaskFormModal
          task={task}
          closeModal={() => setEditModalOpen(false)}
        />
      )}
    </>
  );
};

export default TaskItem;
