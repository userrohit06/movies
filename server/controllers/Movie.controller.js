import Movie from '../models/Movie.model.js'
import expressAsyncHandler from 'express-async-handler'

export const createNewMovie = expressAsyncHandler(async (req, res) => {
    const newMovie = new Movie(req.body)
    const savedMovie = await newMovie.save()
    res.status(200).json({ savedMovie })
})

export const getAllMovies = expressAsyncHandler(async (req, res) => {
    const allMovies = await Movie.find()
    res.status(200).json({ allMovies })
})

export const getSpecificMovie = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findById(id)

    if (!movie) {
        throw new Error("Movie not found")
    }

    res.status(200).json({ movie })
})

export const updateMovie = expressAsyncHandler(async (req, res) => {
    const { id } = req.params

    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true })
    if (!updatedMovie) throw new Error("Movie could not be updated")

    res.status(200).json({ updatedMovie })
})

export const reviewMovie = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const { rating, comment } = req.body

    const movie = await Movie.findById(id)
    if (!movie) throw new Error("Movie not found")

    // console.log("movie: ", movie);

    const alreadyReviewed = movie.reviews.find(review => review.user.toString() === req.user._id.toString())

    if (alreadyReviewed) throw new Error("Movie already reviewed")

    const review = {
        name: req.username,
        rating: Number(rating),
        comment,
        user: req.user._id
    }

    movie.reviews.push(review)
    movie.numReviews = movie.reviews.length
    movie.rating = movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length

    await movie.save()
    res.status(200).json({ message: "Movie reviwed" })

    res.json("hello")
})

export const deleteMovie = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const movie = await Movie.findByIdAndDelete(id)

    if (!movie) throw new Error("Movie not found to delete")

    res.status(200).json({ message: "Movie deleted successfully" })
})

export const deleteComment = expressAsyncHandler(async (req, res) => {
    const { movieId, reviewId } = req.body
    const movie = await Movie.findById(movieId)

    if (!movie) throw new Error("Movie not found")

    const reviewIndex = movie.reviews.findIndex(
        review => review._id.toString() === reviewId
    )

    if (reviewIndex === -1) throw new Error("Comment not found")

    movie.reviews.splice(reviewIndex, 1)
    movie.numReviews = movie.reviews.length
    movie.rating = movie.reviews.length > 0
        ? movie.reviews.reduce((acc, item) => item.rating + acc, 0)
        / movie.reviews.length : 0

    await movie.save()
    res.status(200).json({ message: "Comment deleted successfully" })
})

export const getNewMovies = expressAsyncHandler(async (req, res) => {
    const newMovies = await Movie.find().sort({ createdAt: -1 }).limit(10)
    res.status(200).json({ newMovies })
})

export const getTopMovies = expressAsyncHandler(async (req, res) => {
    const topMovies = await Movie.find({}).sort({ numReviews: -1 }).limit(10)
    res.status(200).json({ topMovies })
})

export const getRandomMovies = expressAsyncHandler(async (req, res) => {
    const randomMovies = await Movie.aggregate([{ $sample: { size: 10 } }])
    res.status(200).json({ randomMovies })
})