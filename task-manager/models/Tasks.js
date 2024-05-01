const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type:String,
        required: [true, "Name is required."],
        trim: true,
        minLength: [3, "Name must be at least 3 characters"],
        maxLength:[20, 'Name can not be more than 20 characters'],
    },
    completed: {
        type:Boolean,
        default: false,
    }
})

module.exports = mongoose.model('tasks', TaskSchema)