import { useState } from "react"
import Column from "./components/Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

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
  { id: 'TODO', title: 'To Do' },
  { id: 'IN_PROGRESS', title: 'In Progress' },
  { id: 'DONE', title: 'Done' }
]

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Research Project',
    description: 'Gather requirements and create initial documentation',
    status: 'TODO',
  },
  {
    id: '2',
    title: 'Design System',
    description: 'Create component library and design tokens',
    status: 'TODO',
  },
  {
    id: '3',
    title: 'API Integration',
    description: 'Implement REST API endpoints',
    status: 'IN_PROGRESS',
  },
  {
    id: '4',
    title: 'Testing',
    description: 'Write unit tests for core functionality',
    status: 'DONE',
  },
  {
    id: '5',
    title: 'Deployment',
    description: 'Deploy application to production server',
    status: 'DONE',
  },
  {
    id: '6',
    title: 'Performance Optimization',
    description: 'Optimize application performance',
    status: 'DONE',
  }
]

function App() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);


  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string; // or whatever object you're using to identify tasks or cards
    const newStatus = over.id as Task['status']; // or whatever object you're using to identify columns or status

    setTasks(() => tasks.map(task => task.id === taskId
      ? { ...task, status: newStatus }
      : task))

  }

  return (
    <div className="p-4">
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map(column => {
            return <Column column={column} key={column.id} tasks={tasks.filter(task => task.status === column.id)} />
          })}
        </DndContext>
      </div>
    </div>
  )
}

export default App
