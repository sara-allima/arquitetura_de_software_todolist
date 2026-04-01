import Header from "../components/Header";
import Column from "../components/Column";
import AddTaskModal from "../components/AddTaskModal";
import { useEffect, useState } from "react";
import {
  createTask,
  deleteTask as deleteTaskService,
  updateTask as updateTaskService,
  getTasks,
  groupByStatus,
  type TasksByColumn} from '../services/tasks'
import { DndContext } from "@dnd-kit/core";
import type { CreateTaskInput, TaskDTO, UpdateTaskInput } from "@kanban/types";

export default function Kanban() {
  const [tasks, setTasks] = useState<TasksByColumn>({
    todo: [],
    doing: [],
    done: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskDTO | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        setLoading(true);
        const data = await getTasks();
        setTasks(groupByStatus(data));
      } catch (err) {
        setError("Erro ao carregar as tarefas.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;


  async function handleDragEnd(event) {
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

    const taskToUpdate: UpdateTaskInput = {
      status: destCol,
    };
  
    try {
      await updateTaskService(movedTask.id, taskToUpdate);
    } catch {
      setTasks((prev) => ({
        ...prev,
        [destCol]: prev[destCol].filter((t) => t.id !== active.id),
        [sourceCol]: [...prev[sourceCol], movedTask],
      }));
    }
  }

  async function addTask(task: TaskDTO) {
    const taskToPersist: CreateTaskInput = {
      title: task.title,
      description: task.description || undefined,
    };
  
    await createTask(taskToPersist);
  
    const updatedTasks = await getTasks();
  
    setTasks(groupByStatus(updatedTasks));
  }

  async function deleteTask(taskId: number) {

    await deleteTaskService(taskId);

    const updatedTasks = await getTasks();
  
    setTasks(groupByStatus(updatedTasks));
  }

  function openEdit(task: TaskDTO) {
    setEditingTask(task);
    setIsModalOpen(true);
  }

  async function updateTask(updatedData: TaskDTO) {

    const taskToUpdate: UpdateTaskInput = {
      title: updatedData.title,
      description: updatedData.description || undefined,
    };
  
    await updateTaskService(updatedData.id, taskToUpdate);
  
    const updatedTasks = await getTasks();
  
    setTasks(groupByStatus(updatedTasks));

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