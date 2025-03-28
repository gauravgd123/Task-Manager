import { useState } from "react";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



const TaskForm = ({ refreshTasks }) => {
  const [task, setTask] = useState({ title: "", description: "", completed: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${API_BASE_URL}/api/tasks`, {
      ...task,
      completed: Boolean(task.completed), 
    });

    setTask({ title: "", description: "", completed: false });
    refreshTasks();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-lg">
      <input
        type="text"
        placeholder="Title"
        className="border p-2 w-full mb-2"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        className="border p-2 w-full mb-2"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      <select
        className="border p-2 w-full mb-2"
        value={task.completed}
        onChange={(e) => setTask({ ...task, completed: e.target.value === "true" })} 
      >
        <option value="false">Pending</option>
        <option value="true">Completed</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
