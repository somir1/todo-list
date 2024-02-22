import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

interface ModalProps {
    modalOpen: boolean;
    setModalOpen: (open: boolean) => boolean | void;
    children: React.ReactNode;
    isNewTask?: boolean
  }
  
  const Modal: React.FC<ModalProps> = ({ modalOpen, setModalOpen, children, isNewTask = false }) => {
    return (
        <div className="card flex  justify-content-center">
            {isNewTask && (
                <Button label="Add a list" icon="pi pi-plus" iconPos="right" onClick={() => setModalOpen(true)} />
            )}
            <Dialog className='rounded-3xl'header={isNewTask ? "New item" : "Edit item"} visible={modalOpen} style={{ width: '30vw' }} onHide={() => setModalOpen(false)}>
                <p className="m-0 mt-2">
                    {children}
                </p>
            </Dialog>
        </div>
    );
};
  
  export default Modal;
