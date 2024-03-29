import { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { ITask } from "../types/types";
import { deleteTodo, editTodo } from "@/api";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className='w-full'>{task.text}</td>
      <td className='flex gap-2'>
        <i className="pi pi-file-edit hover:cursor-pointer"   onClick={() => setOpenModalEdit(true)}></i>
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'>Edit task</h3>
            <div>
              <InputText value={taskToEdit} onChange={(e) => setTaskToEdit(e.target.value)} />
              <Button type='submit' className='btn'>
                Submit
              </Button>
            </div>
          </form>
        </Modal>
        <i className="pi pi-trash hover:cursor-pointer" onClick={() => setOpenModalDeleted(true)}></i>
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='flex w-full text-lg'>
            Are you sure, you want to delete this task?
          </h3>
          <div className='modal-action'>
            <button onClick={() => handleDeleteTask(task.id)} className='btn'>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;