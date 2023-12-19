import mongoose from "mongoose"
import uuid from "uuid"

const patientSchema = new mongoose.Schema(
    {
        
    },
    {
        timestamps: true
    }
)

export const patientModel = new mongoose.model("Patient", patientSchema)