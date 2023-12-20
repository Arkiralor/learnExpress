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

export { app }