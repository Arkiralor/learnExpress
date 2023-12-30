export const DB_NAME = process.env.MONGODB_NAME
export const PORT = process.env.PORT || 8000
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "localhost"
export const ACCESS_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
export const JS_IND = " "


export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;