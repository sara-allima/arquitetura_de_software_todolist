export default function Header() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-4xl font-bold text-white">Kanban Board</h1>
        <p className="text-gray-400">
          Organise suas tarefas no estilo Kanban
        </p>
      </div>

      <button type="button" className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
        + Adicionar Tarefa
      </button>
    </div>
  );
}
