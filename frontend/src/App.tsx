import { useState } from 'react';
import { TaskModal, TaskModalDelete } from './components/TaskModal';
import { useTasks } from './hooks/useTasks';
import { Plus, Trash, Pencil } from 'lucide-react';

function App() {
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [taskIdToDelete, setTaskIdToDelete] = useState<number | null>(null)
  const { tasks, loading, error, handleAddTask, handleDeleteTask } = useTasks()

  return (
    <>
      <div className='p-4'>
        <header className='border-b border-gray-300 pb-4'>
          <p>Este será el header</p>
        </header>
        <main className='p-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-bold m-2'>Lista de Tareas</h2>
            <button 
              className='bg-blue-300 text-black p-0.5 rounded m-2 hover:bg-blue-600 hover:cursor-pointer hover:text-white' 
              onClick={() => setShowModal(true)} 
              type='button'
            > 
              <Plus className='w-4 h-4' />
            </button>
            <TaskModal isOpen={showModal} onClose={() => setShowModal(false)} onAddTask={handleAddTask} />
            <TaskModalDelete 
              isOpen={showDeleteModal} 
              onClose={() => setShowDeleteModal(false)} 
              onDeleteTask={handleDeleteTask} 
              taskId={taskIdToDelete} 
            />
          </div>
          {loading && <p>Cargando...</p>}
          {error && <p>{error}</p>}
          <ul className=''>
            {Array.isArray(tasks) ? (
              tasks.map((task) => (
                <li key={task.id} className='border border-gray-300 rounded p-2 m-2 '>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-xl font-bold'>{task.title}</h3>
                    <div>
                      <button 
                        className='bg-red-300 text-black p-0.5 rounded m-2 hover:bg-red-600 hover:cursor-pointer hover:text-white'
                        onClick={() => {
                          setTaskIdToDelete(task.id);
                          setShowDeleteModal(true);
                        }}
                      >
                        <Trash className='w-4 h-4' />
                      </button>
                      <button className='bg-green-300 text-black p-0.5 rounded m-2 hover:bg-green-600 hover:cursor-pointer hover:text-white'>
                        <Pencil className='w-4 h-4' />
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className='text-gray-600'>{task.description}</p>
                    <p className='text-gray-600'>Completada: {task.completed ? 'Sí' : 'No'}</p>
                  </div>
                </li>
              ))
            ) : (
              !loading && !error && <p>No se pudieron cargar las tareas correctamente.</p>
            )}
          </ul>

        </main>
        <footer>
          <p>Este será el footer</p>
        </footer>
      </div>
    </>
  )
}

export default App
