const getAllTasks = (req,res) => {
    res.send('get Tasks')
}

const createTask = (req,res) => {
    res.json(req.body)
}


const getTaskById = (req,res) => {
    res.send({id: req.params.id})
}

const updateTaskById = (req,res) => {
    res.send('update task by id')
}

const deleteTaskById = (req,res) => {
    res.send('delete task by id')
}

module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTaskById,
    deleteTaskById
}