import { Router } from "express"
import Subscriber from "../models/subscriberModel.js"
import checkId from "../middlewares/checkId.js"

const router = Router()

router.get("/", async (req, res) => {
    try {
        const subscribers = await Subscriber.find({})
        res.status(200).json({
            status: 'success',
            count: subscribers.length,
            data: { subscribers }
        })
    } catch(err) {
        res.status(500).json({
            status: 'failed',
            message: err.message
        })
    }
})

router.get("/:id", checkId , async (req, res) => {
    const { id } = req.params
    try {
        const subscriber = await Subscriber.findById(id)
        res.status(200).json({
            status: 'success',
            data: { subscriber }
        })
    } catch (err) {
        res.status(404).json({
            status: "failed",
            message: 'Not Found'
        })
    }
})

router.post("/", async (req, res) => {
    try {
        const subscriber = await Subscriber.create(req.body)
        res.status(201).json({
            status: 'success',
            data: { subscriber }
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
})

router.patch("/:id", checkId ,async (req, res) => {
    const { id } = req.params
    try {
        const subscriber = await Subscriber.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        res.status(200).json({
            status: "success",
            data: { subscriber }
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
})

router .delete("/:id", checkId ,async (req, res) => {
    const { id } = req.params
    try {
        await Subscriber.findByIdAndDelete(id)
        res.status(204).json({
            status: "success",
            message: "Subscriber deleted"
        })
    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
})

export default router