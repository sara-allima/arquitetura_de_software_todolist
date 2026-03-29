import Header from "../components/Header";
import Column from "../components/Column";
import AddTaskModal from "../components/AddTaskModal";
import { initialTasks } from "../simulate_data/tasks";
import { useState } from "react";
import { DndContext } from "@dnd-kit/core";

export default function Kanban() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    let sourceCol, movedTask;

    for (const col in tasks) {
      const found = tasks[col].find((t) => t.id === active.id);
      if (found) {
        sourceCol = col;
        movedTask = found;
      }
    }

    const destCol = over.id;
    if (sourceCol === destCol) return;

    setTasks((prev) => ({
      ...prev,
      [sourceCol]: prev[sourceCol].filter((t) => t.id !== active.id),
      [destCol]: [...prev[destCol], movedTask],
    }));
  }

  function addTask(task) {
    const newTask = { ...task, id: Date.now().toString() };

    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));
  }

  function deleteTask(taskId) {
    setTasks((prev) => {
      const newState = {};
      for (const col in prev) {
        newState[col] = prev[col].filter((t) => t.id !== taskId);
      }
      return newState;
    });
  }

  function openEdit(task) {
    setEditingTask(task);
    setIsModalOpen(true);
  }

  function updateTask(updatedData) {
    setTasks((prev) => {
      const newState = {};
      for (const col in prev) {
        newState[col] = prev[col].map((t) =>
          t.id === editingTask.id ? { ...t, ...updatedData } : t
        );
      }
      return newState;
    });

    setEditingTask(null);
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <Header onAdd={() => { setEditingTask(null); setIsModalOpen(true); }} />

      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Column id="todo" title="To Do" tasks={tasks.todo} onDelete={deleteTask} onEdit={openEdit} />
          <Column id="doing" title="Doing" tasks={tasks.doing} onDelete={deleteTask} onEdit={openEdit} />
          <Column id="done" title="Done" tasks={tasks.done} onDelete={deleteTask} onEdit={openEdit} />
        </div>
      </DndContext>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingTask(null); }}
        onSubmit={editingTask ? updateTask : addTask}
        initialData={editingTask}
      />
    </div>
  );
}