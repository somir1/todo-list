"use client";

import React, { useState, FormEventHandler } from 'react'; 
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Knob } from 'primereact/knob';
import { SplitButton } from 'primereact/splitbutton';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import { addTodo } from '@/api';
import { InputText } from "primereact/inputtext";


const { v4: uuidv4 } = require('uuid');
        
        
    

const AddTask = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [newTaskValue, setNewTaskValue] = useState<string>("");

    const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await addTodo({
          id: uuidv4(),
          text: newTaskValue,
        });
        setNewTaskValue("");
        setModalOpen(false);
        router.refresh();

    };

    return (
    <div className='flex flex-col justify-center items-center gap-2'>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} isNewTask={true}>
        <form onSubmit={handleSubmitNewTodo}>
          <div className='gap-2'>
            <input
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