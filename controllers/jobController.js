import { nanoid } from 'nanoid'
import Job from '../models/JobModel.js'

let jobs = [
    {id: nanoid(), company: 'apple', position: 'front-end'},
    {id: nanoid(), company: 'google', position: 'back-end'}
]

export const getAllJobs = async (req, res) => {
    res.status(200).json({jobs})
}

export const createJob = async (req, res) => {
    const { company, position } = req.body
    const job = await Job.create({ company, position })
    res.status(201).json({job})
}

export const getJob = async (req, res) => {
    const { id } = req.params
    const job = jobs.find((job) => job.id === id)

    if (!job) {
        throw new Error('No job with that id')
        // res.status(404).json({message: `No job found with id: ${id}`})
        // return
    }

    res.status(200).json({job})
}

export const updateJob = async (req, res) => {
    const { company, position } = req.body
    if (!company || !position) {
        res.status(404).json({message: 'Missing values'})
        return
    }

    const { id } = req.params
    let job = jobs.find(job => job.id === id)
    if (!job) {
        res.status(404).json({message: `No job found with id: ${id}`})
        return
    }

    job.company = company
    job.position = position
    res.status(200).json({ message: "job modified", job })
}

export const deleteJob = async (req, res) => {
    const { id } = req.params
    const job = jobs.find(job => job.id === id)

    if (!job) {
        res.status(404).json({ message: `No job found with id: ${id}` })
        return
    }

    jobs = jobs.filter(job => job.id !== id)

    res.status(200).json({ message: "Job deleted successfully!" })
}