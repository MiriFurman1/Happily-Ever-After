import {Wedding} from "../models/wedding.model.js"

export const createNewWedding= async (req,res)=>{
    const wedding = new Wedding({...req.body,
        owner: req.user._id})
    try {
        await wedding.save()
        res.status(201).send(wedding)

    } catch (e) {
        res.status(400).send(e)
    }
}

export const getWedding= async (req,res)=>{
    try {
        const wedding = await Wedding.find({ owner: req.user._id })

        if (!wedding) {
            return res.status(404).send()
        }

        res.send(wedding)
    } catch (e) {
        res.status(500).send({ error: 'Wedding not found' })
    }
}


export const updateWedding= async (req,res)=>{
    const updates = Object.keys(req.body)
    console.log(updates);
    console.log(req.user.id );
    try {
        const wedding = await Wedding.findOne({ owner: req.user.id })
        if (!wedding ) {
            return res.status(404).send({ error: 'Wedding not found' })
        }
        updates.forEach((update) => wedding [update] = req.body[update])
        await wedding.save()
        res.send(wedding )
    } catch (e) {
        res.status(400).send(e)
    }
}
export const deleteWedding= async (req,res)=>{
try{
    console.log(req.user._id);
    const wedding = await Wedding.findOneAndDelete({owner:req.user._id})

    if (!wedding) {
        res.status(404).send({ error: 'Wedding not found' })
    }
    res.send(wedding)

} catch (e) {
    res.status(500).send()
}
}




export const deleteTask = async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.user._id);
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
}