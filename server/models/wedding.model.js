import mongoose, { Schema, model } from 'mongoose'

const weddingSchema = new mongoose.Schema({
    brideName: {
        type: String,
        required: true
    },
    groomName: {
        type: String,
        required: true
    },
    weddingDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    guestNum: {
        type: Number,
        required: true
    },
    images: [{
        image: {
            type: Buffer,
            contentType:String
        }
        
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Wedding = model('wedding', weddingSchema)
export { Wedding }