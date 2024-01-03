import mongoose, {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //Cloudinary | S3 URL.
            required: true
        },
        thumbnailFile: {
            type: String, //Cloudinary | S3 URL.
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        tags: [
            {
                type: String
            }
        ],
        views: {
            type: Number,
            required: true,
            default: 1
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }, 
    {timestamps: true}
)

videoSchema.plugin(mongooseAggregatePaginate)

export const videoModel = new mongoose.model("Video", videoSchema)