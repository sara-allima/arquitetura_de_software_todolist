import type { TaskDTO } from "@kanban/types";
import { useState, useEffect} from "react";

type AddTaskModalProps = {
  initialData?: TaskDTO | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: TaskDTO) => void;
};

export default function AddTaskModal({ isOpen, onClose, onSubmit, initialData }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description ? initialData.description : "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [initialData]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    if (initialData) {
      onSubmit({ ...initialData, title, description });
    } else {
      onSubmit({ title, description } as TaskDTO);
    }
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-xl w-96">
        <h2 className="text-white text-lg mb-4">
          {initialData ? "Editar Tarefa" : "Adicionar Tarefa"}
        </h2>

        {initialData ? <input type="hidden" name="id" value={initialData.id} /> : null}

        {initialData ? <input type="hidden" name="status" value={initialData.status} /> : null}

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