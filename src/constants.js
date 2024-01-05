export const MONGODB_NAME = process.env.MONGODB_NAME
export const PORT = process.env.PORT || 8000
export const CORS_ORIGIN = process.env.CORS_ORIGIN || "localhost"
export const SITE_SECRET = process.env.SITE_SECRET || "s!t3s3cre4"
export const ACCESS_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
export const JS_IND = " "

export const DB_NAME = process.env.DB_NAME || "learn_express"
export const DB_HOST = process.env.DB_HOST || "localhost"
export const DB_USERNAME = process.env.DB_USERNAME || "prithoo"
export const DB_PASSWORD = process.env.DB_PASSWORD || "password"
export const DB_PORT = process.env.DB_PORT || "5432"
export const DB_URI = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
export const cookieOptions = { httpOnly: true, secure: true }