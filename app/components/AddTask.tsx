"use client";

import React, { useState, FormEventHandler } from 'react'; 
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import { addTodo } from '@/api';
import { InputText } from "primereact/inputtext";
import { ITask } from '../types/types';


const { v4: uuidv4 } = require('uuid');
        
interface AddTaskProps {
  tasks: ITask[];
  setTasks: React.Dispatch<React.SetStateAction<ITask[]>>;
}
    

const AddTask: React.FC<AddTaskProps> = ({ tasks, setTasks }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
      const newTask = {
        id: uuidv4(),
        text: newTaskValue,
      };
      await addTodo(newTask);
      setTasks([...tasks, newTask]); 
      setNewTaskValue("");
      setModalOpen(false);
  };

    return (
    <div className='flex flex-col justify-center items-center gap-2'>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} isNewTask={true}>
        <form onSubmit={handleSubmitNewTodo}>
          <div className='gap-2'>
            <InputText
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type='text'
              placeholder='Type here'
              className='input input-bordered w-full'
            />
            <Button type='submit'>
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AddTask