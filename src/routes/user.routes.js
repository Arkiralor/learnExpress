import { Router } from "express"
import { registerUser, loginUserViaPassword, logoutUser } from "../controllers/user.controller.js"
import { upload } from "../middleware/multer.middleware.js"
import { verifyJwt } from "../middleware/auth.middleware.js"

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
userRouter.route("/logout/").post(verifyJwt, logoutUser)

export default userRouter