import Subscriber from "../models/subscriberModel.js"

const checkId = async (req, res, next) => {
    try {
        const subscriber = await Subscriber.findById(req.params.id)
        if (!subscriber) {
            return res.status(404).json({
                status: 'failed',
                message: "Subscriber Not Found"
            })
        }
    } catch (err) {
        return res.status(500).json({
            status: "failed",
            message: err.message
        })
    }
    next()
}

export default checkId