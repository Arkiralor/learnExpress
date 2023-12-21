// import mongoose from "mongoose"
// import uuid from "uuid"

// const productSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//             lowercase: true,
//             unique: true
//         },
//         description: {
//             type: String,
//             required: true
//         },
//         productImage: {
//             type: String
//         },
//         price: {
//             type: Number,
//             default: Number.MIN_SAFE_INTEGER
//         },
//         stock: {
//             type: Number,
//             default: 1
//         },
//         category: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Category",
//             required: true
//         },
//         seller: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User"
//         }
//     },
//     {
//         timestamps: true
//     }
// )

// export const productModel = new mongoose.model("Product", productSchema)