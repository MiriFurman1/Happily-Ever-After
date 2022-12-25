import { User } from "../models/user.model.js";
import ReactDOMServer from 'react-dom/server';
export const addNewUser = (req, res) => {

    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    })

    newUser.save((err) => {
        if (err) {
            res.send('Error saving user: ' + err);
            return;
        }
        // const Page = ReactDOMServer.renderToString(<OurWeddingPage user={newUser} />);
        
        // res.send(Page);
    });


    // res.render(<OurWeddingPage/>)



}

export const addPlants = async (req, res) => {

    try {
        const { body } = req;
        const newPlant = await Plant.create(body)
        res.status(201).send(body);
    } catch (err) {
        res.send(err.message)
    }
}