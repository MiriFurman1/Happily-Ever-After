import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    
})

const User = model('Users', userSchema)


export { User }