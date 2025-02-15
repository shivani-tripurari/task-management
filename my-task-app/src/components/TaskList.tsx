import {UniqueIdentifier, DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn";
import { useTaskContext } from "../context/TaskContext";

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
    const searchMatches = searchQuery ? task.name ?? "".toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return categoryMatches && dueDateMatches && searchMatches;
  });

  const groupedTasks = {
    Todo: filteredTasks.filter((task) => task.status === "Todo"),
    "In-progress": filteredTasks.filter((task) => task.status === "In-Progress"),
    Completed: filteredTasks.filter((task) => task.status === "Completed"),
  };

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    updateTaskStatus(active.id, over.id);
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
      <div className={`flex ${boardView ? "flex-row gap-4" : "flex-col"} w-full`}>
      <SortableContext 
          items={filteredTasks.map(task => task.id as UniqueIdentifier)} 
          strategy={verticalListSortingStrategy}
      >
        {Object.entries(groupedTasks).map(([status, tasks]) => (
          <TaskColumn key={status} status={status} tasks={tasks} />
        ))}
      </SortableContext>
      </div>
    </DndContext>
  );
};

export default TaskList;
