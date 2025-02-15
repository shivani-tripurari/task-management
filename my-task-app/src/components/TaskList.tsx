import { DndContext, closestCorners } from "@dnd-kit/core";
import TaskColumn from "./TaskColumn";
import { useTaskContext } from "../context/TaskContext";
import { TaskStatus,Task} from "../types/Task";

const TaskList = ({ boardView = false, categoryFilter, dueDateFilter, searchQuery }: { 
  boardView?: boolean;
  categoryFilter?: string;
  dueDateFilter?: string;
  searchQuery?: string;
}) => {
  const { tasks, updateTaskStatus } = useTaskContext();

  // Filter tasks based on category, due date, and search query
  const filteredTasks = tasks.filter((task) => {
    const categoryMatches = categoryFilter ? task.category === categoryFilter : true;
    const dueDateMatches = dueDateFilter ? task.dueDate === dueDateFilter : true;
    const searchMatches = searchQuery ? task.name?.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return categoryMatches && dueDateMatches && searchMatches;
  });

  const groupedTasks: Record<TaskStatus, Task[]> = {
    Todo: filteredTasks.filter((task) => task.status === "Todo"),
    "In-Progress": filteredTasks.filter((task) => task.status === "In-Progress"),
    Completed: filteredTasks.filter((task) => task.status === "Completed"),
  };
  

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
  
    // Find the new status based on where the task was dropped
    const newStatus = over.id as TaskStatus;
    
    updateTaskStatus(active.id, newStatus); // Update status correctly
  };
  

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
  <div className={`flex ${boardView ? "flex-row gap-4" : "flex-col"} w-full`}>
    {Object.entries(groupedTasks).map(([status, tasks]) => (
      <TaskColumn key={status} status={status} tasks={tasks} />
    ))}
  </div>
</DndContext>

  );
};

export default TaskList;