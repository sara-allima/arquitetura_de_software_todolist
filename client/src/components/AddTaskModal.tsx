import { useState, useEffect } from "react";

export default function AddTaskModal({ isOpen, onClose, onSubmit, initialData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [initialData]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ title, description });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-xl w-96">
        <h2 className="text-white text-lg mb-4">
          {initialData ? "Editar Tarefa" : "Adicionar Tarefa"}
        </h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          className="w-full mb-3 p-2 rounded bg-slate-700 text-white" />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
          className="w-full mb-3 p-2 rounded bg-slate-700 text-white" />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="text-gray-400 cursor-pointer">Cancelar</button>
          <button type="submit" className="bg-blue-600 px-3 py-1 rounded text-white cursor-pointer">
            {initialData ? "Salvar" : "Adicionar"}
          </button>
        </div>
      </form>
    </div>
  );
}