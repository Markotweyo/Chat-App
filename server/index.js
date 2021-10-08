import express from 'express'
import twilio from 'twilio'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'


const app= express()
const PORT= process.env.PORT || 5000


dotenv.config()

const accountSid= process.env.TWILIO_ACCOUNT_SID
const authToken= process.env.TWILIO_AUTH_TOKEN
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_ID

const twilioClient = twilio(accountSid, authToken)



/* 
const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({   
         messagingServiceSid: 'MGe31e934719ff7dba9f2c5a6784336254',      
         to: '+254717521763' 
       }) 
      .then(message => console.log(message.sid)) 
      .done(); */

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())


app.get('/', (req, res)=>{
    res.send('Hello World!')

})

app.post('/', (req, res)=>{
    const { message, user: sender, type, members }=req.body

    if (type ==='message.new') {
        members
        .filter((member)=>member.user_id===sender.id)
        .forEach(({user})=> {
            if(!user.online) {
                twilioClient.messages .create({   
         body: `You have a new message from ${message.user.fullName}- ${message.text}`,      
         messagingServiceSid: messagingServiceSid,
         to: user.phoneNumber
       })
       .then(() => console.log('Message sent !')) 
       .catch((err)=>console.log(err))
            }

        })
        
        return res.status(200).send('Message sent!')
    }
    return res. status(200).send('Not a new message request !')
})

app.use('/auth', authRoutes)

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})