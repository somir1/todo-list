'use client'

import React, { useState, FormEventHandler } from 'react';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import Modal from "./Modal";
import { InputText } from "primereact/inputtext";
import { ITask } from '../types/types';
import { deleteTodo, editTodo } from "@/api";

interface ActionTemplateProps {
    task: {
        key: string,
        data: ITask
    };
}

const ActionTemplate: React.FC<ActionTemplateProps> = ({ task }) => {
    const router = useRouter();
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.data.text);

    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: task.data.id, 
            text: taskToEdit,
        });
        setOpenModalEdit(false);
        router.refresh(); 
    };

    const handleDeleteTask = async () => {
        await deleteTodo(task.data.id); 
        setOpenModalDeleted(false);
        router.refresh(); 
    };

    return (
        <div className="flex flex-wrap ">
            <Button type="button" icon="pi pi-pencil" onClick={() => setOpenModalEdit(true)} rounded />
            <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                <form onSubmit={handleSubmitEditTodo}>
                    <h3 className='font-bold text-lg'>Edit task</h3>
                    <div className='flex modal-action w-full gap-4 '>
                        <InputText value={taskToEdit} onChange={(e) => setTaskToEdit(e.target.value)} />
                        <Button label='Submit' type='submit' />
                    </div>
                </form>
            </Modal>
            <Button type="button" icon="pi pi-trash" onClick={() => setOpenModalDeleted(true)} className="p-button-rounded p-button-danger" />
            <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                <h3>Are you sure you want to delete this task?</h3>
                <div className='modal-action gap-2 flex flex-col'>
                    <Button label="Yes" onClick={handleDeleteTask} className="p-button-rounded p-button-danger" />
                    <Button label="No" onClick={() => setOpenModalDeleted(false)} className="p-button-rounded" />
                </div>
            </Modal>
        </div>
    );
};

export default ActionTemplate;
