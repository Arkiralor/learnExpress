// import mongoose from "mongoose"
// import uuid from "uuid"

// const userSchema = new mongoose.Schema(
//     {
//         username: {
//             type: String,
//             required: true,
//             unique: true,
//             lowercase: true
//         },
//         email: {
//             type: String,
//             required: true,
//             unique: true,
//             lowercase: true,

//         },
//         password: {
//             type: String,
//             required: [true, "Password is required."],
            
//         },
//         isActive: Boolean
//     },
//     {
//         timestamps: true
//     }
// )

// export const UserModel = new mongoose.model("User", userSchema)