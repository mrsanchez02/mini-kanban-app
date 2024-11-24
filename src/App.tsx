import { useState } from "react";
import Column from "./components/Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Modal from "./components/Modal";

export interface Column {
  id: string;
  title: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

const COLUMNS: Column[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const INITIAL_TASKS: Task[] = [
  { id: "1", title: "Research Project", description: "Gather requirements and create initial documentation", status: "TODO" },
  { id: "2", title: "Design System", description: "Create component library and design tokens", status: "TODO" },
  { id: "3", title: "API Integration", description: "Implement REST API endpoints", status: "IN_PROGRESS" },
  { id: "4", title: "Testing", description: "Write unit tests for core functionality", status: "DONE" },
  { id: "5", title: "Deployment", description: "Deploy application to production server", status: "DONE" },
  { id: "6", title: "Performance Optimization", description: "Optimize application performance", status: "DONE" },
];

function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingTask, setPendingTask] = useState<Task | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    // Encuentra la tarea que se está moviendo
    const task = tasks.find((task) => task.id === taskId);
    if (!task) return;

    if (newStatus === "DONE") {
      // Si se mueve a la columna Done, abre el modal para confirmar
      setPendingTask({ ...task, status: newStatus });
      setIsModalOpen(true);
    } else {
      // Actualiza el estado directamente si no es "DONE"
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === taskId ? { ...t, status: newStatus } : t
        )
      );
    }
  };

  const handleConfirm = () => {
    if (pendingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === pendingTask.id
            ? { ...task, status: pendingTask.status }
            : task
        )
      );
    }
    setIsModalOpen(false);
    setPendingTask(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setPendingTask(null);
  };

  return (
    <>
      <div className="p-4">
        <div className="flex gap-8">
          <DndContext onDragEnd={handleDragEnd}>
            {COLUMNS.map((column) => {
              return (
                <Column
                  column={column}
                  key={column.id}
                  tasks={tasks.filter((task) => task.status === column.id)}
                />
              );
            })}
          </DndContext>
        </div>
      </div>

      {/* Modal de confirmación */}
      <Modal
        isOpen={isModalOpen}
        title="Confirm Move"
        message={`Are you sure you want to move "${pendingTask?.title}" to Done?`}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}

export default App;
