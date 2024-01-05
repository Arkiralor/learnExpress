import { userModel } from "../models/user.models.js"
import { ApiError } from "./apiError.js"
import { blacklistedTokenModel } from "../models/token.models.js"

const generateAccessAndRefreshToken = async (userId) => {
    if (!userId || userId === "") {
        throw new ApiError(
            400,
            "UserID not provided."
        )
    }
    const foundUser = await userModel.findById(userId)
    if (!foundUser) {
        throw new ApiError(
            400,
            `User '${userId}' not found.`
        )
    }
    const refreshToken = await foundUser.generateRefreshToken()
    const accessToken = await foundUser.generateAccessToken()

    try {
        await blacklistedTokenModel.create({
            token: refreshToken,
            blacklistedNow: false
        })
        await blacklistedTokenModel.create({
            token: accessToken,
            blacklistedNow: false
        })
    } catch (error) {
        const errMsg = `Error registering new tokens: ${error}`
        throw new ApiError(
            500,
            errMsg
        )
    }

    await updateRefreshToken(userId, refreshToken)
    return {
        refreshToken: refreshToken,
        accessToken: accessToken
    }
}

const updateRefreshToken = async (userId, refresToken) => {
    if (!userId || userId === "") {
        throw new ApiError(
            400,
            "UserID not provided."
        )
    }

    try {
        await userModel.updateOne({ _id: userId }, { refreshToken: refresToken })
    } catch (error) {
        const errMsg = `Error updating refresh token for user ${userId}: ${error}`
        throw new ApiError(500, errMsg)
    }
}

export { generateAccessAndRefreshToken }