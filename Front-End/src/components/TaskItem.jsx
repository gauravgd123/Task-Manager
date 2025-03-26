import axios from "axios";

const TaskItem = ({ task, refreshTasks }) => {
  const toggleStatus = async () => {
    await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
        completed: !task.completed,
      });
    refreshTasks();
  };

  const deleteTask = async () => {
    await axios.delete(`http://localhost:5000/api/tasks/${task._id}`);
    refreshTasks();
  };

  return (
    <div className="p-4 bg-gray-100 shadow rounded flex justify-between">
      <div>
        <h3 className="font-bold">{task.title}</h3>
        <p>{task.description}</p>
        <p className={task.completed ? "text-green-500" : "text-red-500"}>
          {task.completed ? "Completed" : "Pending"}
        </p>
      </div>
      <div className="space-x-2">
        <button onClick={toggleStatus} className="bg-yellow-500 text-white px-2 py-1 rounded">
          Toggle
        </button>
        <button onClick={deleteTask} className="bg-red-500 text-white px-2 py-1 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
