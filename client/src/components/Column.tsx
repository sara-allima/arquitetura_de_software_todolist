import TaskCard from "./TaskCard";

export default function Column({ title, tasks }) {
  return (
    <div className="bg-slate-800 p-4 rounded-2xl w-full ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white font-semibold text-lg">{title}</h2>
        <span className="bg-slate-700 text-white text-sm px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}