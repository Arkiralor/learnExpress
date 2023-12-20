import dotenv from "dotenv"
dotenv.config({
    path: "./env"
})

import connectDatabase from "./database/init.js"
import { app } from "./app.js"
import { PORT } from "./constants.js"

connectDatabase()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
.catch((error) => {
    console.error(`Code fatile: ${error}`)
})







/*
import express from "express"

const app = express()

;(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.error(`App could not connect to the database: ${error}`)
            throw error
        })
        app.listen(process.env.PORT, () =>{
            console.log(`App running on port: ${process.env.PORT}`)
        })
    } catch (error) {
        console.error(`Could not connect to DB due to: ${error}`)
        throw error
    }
})()
*/