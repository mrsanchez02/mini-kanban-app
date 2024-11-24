import { useDroppable } from '@dnd-kit/core'
import { Column as ColumnInterface, Task} from '../App'
import TaskCard from './TaskCard'

type ColumnProps = {
  column: ColumnInterface
  tasks?: Task[]
}

const Column = ({column, tasks = []}: ColumnProps) => {

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className='flex w-80 flex-col rounded-lg bg-neutral-800 p-4'>
      <h2 className='mb-4 font-semibold text-neutral-100'>{column.title}</h2>
      <div ref={setNodeRef} className='flex flex-1 flex-col gap-4'>
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>

    </div>
  )
}

export default Column
