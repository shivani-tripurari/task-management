import { createContext, useContext, useState, ReactNode } from "react";
import { Task, TaskStatus } from "../types/Task";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (updatedTask: Task) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
  filterTasks: (category?: string, tags?: string[], dateRange?: { start: string; end: string }) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
    setFilteredTasks([...tasks, task]);
  };

  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setFilteredTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const updateTaskStatus = (id: string, status: TaskStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
    setFilteredTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setFilteredTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const filterTasks = (category?: string, tags?: string[], dateRange?: { start: string; end: string }) => {
    setFilteredTasks(
      tasks.filter((task) =>
        (category ? task.category === category : true) &&
        (tags && tags.length > 0 ? tags.every(tag => task.tags?.includes(tag)) : true) &&
        (dateRange?.start && dateRange?.end
          ? new Date(task.dueDate || "").getTime() >= new Date(dateRange.start).getTime() &&
            new Date(task.dueDate || "").getTime() <= new Date(dateRange.end).getTime()
          : true)
      )
    );
  };

  return (
    <TaskContext.Provider value={{ tasks: filteredTasks, addTask, updateTask, updateTaskStatus, deleteTask, filterTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
