import mongoose, { Schema, model } from 'mongoose'

const taskSchema = new Schema ({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

const Task = model('Tasks', taskSchema)

export {Task}