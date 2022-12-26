import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser'

import * as url from 'url'
import path from 'path';

const __dirname = url.fileURLToPath(new URL('./', import.meta.url))

import { indexRouter } from './routes/index.routes.js'
const app = express();




app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use('/api', indexRouter)

const publicPath = path.join(__dirname, 'build')
app.use(express.static(publicPath))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'build','index.html'))
})



export { app }