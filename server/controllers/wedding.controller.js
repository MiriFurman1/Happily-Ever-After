import { Wedding } from "../models/wedding.model.js"
import sharp from 'sharp'
export const createNewWedding = async (req, res) => {
    const wedding = new Wedding({
        ...req.body,
        owner: req.user._id
    })
    try {
        await wedding.save()
        res.status(201).send(wedding)

    } catch (e) {
        res.status(400).send(e)
    }
}

export const getWedding = async (req, res) => {
    try {
        const wedding = await Wedding.find({ owner: req.user._id })

        if (wedding.length === 0) {
            return res.status(404).send()
        }

        res.send(wedding)
    } catch (e) {
        res.status(500).send({ error: 'Wedding not found' })
    }
}


export const updateWedding = async (req, res) => {
    const updates = Object.keys(req.body)
    try {
        const wedding = await Wedding.findOne({ owner: req.user.id })
        if (!wedding) {
            return res.status(404).send({ error: 'Wedding not found' })
        }
        updates.forEach((update) => wedding[update] = req.body[update])
        await wedding.save()
        res.send(wedding)
    } catch (e) {
        res.status(400).send(e)
    }
}
export const deleteWedding = async (req, res) => {
    try {
        console.log(req.user._id);
        const wedding = await Wedding.findOneAndDelete({ owner: req.user._id })

        if (!wedding) {
            res.status(404).send({ error: 'Wedding not found' })
        }
        res.send(wedding)

    } catch (e) {
        res.status(500).send()
    }
}


export const uploadImage = async (req, res) => {
    const eventId = await Object.values(req.params).toString()
    console.log(eventId);

    
    const weddingOld = await Wedding.findById({ _id: eventId });

    var images = weddingOld.images;

    if (!req.files) {
        return res.status(400).send({ error: 'No file was provided' });
    }


    for (var i = 0; i < req.files.length; i++) {
        const buffer = await sharp(req.files[i].buffer)
            .resize({ width: 1500, height: 1000 })
            .jpeg()
            .toBuffer();

        images.push(buffer);

    }
    const wedding = await Wedding.findByIdAndUpdate({ _id: eventId }, { images: images })

    res.send(wedding)
}


export const getImages=async (req, res) => {
    const eventId = req.params.eventid
    console.log(eventId);
    try {
        const wedding = await Wedding.findById({ _id: eventId })
        if (!wedding || !wedding.images) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpeg')
        res.send(wedding.images)
    } catch (e) {
        res.status(404).send()
    }
}


export const getImageOne=async (req, res) => {
    const eventId = req.params.eventid
    const index = req.params.index
    console.log(eventId);
    try {
        const wedding = await Wedding.findById({ _id: eventId })
        if (!wedding || !wedding.images) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpeg')
        res.send(wedding.images[index])
    } catch (e) {
        res.status(404).send()
    }
}
