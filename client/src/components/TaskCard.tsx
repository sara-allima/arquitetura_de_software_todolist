import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({ task, onDelete, onEdit }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-slate-600 p-4 rounded-xl shadow-md mb-4 cursor-grab">

      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white font-semibold">{task.title}</h3>
          <p className="text-gray-300 text-sm">{task.description}</p>
        </div>

        <div className="flex gap-2">
          <button onClick={() => onEdit(task)} className="text-yellow-400">✏️</button>
          <button onClick={() => onDelete(task.id)} className="text-red-400">🗑</button>
        </div>
      </div>
    </div>
  );
}