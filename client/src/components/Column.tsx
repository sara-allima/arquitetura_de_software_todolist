import { useDroppable } from "@dnd-kit/core";
import type { TaskDTO, TaskStatus } from "@kanban/types";
import TaskCard from "./TaskCard";

type ColumnProps = {
  id: TaskStatus;
  title: string;
  tasks: TaskDTO[];
  onDelete: (taskId: number) => void;
  onEdit: (task: TaskDTO) => void;
};

export default function Column({ id, title, tasks, onDelete, onEdit }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="bg-slate-800 p-4 rounded-2xl w-full min-h-[300px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-semibold text-lg">{title}</h2>
        <span className="bg-slate-700 text-white text-sm px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onDelete={() => onDelete(task.id)} onEdit={() => onEdit(task)} />
      ))}
    </div>
  );
}   