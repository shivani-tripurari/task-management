import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn";
import { useTaskContext } from "../context/TaskContext";

const TaskList = ({ boardView = false }: { boardView?: boolean }) => {
  const { tasks, updateTaskStatus } = useTaskContext();

  const groupedTasks = {
    Todo: tasks.filter((task) => task.status === "Todo"),
    "In-progress": tasks.filter((task) => task.status === "In-progress"),
    Completed: tasks.filter((task) => task.status === "Completed"),
  };

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    updateTaskStatus(active.id, over.id);
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
      <div className={`flex ${boardView ? "flex-row gap-4" : "flex-col"} w-full`}>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <TaskColumn key={status} status={status} tasks={tasks} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default TaskList;
