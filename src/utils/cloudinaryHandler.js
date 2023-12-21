import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"
import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } from "../constants"

cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (localFilePath) => {
	try {
		if (!localFilePath) {
			console.warn(`File not found at ${localFilePath}`)
			return null
		} else {
			//upload the local file to cloudinary
			const response = await cloudinary.uploader.upload(localFilePath, {
				resource_type: "auto"
			})
			console.log(`File uploaded successfully to ${response.secure_url}`)
			try {
				fs.unlinkSync(localFilePath)
				console.log(`Locally stored file deleted successfully.`)
			} catch (fileDeletionError) {
				console.error(`Error deleting uploaded local file: ${fileDeletionError}`)
			}
			return response
		}
	} catch (error) {
		console.error(`Error uploading file: ${error}`)
		fs.unlinkSync(localFilePath)
		return null
	}
}

export { uploadToCloudinary }