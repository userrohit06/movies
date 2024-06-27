import express from 'express'
import { signUpUser, signInUser, test, signOutCurrentUser, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile } from '../controllers/User.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import isAdmin from '../middlewares/isAdmin.js'

const router = express.Router()

router.route("/signup").post(signUpUser)
router.route("/signin").post(signInUser)
router.route("/signout").post(isAuthenticated, signOutCurrentUser)
router.route("/all-users").get(isAuthenticated, isAdmin, getAllUsers)
router.route("/profile").get(isAuthenticated, getCurrentUserProfile)
router.route("/profile/update-user").put(isAuthenticated, updateCurrentUserProfile)
router.route("/test").get(isAuthenticated, test)

export default router