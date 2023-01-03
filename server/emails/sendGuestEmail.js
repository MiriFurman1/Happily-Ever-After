import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv';
dotenv.config();


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// export const createTask = async (req, res) => {
//     console.log(req.body);
//     const task = new Task({
//         ...req.body,
//         owner: req.user._id
//     })

//     try {
//         await task.save()
//         res.status(201).send(task)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// }
export const sendGuestEmails = async (req, res) => {
    let guestsEmails=["mirifurman@gmail.com"]
    console.log(guestsEmails);
    console.log(req.body);
    // const { subject, body, image } = req.body;
    // subject=req.body.subject
    // console.log(subject);

    // console.log(req.body)
   
    for (let i = 0; i < guestsEmails.length; i++) {
        const guest = guestsEmails[i];
  
        sgMail.send({
            to: guest,
            from: 'everafterhapilly@gmail.com',
            subject: subject,
            text: body,
            // html: body,
            // attachments: [{
            //     content: image,
            //     filename: 'image.jpg',
            //     type: 'image/jpeg',
            //     disposition: 'attachment',
            // }],
        });
    }


    res.send({ message: 'Emails sent!' });
};

