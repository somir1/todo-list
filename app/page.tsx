"use client"; 

import React, { useEffect, useState } from 'react'; 
import AddTask from "./components/AddTask";
import TodoList from './components/TodoList';
import { ITask } from './types/types';
import { getAllTasks } from '@/api';


const Home = () => {  
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getAllTasks();
      console.log('Fetched Tasks:', fetchedTasks); 
      if (Array.isArray(fetchedTasks)) {
        setTasks(fetchedTasks);
      } else {
        console.error('Fetched tasks are not an array:', fetchedTasks);
        setTasks([]);
      }
    };
  
    fetchTasks();
  }, []);

  const removeTaskById = (taskId: string | number) => {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
  };

  const updateTaskInState = (updatedTaskContainer: { task: ITask }) => {
    setTasks(currentTasks => currentTasks.map(task => 
      task.id === updatedTaskContainer.task.id ? { ...updatedTaskContainer.task } : task));
};

  return (
    <main className="flex h-full flex-col justify-center pt-4 w-full gap-2">
      <div className='text-center mb-4 flex flex-col'>
        <h1 className='text-2xl'>Todo List</h1>
        <AddTask tasks={tasks} setTasks={setTasks}/>
      </div>    
      <TodoList tasks={tasks} onRemoveTask={removeTaskById}  onUpdateTask={updateTaskInState}/>
    </main>
 
  );
}

export default Home
