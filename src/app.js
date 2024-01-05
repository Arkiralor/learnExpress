import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import { CORS_ORIGIN, SITE_SECRET } from "./constants.js"

const app = express()

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({limit: "128kb"}))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))
app.use(express.static("public"))
app.use(cookieParser(SITE_SECRET))

import userRouter from "./routes/user.routes.js"

app.use("/api/v1/user", userRouter)

export { app }