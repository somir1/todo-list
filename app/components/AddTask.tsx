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
    // const [selectedCity, setSelectedCity] = useState(null);
    // const cities = [
    //     { name: 'New York', code: 'NY' },
    //     { name: 'Rome', code: 'RM' },
    //     { name: 'London', code: 'LDN' },
    //     { name: 'Istanbul', code: 'IST' },
    //     { name: 'Paris', code: 'PRS' }
    // ];

    // const [value, setValue] = useState(0);

    // const items = [
    //     {
    //         label: 'Update',
    //         icon: 'pi pi-refresh',
    //         // command: () => {
    //         //     toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
    //         // }
    //     },
    //     {
    //         label: 'Delete',
    //         icon: 'pi pi-times',
    //         // command: () => {
    //         //     toast.current.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
    //         // }
    //     },
    //     {
    //         label: 'React Website',
    //         icon: 'pi pi-external-link',
    //         command: () => {
    //             window.location.href = 'https://reactjs.org/';
    //         }
    //     },
    //     {
    //         label: 'Upload',
    //         icon: 'pi pi-upload',
    //         command: () => {
    //             //router.push('/fileupload');
    //         }
    //     }
    // ];

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
        <Button label='Add a Task'  onClick={() => setModalOpen(true)} />

        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg'>Add new task</h3>
          <div className='modal-action flex gap-8 mt-4'>
          <InputText value={newTaskValue} onChange={(e) => setNewTaskValue(e.target.value)} />
          <Button label='Submit' type='submit'/>
          </div>
        </form>
        </Modal>

        {/* <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name" 
        placeholder="Select a City" className="w-full md:w-14rem" />
        <Knob value={value} onChange={(e) => setValue(e.value)} valueTemplate={'{value}%'} />
        <SplitButton label="Save" icon="pi pi-plus"  model={items} /> */}
    </div>
    )
}

export default AddTask