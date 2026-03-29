export default function Header({ onAdd }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Kanban Board</h1>
        <p className="text-gray-400">Organize suas tarefas com o sistema Kanban!</p>
      </div>

      <button type="button"
        onClick={onAdd}
        className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg cursor-pointer">
        + Adicionar Tarefa
      </button>
    </div>
  );
}