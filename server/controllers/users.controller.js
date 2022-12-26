import { User } from "../models/user.model.js";



export const addNewUser = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
}

export const loginUser = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
}

export const updateUser = async (req, res) => {
    const updates = Object.keys(req.body)
    console.log(updates);
    console.log(req.body);
    const { id } = req.params;
    const allowedUpdates = ['name', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        const user = await User.findById(id)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
        console.log(e);
    }
}