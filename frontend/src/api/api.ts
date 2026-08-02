// Estructura que espero del backend
export interface Task {
    id: number;
    title:string;
    description:string;
    completed:boolean;
}

// Función para obtener las tareas desde el backend
export async function getTasks(): Promise<Task[]> {
    const response = await fetch('http://localhost:8000/api/tasks');

    if (!response.ok) {
        throw new Error('Error al obtener las tareas');
    }
    const data: Task[] = await response.json();
    console.log("Datos reales que llegan del backend:", data); 
    return data.results;
}