const Task = require("../models/Task");

// Fetch all tasks
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Fetch task by ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Add a new task
exports.addTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ title, description });
        const savedTask = await newTask.save();
        res.json(savedTask);
    } catch (error) {
        res.status(500).json({ error: "Error saving task" });
    }
};

// Update task
exports.updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) return res.status(404).json({ message: "Task not found" });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete task
exports.deleteTask = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
