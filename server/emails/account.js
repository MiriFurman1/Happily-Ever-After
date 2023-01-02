import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv';
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
export const sendWelcomeEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'everafterhapilly@gmail.com',
        subject:'Welcome to Happily Ever After!',
        text:`Dear ${name},
        
        Congratulations on your engagement! We are so excited to welcome you to Happily Ever After, the ultimate wedding planning app.
        
        With Happily Ever After, you'll have everything you need to plan your dream wedding at your fingertips. Our app allows you to:
        
        Keep track of your to-do list and never miss a deadline
        View and share photos from your big day with your guests
        Send email invites and updates to your guests with just a few clicks
        We understand that planning a wedding can be overwhelming, but with Happily Ever After, we hope to make the process as seamless and stress-free as possible. If you have any questions or need assistance, our customer support team is here to help.
        
        We can't wait to see how Happily Ever After helps you plan your happily ever after.
        
        Best regards,
        Miri Furman,
        Happily Ever After Team `
    })
}

export const sendCancelationEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'everafterhapilly@gmail.com',
        subject:'Sorry to see you go!',
        text:`Dear ${name},
        
        We are sorry to see you go. We hope that you have enjoyed using our website and we would like to thank you for your support.

        If you have any feedback about your experience with our website, please do not hesitate to share it with us. We value your input and would love to hear from you.
        
        Thank you again for your support. We hope to see you again in the future.
        
        Miri Furman,
        Happily Ever After Team`
    })
}