import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import { Task } from "../types/Task";
import { v4 as uuidv4 } from "uuid";
import { useDropzone } from "react-dropzone";

const TaskForm = ({ closeModal }: { closeModal: () => void }) => {
  const { addTask } = useTaskContext();
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState<"Work" | "Personal" | "">(""); // Default empty
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName || !description || !dueDate || !category) return;

    const newTask: Task = {
      id: uuidv4(),
      name: taskName,
      description,
      dueDate,
      status: "Todo",
      category,
      attachments: files,
    };

    addTask(newTask);
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
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className=" text-xl font-bold mb-4">Create Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="border p-2 rounded-lg border-gray-300 w-full"
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded-lg border-gray-300 w-full h-24 resize-none"
          ></textarea>
  <p>Due date</p>
          <input
            placeholder="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-2 rounded-lg border-gray-300 w-full"
          />

          {/* Category Selection - Only Work or Personal */}
          <p>Category</p>
          <div className="flex justify-start items-center gap-2">
            <button
              type="button"
              className={`px-4 py-2 rounded-full  ${category === "Work" ? "bg-[#7B1984] text-white" : "bg-transparent border border-gray-300 text-black"}`}
              onClick={() => setCategory("Work")}
            >
              Work
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-full  ${category === "Personal" ? "bg-[#7B1984] text-white" : "bg-transparent border border-gray-300 text-black"}`}
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
              className="px-4 py-2 bg-transparent border border-gray-300 rounded-full"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#7B1984] text-white rounded-full"
              disabled={!category} // Prevent submit if no category selected
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;