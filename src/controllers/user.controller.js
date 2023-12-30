import { asyncHandler } from "../utils/asyncHandler.js"
import { JS_IND, emailRegex } from "../constants.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { userModel } from "../models/user.models.js"
import { uploadToCloudinary } from "../utils/cloudinaryHandler.js"
import { generateAccessAndRefreshToken } from "../utils/user.model.utils.js"

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
    ) {
        throw new ApiError(
            400,
            "All fields are required."
        )
    }

    const existingUser = await userModel.findOne({
        $or: [
            {
                username
            },
            {
                email
            }
        ]
    })

    if (existingUser) {
        throw new ApiError(
            409,
            `A user with the username: ${username} or email: ${email} already exists.`
        )
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(
            404,
            "Avatar is required."
        )
    }

    const avatarCloud = await uploadToCloudinary(avatarLocalPath)
    const coverImageCloud = await uploadToCloudinary(coverImageLocalPath)


    if (!avatarCloud) {
        throw new ApiError(
            500,
            "File was not successfully uploaded."
        )
    }

    const userObj = {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password,
        fullName,
        avatar: avatarCloud.url,
        coverImage: coverImageCloud.url || ""
    }

    const user = await userModel.create(userObj)

    const createdUser = await userModel.findById(user._id).select("-refreshToken -password -watchHistory")
    if (!createdUser) {
        throw new ApiError(
            500,
            `User ${user.email} could not be created.`
        )
    }

    res.status(201).json(
        new ApiResponse(
            201,
            createdUser,
            `User ${user.email} created successfully at ${user.createdAt}`
        )
    )
})

const loginUserViaPassword = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    if (!password) {
        throw new ApiError(
            400, "Bruh...how can you hope to login with this API without a password?"
        )
    }

    const foundUser = await userModel.findOne({email: email.toLowerCase()})

    if (!foundUser){
        throw new ApiError(400, "User not found.")
    }

    const passwordValid = await foundUser.checkPassword(password)
    if (!passwordValid){
        throw new ApiError(400, "Incorrect password.")
    }

    const tokens = await generateAccessAndRefreshToken(foundUser._id)

    res.status(200).json(new ApiResponse(
        200, 
        tokens,
        `user: ${email} logged in successfully.`
    ))

})

export { registerUser, loginUserViaPassword }