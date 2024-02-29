import React from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { ITask } from "../types/types";
import ActionTemplate from './actionTemplate';

interface TodoListProps {
  tasks: ITask[];
  onRemoveTask: (taskId: string) => void;
  onUpdateTask: (updatedTaskContainer: { task: ITask; }) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onRemoveTask, onUpdateTask  }) => {

  const tasksWithStructure = (tasks || []).map(task => ({
    key: task.id,
    data: task,
  }));

  const actionBodyTemplate = (rowData: { data: ITask }) => {
    return <ActionTemplate task={{data: rowData.data, key: rowData.data.id}} onRemoveTask={onRemoveTask} onUpdateTask={onUpdateTask} />;
  };

  return (
    <div className="flex justify-center items-center w-full px-8 rounded-md">
      <TreeTable className='flex' value={tasksWithStructure} tableStyle={{ minWidth: '70rem' }}>
        <Column field="id" header="ID" />
        <Column field="text" header="Task" />
        <Column body={actionBodyTemplate} header="Actions" />
      </TreeTable>
    </div>
  );
};

export default TodoList;
