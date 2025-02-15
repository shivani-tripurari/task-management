import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Task } from "../types/Task";
import { useDropzone } from "react-dropzone";

const TaskFormModal = ({ task, closeModal }: { task: Task; closeModal: () => void }) => {
  const { updateTask } = useTaskContext();
  const [taskName, setTaskName] = useState(task.name);
  const [description, setDescription] = useState(task.description || "");
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [category, setCategory] = useState<"Work" | "Personal">(task.category as "Work" | "Personal");
  const [files, setFiles] = useState<File[]>(task.attachments || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName || !description || !dueDate || !category) return;

    const updatedTask: Task = {
      ...task,
      name: taskName,
      description,
      dueDate,
      category,
      attachments: files,
    };

    updateTask(updatedTask);
    closeModal();
  };

  // File drop handler
  const { getRootProps, getInputProps } = useDropzone({
    accept:{
      "image/*" : [],
      "application/pdf" : [],
    },
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full h-24 resize-none"
          ></textarea>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-2 rounded w-full"
          />

          {/* Category Selection */}
          <div className="flex justify-between">
            <button
              type="button"
              className={`px-4 py-2 rounded w-1/2 ${category === "Work" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
              onClick={() => setCategory("Work")}
            >
              Work
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded w-1/2 ${category === "Personal" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
              onClick={() => setCategory("Personal")}
            >
              Personal
            </button>
          </div>

          {/* File Upload Section */}
          <div
            {...getRootProps()}
            className="border-2 border-dashed border-gray-300 p-4 rounded text-center cursor-pointer"
          >
            <input {...getInputProps()} />
            <p>Drag & drop files here, or click to upload</p>
          </div>

          {/* Show selected files */}
          {files.length > 0 && (
            <ul className="mt-2 text-sm text-gray-600">
              {files.map((file, index) => (
                <li key={index} className="truncate">{file.name}</li>
              ))}
            </ul>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
