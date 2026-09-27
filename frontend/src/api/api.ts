// Estructura que espero del backend
export interface Task {
    id: number;
    title:string;
    description:string;
    completed:boolean;
}

const url: string = 'http://localhost:8000/api/tasks'

// Función para obtener las tareas desde el backend
export async function getTasks(): Promise<Task[]> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Error al obtener las tareas');
    }
    const data: Task[] = await response.json();
    console.log("Datos reales que llegan del backend:", data); 
    return data.results;
}

// Función para agregar una nueva tarea al backend
export async function addTask(title: string, description: string): Promise<Task> {
    const response = await fetch(`${url}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
        throw new Error('Error al agregar la tarea');
    }

    const data: Task = await response.json();
    return data;
}

// Función para eliminar una tarea del backend
export async function deleteTask(id: number): Promise<void> {
    const response = await fetch(`${url}/${id}/`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Error al eliminar la tarea');
    }
}

// Función para actualizar una tarea en el backend
export async function updateTask(id: number, title: string, description: string): Promise<Task> {
    const response = await fetch(`${url}/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description}),
    });

    if (!response.ok) {
        throw new Error('Error al actualizar la tarea');
    }

    console.log(response)
    const data: Task = await response.json();
    console.log(data)
    return data;
}

// Función para completar tarea
export async function completeTask(id:number, completed: boolean): Promise<Task> {
    const response = await fetch(`${url}/${id}/`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({completed}),
    });

    if (!response.ok) {
        throw new Error('Error al actualizar la tarea')
    }

    const data: Task = await response.json();
    console.log(data)
    return data;
}