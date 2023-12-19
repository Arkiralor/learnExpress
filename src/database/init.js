import mongoose from "mongoose"
import {DB_NAME} from "../constants.js"

const connectDatabase = async () => {
    try{
        const conn = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Database connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Could not connect to DB due to: ${error}`)
        process.exit(1)
    }
}

export default connectDatabase