import { useDraggable } from '@dnd-kit/core';
import { Task } from '../App'

type TaskCardProps = {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 1,
  } : undefined

  return (
    <div 
      ref={setNodeRef} 
      {...listeners}
      {...attributes} 
      className='cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md'
      style={style}
    >
      <h3 className='font-medium text-neutral-100'>{task.title}</h3>      
      <p className='mt-2 text-sm text-neutral-400'>{task.description}</p>
    </div>
  )
}

export default TaskCard
