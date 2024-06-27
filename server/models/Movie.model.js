import { Schema, model } from 'mongoose'

const reviewSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const movieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: Schema.Types.ObjectId,
        ref: "Genre",
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    cast: [{
        type: String
    }],
    reviews: [
        reviewSchema
    ],
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

const Movie = model("Movie", movieSchema)
export default Movie