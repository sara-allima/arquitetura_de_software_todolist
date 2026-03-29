import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({ task }) {
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
      <h3 className="text-white font-semibold">{task.title}</h3>
      <p className="text-gray-300 text-sm">{task.description}</p>
    </div>
  );
}