import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'

export const auth = async (req, res, next) => {
    try {
        console.log(req.body);
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'ilovegarfield')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token})
        
        if (!user) {
            throw new Error()
        }
        
        req.token=token
        req.user=user
        console.log('here');
        next()

    } catch (e) {
        res.status(401).send({ error: 'Please authenticate' })
    }


}

export default auth;