import { IMovie, ITask } from "./app/types/types";


const baseUrl = 'http://localhost:3000';

export const getAllTodos = async (): Promise<ITask[]> => {
  const res = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' });
  const todos = await res.json();
  return todos;
}

export const getAllTasks = async (): Promise<ITask[]> => {
  const res = await fetch('/api/tasks', { cache: 'no-store' });
  const { tasks } = await res.json(); 
  return tasks;
};

export const addTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  });
  const newTodo = await res.json();
  return newTodo;
}

export const editTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`/api/tasks/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  const updatedTodo = await res.json();
  return updatedTodo;
}

export const deleteTodo = async (id: string): Promise<void> => {
  const response = await fetch(`/api/tasks/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete the task.');
  }
};
