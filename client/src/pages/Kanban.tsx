import Header from "../components/Header";
import Column from "../components/Column";
import { initialTasks } from "../simulate_data/tasks.ts";
import { useState } from "react";

export default function Kanban() {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Column title="To Do" tasks={tasks.todo} />
        <Column title="Doing" tasks={tasks.doing} />
        <Column title="Done" tasks={tasks.done} />
      </div>
    </div>
  );
}