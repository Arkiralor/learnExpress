import { asyncHandler } from "../utils/asyncHandler.js"
import { JS_IND, REFRESH_TOKEN_SECRET, cookieOptions, emailRegex, passwordRegex } from "../constants.js"
import { ApiError } from "../utils/apiError.js"
import { ApiResponse } from "../utils/apiResponse.js"
import { userModel } from "../models/user.models.js"
import { uploadToCloudinary } from "../utils/cloudinaryHandler.js"
import { generateAccessAndRefreshToken } from "../utils/user.model.utils.js"
import { blacklistedTokenModel } from "../models/token.models.js"
import jwt from "jsonwebtoken"

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

    if (!passwordRegex.test(password)) {
        throw new ApiError(
            400,
            "Improper password; Must contain at least one: upper case letter, lower case letter, digit and special character."
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
    const { email, password } = req.body

    if (!email || email === "") {
        throw new ApiError(
            400,
            "No email provided."
        )
    }

    if (!emailRegex.test(email)) {
        throw new ApiError(
            400,
            `Improper email: ${email}.`
        )
    }

    if (!password || password === "") {
        throw new ApiError(
            400, "No password provided."
        )
    }

    const foundUser = await userModel.findOne({ email: email.toLowerCase() })

    if (!foundUser) {
        throw new ApiError(400, "User not found.")
    }

    const passwordValid = await foundUser.checkPassword(password)
    if (!passwordValid) {
        throw new ApiError(400, "Incorrect password.")
    }

    const tokens = await generateAccessAndRefreshToken(foundUser._id)

    res.status(200)
        .cookie("refreshToken", tokens.refreshToken, cookieOptions)
        .cookie("accessToken", tokens.accessToken, cookieOptions)
        .json(new ApiResponse(
            200,
            tokens,
            `user: ${email} logged in successfully.`
        ))

})

const refreshUserToken = asyncHandler(async (req, res) => {
    try {
        const oldRefreshToken = req.body
        const decoded = jwt.verify(oldRefreshToken, REFRESH_TOKEN_SECRET)
        if (!decoded) {
            throw new ApiError(
                400,
                "Invalid Refresh Token."
            )
        }

        const userObj = userModel.findById(decoded._id)
        if (!userObj) {
            throw new ApiError(
                400,
                `User ${decoded._id} no longer registered in the system.`
            )
        }

        await blacklistedTokenModel.findOneAndUpdate({ token: userObj.refreshToken }, { blacklistedNow: true })

        const newTokens = await generateAccessAndRefreshToken(userObj._id)
        await userModel.findOneAndUpdate({ _id: userObj._id }, { refreshToken: newTokens.refreshToken })

        res
            .status(200)
            .cookie("refreshToken", newTokens.refreshToken, cookieOptions)
            .cookie("accessToken", newTokens.accessToken, cookieOptions)
            .json(new ApiResponse(
                200,
                newTokens,
                `user: ${email} refreshed in successfully.`
            ))
    } catch (error) {
        const errMsg = `Error refreshing tokens: ${error}.`
        console.error(errMsg)
        throw new ApiError(
            500,
            errMsg
        )
    }

})

const logoutUser = asyncHandler(async (req, res) => {
    const userObj = await userModel.findById(req.user._id)

    const accessTokenId = await blacklistedTokenModel.findOneAndUpdate({ token: req.rawToken }, { blacklistedNow: true })
    if (!accessTokenId) {
        throw new ApiError(
            500,
            `Could not logout user: ${req.user.email}.`
        )
    }
    const refreshTokenId = await blacklistedTokenModel.findOneAndUpdate({ token: userObj.refreshToken }, { blacklistedNow: true })
    if (!refreshTokenId) {
        throw new ApiError(
            500,
            `Could not logout user: ${req.user.email}.`
        )
    }

    res
        .status(200)
        .clearCookie("refreshToken", cookieOptions)
        .clearCookie("accessToken", cookieOptions)
        .json(
            new ApiResponse(
                200,
                `User '${userObj.email}' logged out successfully.`
            )
        )
})

export { registerUser, loginUserViaPassword, logoutUser, refreshUserToken }