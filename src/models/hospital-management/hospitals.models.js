import mongoose from "mongoose"
import uuid from "uuid"

const hospitalSchema = new mongoose.Schema(
    {
        
    },
    {
        timestamps: true
    }
)

export const hospitalModel = new mongoose.model("Hospital", hospitalSchema)