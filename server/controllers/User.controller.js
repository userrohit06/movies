import User from '../models/User.model.js'
import expressAsyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signUpUser = expressAsyncHandler(async (req, res) => {
    // get fields from req.body
    const { username, email, password, isAdmin } = req.body

    // check if all fields are filled
    if (!username || !email || !password) {
        throw new Error("All fields are necessary")
    }

    // check if user already exists
    const userExists = await User.findOne({ email })

    // throw error if user exists
    if (userExists) {
        throw new Error("User already exists")
    }

    // hash password
    const salt = bcrypt.genSaltSync(10)
    const hashedPsd = bcrypt.hashSync(password, salt)

    // create new user
    const newUser = new User({ username, email, password: hashedPsd, isAdmin })

    try {
        // save user to database
        await newUser.save()

        // send response
        res.status(200).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        })
    } catch (error) {
        throw new Error("Invalid user data")
    }
})

export const signInUser = expressAsyncHandler(async (req, res) => {
    // get data from body
    const { email, password } = req.body

    // validate fields
    if (!email || !password) {
        throw new Error("All fields are compulsary")
    }

    // check if user exists
    const userExists = await User.findOne({ email })
    if (!userExists) throw new Error("User not found")

    // check if password is correct
    const isPasswordValid = bcrypt.compareSync(password, userExists.password)
    if (!isPasswordValid) throw new Error("Invalid credentials")

    // create token
    const token = jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })

    // set token into cookies
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'DEVELOPMENT',
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
        _id: userExists._id,
        username: userExists.username,
        email: userExists.email,
        isAdmin: userExists.isAdmin
    })
})

export const signOutCurrentUser = expressAsyncHandler(async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: "Logged out successfully" })
})

export const getAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find()
    res.json({ users })
})

export const getCurrentUserProfile = expressAsyncHandler(async (req, res) => {
    const currentUserId = req.user._id
    const user = await User.findById(currentUserId)
    if (user) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    } else {
        throw new Error("User not found")
    }
})

export const updateCurrentUserProfile = expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    // console.log("user: ", user);

    if (user) {
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if (req.body.password) {
            const genSalt = bcrypt.genSaltSync(10)
            const hashedPsd = bcrypt.hashSync(req.body.password, genSalt)
            user.password = hashedPsd || user.password
        }

        if (req.body.isAdmin !== undefined) {
            user.isAdmin = req.body.isAdmin
        }
    }

    const updatedUser = await user.save()

    res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
    })
})

export const test = expressAsyncHandler(async (req, res) => {
    res.json({ message: "Hello World!" })
})