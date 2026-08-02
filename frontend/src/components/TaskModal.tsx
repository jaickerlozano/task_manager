import { useState } from 'react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (taskTitle: string, taskDescription: string) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskTitle.trim() || !taskDescription.trim()) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    onAddTask(taskTitle, taskDescription);
    setTaskTitle('');
    setTaskDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Agregar Nueva Tarea</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700">
              Título de la Tarea
            </label>
            <input
              type="text"
              id="taskTitle"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-700">
              Descripción de la Tarea
            </label>
            <textarea
              id="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}