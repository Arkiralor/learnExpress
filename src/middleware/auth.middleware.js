import { ACCESS_TOKEN_SECRET } from "../constants.js";
import { userModel } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


export const verifyJwt = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(
                400,
                `This API (${req.path}) requires authentication.`
            )
        }
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET)
        const userObj = await userModel.findById(decoded._id).select("-refreshToken -password -watchHistory")
        if (!userObj) {
            throw new ApiError(
                400,
                "JWT invalid; User not found."
            )
        }

        req.user = userObj
        next()

    } catch (error) {
        console.error(`Error authenticating user: ${error}.`)
        throw new ApiError(
            400,
            "Something went wrong; could not validate JWT."
        )
    }
}) 