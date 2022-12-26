import { Schema, model } from 'mongoose'
import validator from 'validator';

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true
    },

})

userSchema.pre('save', async function (next) {
    const user = this
    console.log('just before saving');
    next()
})
const User = model('Users', userSchema)


export { User }