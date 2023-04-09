import { config } from "dotenv"
config()

import express from "express"
import mongoose from "mongoose"
import subscriberRouter from "./routes/subscriber.js"

const app = express()
const port = process.env.PORT || 3000

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true })
    .then(() => console.log("DB Connected Successfully"))
    .catch((err) => console.error(err))

app.use(express.json())
app.use("/subscribers", subscriberRouter)

app.listen(port, () => console.log(`Server running on port ${port}`))