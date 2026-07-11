import { useState } from "react";

import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";


const TaskBoard = () => {
  

  const [tasks, setTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function onSearch(searchTerm) {
    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setTasks([...filtered]);
  }

  function handleFavorite(taskId) {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, isFavorite: !task.isFavorite };
        } else {
          return task;
        }
      }),
    );
  }
  
  function handleAddEditTask(newTask,isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map(task => {
          if (task.id === newTask.id) {
            return newTask;
          } else {
            return task
          }
        })
      )
    }
    
    setShowAddModal(!showAddModal);
  }

  function handleDelete(deleteTask) {
    setTasks(
      tasks.filter((task) => {
         return task.id !== deleteTask.id
       })
     )
  }
  
  function handleDeleteAllClick() {
    setTasks([]);
  }

  function handleEdit(editTask) {
    setTaskToUpdate(editTask);
    setShowAddModal(!showAddModal);
    
  }

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onCloseClick={() => {
            setShowAddModal(!showAddModal);
            setTaskToUpdate(null);
          }}
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
        />
      )}
      <div className="container">
        {/* Search Box */}
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={onSearch} />
        </div>
        {/* Search Box Ends */}
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction
            onAddClick={() => setShowAddModal(true)}
            onDeleteAllClick={handleDeleteAllClick}
          />
          {
            tasks.length > 0 ?(<TaskList
              tasks={tasks}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onFav={handleFavorite}
            />) : (<NoTaskFound/>)
          }
        </div>
      </div>
    </section>
  );
};
export default TaskBoard;
