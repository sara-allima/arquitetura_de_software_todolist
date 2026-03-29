import { useState } from "react";

export default function AddTaskModal({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({ title, description });
    setTitle("");
    setDescription("");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-xl w-96">
        <h2 className="text-white text-lg mb-4">Adicionar Tarefa</h2>

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
          <button type="submit" className="bg-blue-600 px-3 py-1 rounded text-white cursor-pointer">Adicionar</button>
        </div>
      </form>
    </div>
  );
}