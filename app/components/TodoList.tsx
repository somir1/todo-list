import React, { useEffect, useState } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { ITask } from "../types/types";
import { getAllTodos } from '@/api'; // Make sure the path is correct
import ActionTemplate from './actionTemplate';

interface TodoListProps {
 
}

const TodoList: React.FC<TodoListProps> = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true); 
      const fetchedTasks = await getAllTodos();
      setTasks(fetchedTasks);
      setIsLoading(false); 
    };
  
    fetchTasks();
  }, []);

  const tasksWithStructure = tasks.map(task => ({
    key: task.id,
    data: task,
  }));

  const actionBodyTemplate = (rowData: ITask) => {
    return <ActionTemplate task={rowData} key={rowData.id} />;
  };

  return (
    <div className="flex justify-center items-center w-full px-8 rounded-md">
      <TreeTable value={tasksWithStructure} tableStyle={{ minWidth: '70rem' }}>
        <Column field="id" header="ID" />
        <Column field="text" header="Task" />
        <Column body={actionBodyTemplate} header="Actions" />
      </TreeTable>
    </div>
  );
};

export default TodoList;
