import { Router } from "express"
import { registerUser, loginUserViaPassword } from "../controllers/user.controller.js"
import { upload } from "../middleware/multer.middleware.js"

const userRouter = Router()

userRouter.route("/register").post(
    upload.fields(
        [
            {
                name: "avatar",
                maxCount: 1
            },
            {
                name: "coverImage",
                maxCount: 1
            }
        ]
    ),
    registerUser
)

userRouter.route("/login/password").post(loginUserViaPassword)

export default userRouter