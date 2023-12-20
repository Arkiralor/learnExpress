import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import { CORS_ORIGIN } from "./constants"

const app = express()

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}))
app.use(
    express.json(
        {
            limit: "128kb"
        }
    )
)
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

export { app }