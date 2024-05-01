const Task = require('../models/Tasks')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')


const getAllTasks = asyncWrapper (async (req,res) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks: tasks}) 
})

const createTask = asyncWrapper (async (req,res) => {
    const task = await Task.create(req.body)
    res.status(201).json(task)
})


const getTaskById = asyncWrapper (async (req,res,next) => {
    const {id: taskID} = req.params
    const task = await Task.findOne({_id: taskID})

    if(!task){
        return next(createCustomError(`No task with id ${taskID}`, 404))
        // return res.status(404).json({success: false , msg: `No task with id ${taskID}` })
    }

    res.status(200).json({task})
    
})

const updateTaskById = asyncWrapper (async (req,res) => {
    const {id: taskID} = req.params

    const taskToUpdate = await Task.findByIdAndUpdate({_id: taskID}, req.body,{new:true, runValidators:true})

    if (!taskToUpdate) {
        return res.status(404).json({ success: false, msg: "Task not found." });
    }
    res.status(200).json({ success: true, msg: "Task updated successfully.", taskToUpdate });
})

const deleteTaskById = asyncWrapper (async (req,res) => {
    const {id: taskID} = req.params
    const taskToDelete = await Task.findOneAndDelete({_id: taskID})
    if (!taskToDelete) {
        return res.status(404).json({ success: false, msg: "Task not found." });
    }
    res.status(200).json({ success: true, msg: "Task deleted successfully." });
})

module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTaskById,
    deleteTaskById
}