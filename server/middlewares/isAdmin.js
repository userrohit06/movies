import User from '../models/User.model.js'

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        throw new Error("Not authorized as admin")
    }
}

export default isAdmin