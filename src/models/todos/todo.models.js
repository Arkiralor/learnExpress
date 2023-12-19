import mongoose from "mongoose"
import uuid from "uuid"

const todoSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" //Name of the database collection; not the model.
        },
        subTodos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SubTodo"
            }
        ]
    },
    {
        timestamps: true
    }
)

export const TodoModel = new mongoose.model("Todo", todoSchema)