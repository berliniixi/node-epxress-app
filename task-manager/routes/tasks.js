const express = require('express')
const router = express.Router()

 
// middlewares
const {getAllTasks,createTask,getTaskById,updateTaskById,deleteTaskById} = require('../controllers/tasks')

// routes
router.route('/').get(getAllTasks)
router.route('/').post(createTask)
router.route('/:id').get(getTaskById)
router.route('/:id').patch(updateTaskById)
router.route('/:id').delete(deleteTaskById)

module.exports = router