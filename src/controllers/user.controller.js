import { asyncHandler } from "../utils/asyncHandler.js"
import { JS_IND } from "../constants.js"
import { ApiError } from "../utils/apiError.js"
import { userModel } from "../models/user.models.js"

const registerUser = asyncHandler(async (req, res) => {

    // TODO: Get the user's details from the frontend.
    // TODO: Validation of user's details.
    // TODO: Check if the user already exists in the system (username AND/OR email).
    // TODO: Check for coverImage and avatar.
    //          - Upload them to cloudinary and check cloud storage.
    // TODO: Create user OBJECT
    //          - Create in DB.
    // Check for user creation response.
    // Remove the password and refreshToken field from the DB response.
    // Return the response.

    // const data = req.body

    // if (!data.username || !data.email || !data.password || !data.fullName) {
    //     let msg = `Error in parsing request body.`
    //     res.status(400).json({
    //         message: msg
    //     })
    // }

    const { username, email, fullName, password } = req.body

        if (
            [username, email, password, fullName].some((field) => field?.trim() === "")
        ){
            throw new ApiError(
                400,
                "All fields are required."
            )
        }
        res.status(200).json(req.body)

    // console.log(`\{\n${JS_IND}email: ${email},\n${JS_IND}username: ${username},\n${JS_IND}fullName: ${fullName},\n${JS_IND}password: ${password}\n\}`)
    
})

export { registerUser }