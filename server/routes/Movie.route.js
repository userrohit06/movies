import express from 'express'
import {
    createNewMovie,
    deleteComment,
    deleteMovie,
    getAllMovies,
    getNewMovies,
    getRandomMovies,
    getSpecificMovie,
    getTopMovies,
    reviewMovie,
    updateMovie
} from '../controllers/Movie.controller.js'
import isAdmin from '../middlewares/isAdmin.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import checkId from '../middlewares/checkId.js'

const router = express.Router()

// public routes
router.route("/all-movies").get(getAllMovies)
router.route("/specific-movie/:id").get(getSpecificMovie)
router.route("/top-movies").get(getTopMovies)
router.route("/new-movies").get(getNewMovies)
router.route("/random-movies").get(getRandomMovies)

// restricted routes
router.route("/movie/:id/review").post(isAuthenticated, checkId, reviewMovie)

// admin routes
router.route("/update-movie/:id").put(isAuthenticated, isAdmin, updateMovie)
router.route("/delete-movie/:id").delete(isAuthenticated, isAdmin, deleteMovie)
router.route("/delete-comment").delete(isAuthenticated, isAdmin, deleteComment)
router.route("/create-movie").post(isAuthenticated, isAdmin, createNewMovie)

export default router