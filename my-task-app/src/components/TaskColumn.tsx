import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Task } from "../types/Task";
import TaskItem from "./TaskItem";

const TaskColumn = ({ status, tasks }: { status: string; tasks: Task[] }) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef} // ✅ Correct way to make it droppable
      className="p-4 bg-gray-200 rounded shadow w-full min-h-[200px]"
    >
      <h2 className="text-xl font-semibold mb-2">{status}</h2>
      <SortableContext items={tasks} strategy={rectSortingStrategy}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </SortableContext>
    </div>
  );
};

export default TaskColumn;
