import mongoose, { Schema, model } from 'mongoose'

const weddingSchema = new mongoose.Schema({
    brideName: {
        type: String
    },
    groomName: {
        type: String
    },
    weddingDate: {
        type: Date
    },
    location: {
        type: String
    },
    // guestNum: {
    //     type: Number
    // },
    guests:[{
        name:String,
        email:String,
        numberOfGuests: Number,
        side:String
    }],

    images: [Buffer],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Wedding = model('wedding', weddingSchema)
export { Wedding }