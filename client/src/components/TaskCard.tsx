import { useDraggable } from "@dnd-kit/core";
import type { TaskDTO } from "@kanban/types";
import {LucideTrash, LucidePencil} from "lucide-react"

type TaskCardProps = {
  task: TaskDTO;
  onDelete: (taskId: number) => void;
  onEdit: (task: TaskDTO) => void;
};

export default function TaskCard({ task, onDelete, onEdit }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-slate-600 p-4 rounded-xl shadow-md mb-4">

      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold">{task.title}</h3>
          <p className="text-gray-300 text-sm">{task.description}</p>
        </div>

        <div className="flex items-start gap-1 pl-2">
          <button
            type="button"
            {...listeners}
            {...attributes}
            className="select-none touch-none cursor-grab active:cursor-grabbing text-gray-200 px-2 py-1 rounded hover:bg-slate-500"
            title="Arrastar tarefa"
            aria-label="Arrastar tarefa">
            ⠿
          </button>

          <button
            type="button"
            className="cursor-pointer select-none px-2 py-1 rounded hover:bg-slate-500 text-white"
            aria-label="Editar tarefa"
            title="Editar"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}>
            <LucidePencil />
          </button>

          <button
            type="button"
            className="cursor-pointer select-none px-2 py-1 rounded hover:bg-slate-500 text-white"
            aria-label="Deletar tarefa"
            title="Deletar"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}>
            <LucideTrash />
          </button>
        </div>
      </div>
    </div>
  );
}