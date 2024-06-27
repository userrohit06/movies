import jwt from 'jsonwebtoken'
import User from '../models/User.model.js'
import expressAsyncHandler from 'express-async-handler'

const isAuthenticated = expressAsyncHandler(async (req, res, next) => {
    const token = req.cookies.token

    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.userId).select("-password")
        next()
    } else {
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})

export default isAuthenticated