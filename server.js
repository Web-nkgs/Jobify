import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import morgan from 'morgan'
import { nanoid } from 'nanoid'
import jobRouter from './routes/jobRouter.js'
import mongoose from 'mongoose'

const app = express()

// Middleware --> app.use
app.use(express.json())

let jobs = [
    {id: nanoid(), company: 'apple', position: 'front-end'},
    {id: nanoid(), company: 'google', position: 'back-end'}
]

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.get('/', (req, res) => {
    res.send('Hello World')
})

// app.post('/', (req, res) => {
//     console.log(req)
//     res.json({ message: 'data received', data: req.body })
// })

app.use('/api/v1/jobs', jobRouter)

app.use('*', (req, res) => {
    res.status(404).json({message: 'Not found'})
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: 'something went wrong'})
})

const port = process.env.PORT || 5100

try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(port, () => {
        console.log(`server running on port ${port}...`)
    })
} catch (error) {
    console.log(error);
    process.exit(1)
}