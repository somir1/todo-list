"use client"; 

import React from 'react'; 
import AddTask from "./components/AddTask";
import TodoList from './components/TodoList';

const Home = () => {  
  return (
  
    <main className="flex h-full flex-col justify-center pt-4 w-full gap-2">
      <div className='text-center mb-4 flex flex-col'>
        <h1 className='text-2xl'>Todo List</h1>
        <AddTask/>
      </div>    
      <TodoList />
    </main>
 
  );
}

export default Home
