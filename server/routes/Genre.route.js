import express from 'express'
import {
    createNewGenre,
    updateGenre,
    removeGenre,
    listAllGenres,
    singleGenre
} from '../controllers/Genre.controller.js'
import isAdmin from '../middlewares/isAdmin.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const router = express.Router()

router.route("/create-genre").post(isAuthenticated, isAdmin, createNewGenre)
router.route("/update-genre/:id").put(isAuthenticated, isAdmin, updateGenre)
router.route("/remove-genre/:id").delete(isAuthenticated, isAdmin, removeGenre)
router.route("/genres").get(listAllGenres)
router.route("/genre/:id").get(singleGenre)

export default router