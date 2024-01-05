import mongoose, { Schema } from "mongoose"

const blacklistedTokenSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
            index: true
        },
        blacklistedNow: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    { timestamps: true }
)

export const blacklistedTokenModel = new mongoose.model("BlacklistedToken", blacklistedTokenSchema)