import { useState } from 'react'
import { TaskModal } from './components/TaskModal'
import { useTasks } from './hooks/useTasks'

function App() {
  const [showModal, setShowModal] = useState(false)
  const { tasks, loading, error, handleAddTask } = useTasks()

  return (
    <>
      <div className='p-4'>
        <header className='border-b border-gray-300 pb-4'>
          <p>Este será el header</p>
        </header>
        <main className='p-4'>
          <h2 className='text-2xl font-bold m-2'>Lista de Tareas</h2>
          {loading && <p>Cargando...</p>}
          {error && <p>{error}</p>}
          <ul className=''>
            {Array.isArray(tasks) ? (
              tasks.map((task) => (
                <li key={task.id} className='border border-gray-300 rounded p-2 m-2'>
                  <h3 className='text-xl font-bold'>{task.title}</h3>
                  <p className='text-gray-600'>{task.description}</p>
                  <p className='text-gray-600'>Completada: {task.completed ? 'Sí' : 'No'}</p>
                </li>
              ))
            ) : (
              !loading && !error && <p>No se pudieron cargar las tareas correctamente.</p>
            )}
          </ul>
          <button 
            className='bg-blue-500 text-white p-2 rounded m-2 hover:bg-blue-600 hover:cursor-pointer' 
            onClick={() => setShowModal(true)} 
            type='button'
          > 
            Agregar Tarea 
          </button>
          <TaskModal isOpen={showModal} onClose={() => setShowModal(false)} onAddTask={handleAddTask} />
          <button className='bg-red-500 text-white p-2 rounded m-2 hover:bg-red-600 hover:cursor-pointer'>Eliminar Tarea</button>
          <button className='bg-green-500 text-white p-2 rounded m-2 hover:bg-green-600 hover:cursor-pointer'>Editar Tarea</button>
        </main>
        <footer>
          <p>Este será el footer</p>
        </footer>
      </div>
    </>
  )
}

export default App
