import { Schema, model } from 'mongoose'

const plantsSchema = new Schema({
    name: { type: String, unique: true, required: true },
    season: { type: String, required: false },
    price: { type: Number, required: true }
})

const Plant = model('plants', plantsSchema)


export { Plant }