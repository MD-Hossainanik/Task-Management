import { useState } from "react";

const AddTaskModal = ({ onCloseClick, onSave, taskToUpdate }) => {
  const [task, setTask] = useState(taskToUpdate||{
    id:crypto.randomUUID(),
    title: "",
    description: "",
    tags: [],
    priority: "",
    isFavorite: false,
  });

  const [isAdd, setIsAdd] = useState(Object.is(taskToUpdate, null));

  function handleChange(e) {
    if (e.target.name === "tags") {
      setTask({
        ...task,
        [e.target.name]: e.target.value.split(","),
      });
    } else {
      setTask({
        ...task,
        [e.target.name]: e.target.value,
      });
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/55 z-50 flex items-center justify-center">
        {/* Modal Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(task, isAdd);
          }}
          className="mx-auto w-full max-w-[480px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#0a1128] p-6 max-md:px-4 relative max-h-[80vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onCloseClick}
            className="absolute top-3 right-3 text-white text-lg w-8 h-8 rounded-full hover:bg-red-500 cursor-pointer transition-colors flex items-center justify-center"
          >
            ✕
          </button>

          <h2 className="mb-6 text-center text-xl font-bold text-white">
            {taskToUpdate ? "Edit Task" : "Add New Task"}
          </h2>

          <div className="space-y-5 text-white">
            {/* title */}
            <div className="space-y-1.5">
              <label htmlFor="title">Title</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2"
                type="text"
                name="title"
                id="title"
                value={task.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* description */}
            <div className="space-y-1.5 lg:space-y-3">
              <label htmlFor="description">Description</label>
              <textarea
                className="block min-h-[80px] w-full rounded-md bg-[#2D323F] px-3 py-2"
                name="description"
                id="description"
                value={task.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* tags & priority */}
            <div className="grid grid-cols-2 gap-x-4">
              <div className="space-y-1.5">
                <label htmlFor="tags">Tags</label>
                <input
                  className="block w-full rounded-md bg-[#2D323F] px-3 py-2"
                  type="text"
                  name="tags"
                  id="tags"
                  value={task.tags}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="priority">Priority</label>
                <select
                  className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2"
                  name="priority"
                  id="priority"
                  value={task.priority}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:opacity-80"
              
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddTaskModal;
