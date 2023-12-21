// import mongoose from "mongoose"
// import uuid from "uuid"

// const subTodoSchema = new mongoose.Schema(
//     {
//         title: {
//             type: String,
//             required: true
//         },
//         body: {
//             type: String,
//             required: true
//         },
//         completed: {
//             type: Boolean,
//             default: false
//         },
//         createdBy: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "User"
//         }
//     },
//     {
//         timestamps: true
//     }
// )

// export const SubTodoModel = new mongoose.model("SubTodo", subTodoSchema)