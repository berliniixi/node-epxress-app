const Task = require('../models/Tasks')

const getAllTasks = async (req,res) => {
    try {
        const tasks = await Task.find({})
        res.status(200).json({tasks: tasks})
    } catch (error) {
        res.status(500).json(error)
    }    
}

const createTask = async (req,res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json(error.errors.name.properties)
    }
}


const getTaskById = async (req,res) => {
    try {
        const {id: taskID} = req.params
        const task = await Task.findOne({_id: taskID})

        if(!task){
            return res.status(404).json({success: false , msg: `No task with id ${taskID}` })
        }

        res.status(200).json({task})
    } catch (error) {
        console.log("err: ", error);
        res.status(500).json(error)
    }
}

const updateTaskById = async (req,res) => {
    try {
        const {id: taskID} = req.params

        const taskToUpdate = await Task.findByIdAndUpdate({_id: taskID}, req.body,{new:true, runValidators:true})

        if (!taskToUpdate) {
            return res.status(404).json({ success: false, msg: "Task not found." });
        }
        res.status(200).json({ success: true, msg: "Task updated successfully.", taskToUpdate });

    } catch (error) {
        res.status(500).json({ success: false, error: error.errors.name.properties });
    }
}

const deleteTaskById = async (req,res) => {
    try {
        const {id: taskID} = req.params
        const taskToDelete = await Task.findOneAndDelete({_id: taskID})
        if (!taskToDelete) {
            return res.status(404).json({ success: false, msg: "Task not found." });
        }
        res.status(200).json({ success: true, msg: "Task deleted successfully." });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ success: false, error: error });
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTaskById,
    deleteTaskById
}