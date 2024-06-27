import Genre from '../models/Genre.model.js'
import expressAsyncHandler from 'express-async-handler'

export const createNewGenre = expressAsyncHandler(async (req, res) => {
    const name = req.body.name
    if (!name) throw new Error("Name is required")

    const existingGenre = await Genre.findOne({ name })
    if (existingGenre) throw new Error("Genre already exists")

    const genre = await new Genre({ name }).save()
    res.status(200).json({ genre })
})

export const updateGenre = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const genre = await Genre.findOne({ _id: id })
    if (!genre) throw new Error("Genre not found to update")

    genre.name = name || genre.name
    const updatedGenre = await genre.save()
    res.status(200).json({ updatedGenre })
})

export const removeGenre = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const removedGenre = await Genre.findByIdAndDelete(id)
    if (!removedGenre) throw new Error("Genre not found to be removed")

    res.status(200).json({ removedGenre })
})

export const listAllGenres = expressAsyncHandler(async (req, res) => {
    const genres = await Genre.find()
    res.status(200).json({ genres })
})

export const singleGenre = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const genre = await Genre.findOne({ _id: id })
    if (!genre) throw new Error("Genre not found")

    res.status(200).json({ genre })
})