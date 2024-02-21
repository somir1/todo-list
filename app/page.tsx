"use client"; 

import React, { useEffect, useState } from 'react'; 
import AddTask from "./components/AddTask";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import TodoList from './components/TodoList';
import { getAllTodos } from '@/api';
import { ITask } from './types/types';

const Home = () => {  

  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const fetchedTasks = await getAllTodos();
      setTasks(fetchedTasks);
    };

    fetchTasks();
  }, []);

  return (
  
    <main className="flex flex-col justify-center bg-gray-400 pt-4 w-full gap-2">
      <div className='text-center mb-4 flex flex-col'>
        <h1 className='text-2xl'>Todo List</h1>
        <AddTask/>
      </div>    
      <TodoList tasks={tasks} />
    </main>
 
  );
}

export default Home
