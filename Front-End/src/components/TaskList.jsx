import { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaCheck, FaUndo, FaSearch } from "react-icons/fa";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

// API Functions
const getTasks = async () => await axios.get(API_URL);
const getTaskById = async (id) => await axios.get(`${API_URL}/${id}`);
const addTask = async (task) => await axios.post(API_URL, task);
const updateTask = async (id, task) => await axios.put(`${API_URL}/${id}`, task);
const deleteTask = async (id) => await axios.delete(`${API_URL}/${id}`);

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: "", description: "", completed: false });
    const [filter, setFilter] = useState("all");
    const [searchId, setSearchId] = useState("");
    const [searchedTask, setSearchedTask] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await getTasks();
            setTasks(res.data);
        } catch (err) {
            setError("Error fetching tasks.");
        }
    };

    const fetchTaskById = async () => {
        if (!searchId) return;
        try {
            const res = await getTaskById(searchId);
            setSearchedTask(res.data);
        } catch (err) {
            setSearchedTask(null);
            setError("Task not found.");
        }
    };

    const handleAddTask = async () => {
        if (!newTask.title) return;
        try {
            await addTask(newTask);
            setNewTask({ title: "", description: "", completed: false });
            fetchTasks();
        } catch (err) {
            setError("Error adding task.");
        }
    };

    const handleToggleComplete = async (task) => {
        try {
            await updateTask(task._id, { completed: !task.completed });
            fetchTasks();
        } catch (err) {
            setError("Error updating task.");
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await deleteTask(id);
            fetchTasks();
        } catch (err) {
            setError("Error deleting task.");
        }
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    return (
        <div className="p-6 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-lg mt-8">
            <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Add Task */}
            <div className="flex flex-col gap-3 mb-6">
                <input
                    className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Task Title"
                />
                <textarea
                    className="border p-2 rounded focus:outline-none focus:ring focus:ring-blue-300"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Task Description"
                />
                <button
                    className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    onClick={handleAddTask}
                >
                    <FaPlus className="mr-2" /> Add Task
                </button>
            </div>

            {/* Filter Buttons */}
            <div className="flex justify-between mb-4">
                <button className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setFilter("all")}>All</button>
                <button className={`px-3 py-1 rounded ${filter === "completed" ? "bg-green-500 text-white" : "bg-gray-200"}`} onClick={() => setFilter("completed")}>Completed</button>
                <button className={`px-3 py-1 rounded ${filter === "pending" ? "bg-red-500 text-white" : "bg-gray-200"}`} onClick={() => setFilter("pending")}>Pending</button>
            </div>

            {/* Search Task by ID */}
            <div className="flex gap-2 mb-4">
                <input
                    className="border p-2 rounded w-full focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    placeholder="Search Task by ID"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                />
                <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition" onClick={fetchTaskById}>
                    <FaSearch />
                </button>
            </div>

            {/* Searched Task */}
            {searchedTask && (
                <div className="p-3 mb-4 bg-white rounded-lg shadow-md border">
                    <p className="font-semibold">{searchedTask.title}</p>
                    <p className="text-gray-600 text-sm">{searchedTask.description}</p>
                </div>
            )}

            {/* Task List */}
            <ul className="space-y-3">
                {filteredTasks.map((task) => (
                    <li key={task._id} className="flex flex-col p-3 bg-white rounded-lg shadow-md border">
                        <div className="flex justify-between items-center">
                            <span className={task.completed ? "line-through font-semibold text-gray-500" : "font-semibold"}>{task.title}</span>
                            <div className="flex gap-2">
                                <button className="text-green-500" onClick={() => handleToggleComplete(task)}>
                                    {task.completed ? <FaUndo /> : <FaCheck />}
                                </button>
                                <button className="text-red-500" onClick={() => handleDeleteTask(task._id)}>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                        <p className="text-sm text-gray-700 mt-1">Status: {task.completed ? "✅ Completed" : "❌ Pending"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
