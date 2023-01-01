import mongoose, { Schema, model } from 'mongoose'

const guestsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    numberOfGuests: {
        type: Number,
        required: true
    }
});

const Guests = mongoose.model('Guests', guestsSchema);

export { Guests };
