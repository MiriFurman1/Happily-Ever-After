import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv';
dotenv.config();


sgMail.setApiKey(process.env.SENDGRID_API_KEY)


export const sendGuestEmails = async (req, res) => {
    try {

        console.log('image',req.file);

        const { subject, body, guestEmails } = req.body;
        const image = req.file
        const parsedEmails=JSON.parse(guestEmails) ;

        for (let i = 0; i < parsedEmails.length; i++) {
            const guest = parsedEmails[i];

            sgMail.send({
                to: guest,
                from: 'everafterhapilly@gmail.com',
                subject: subject,
                text: body,
                html: body,
                attachments: [{
                    content: image.buffer.toString('base64'),
                    filename: image.originalname,
                    type: 'image/jpeg',
                    disposition: 'attachment',
                }],
            });
        }


        res.send({ message: 'Emails sent!' });
    } catch (err) {
        console.log(err.message);
        res.send(err.message)
    }
};

