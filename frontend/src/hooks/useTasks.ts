import { useState, useEffect } from 'react'
import { getTasks, addTask, deleteTask, updateTask } from '../api/api'
import type { Task } from '../api/api'

export interface UseTasksReturn {
  tasks: Task[]
  loading: boolean
  error: string | null
  handleAddTask: (title: string, description: string) => Promise<void>
  handleDeleteTask: (id: number) => Promise<void>
  handleUpdateTask: (id: number, title: string, description: string) => Promise<void>
}

export function useTasks(): UseTasksReturn {
  const [tasks, setTasks] = useState<Task[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true)
      try {
        const tasksData = await getTasks()
        setTasks(tasksData)
      } catch (err) {
        setError('Error al obtener las tareas')
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()
  }, [])

  const handleAddTask = async (title: string, description: string) => {
    try {
      const newTask = await addTask(title, description)
      setTasks((prevTasks) => [...prevTasks, newTask])
    } catch (err) {
      setError('Error al agregar la tarea')
    }
  }

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id)
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    } catch (err) {
      setError('Error al eliminar la tarea')
    }
  }

  const handleUpdateTask = async (id: number, title: string, description: string) => {
    try {
      const updatedTask = await updateTask(id, title, description)
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? updatedTask : task)))
    } catch (err) {
      setError('Error al actualizar la tarea')
    }
  }

  return {
    tasks,
    loading,
    error,
    handleAddTask,
    handleDeleteTask,
    handleUpdateTask,
  }
}
