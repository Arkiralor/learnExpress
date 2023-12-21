// import mongoose from "mongoose"
// import uuid from "uuid"

// const orderItemSchema = new mongoose.Schema(
//     {
//         productId: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Product",
//             required: true
//         },
//         quantity: {
//             type: Number,
//             default: 1
//         }
//     },
//     {
//         timestamps: true
//     }
// )

// const deliveryPhoneNumber = new mongoose.Schema(
//     {
//         isdCode: Number,
//         phoneNumber: String
//     }
// )

// const deliveryAddressSchema = new mongoose.Schema(
//     {
//         recipent: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User"
//         },
//         contactNumber: deliveryPhoneNumber,
//         line01: {
//             type: String,
//             required: true
//         },
//         line02: {
//             type: String,
//         },
//         townCity: String,
//         state: String,
//         pinCode: String,
//         country: String
//     }
// )

// const orderSchema = new mongoose.Schema(
//     {
//         orderPrice: {
//             type: Number,
//             required: true
//         },
//         customer: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User",
//             required: true
//         },
//         orderItems: [orderItemSchema],
//         address: deliveryAddressSchema,
//         status: {
//             type: String,
//             enum: [
//                 "Pending",
//                 "Cancelled",
//                 "Delivered",
//                 "Out for Delivery",
//                 "Shipped"
//             ],
//             default: "Pending"
//         }
//     },
//     {
//         timestamps: true
//     }
// )

// export const orderModel = new mongoose.model("Order", orderSchema)