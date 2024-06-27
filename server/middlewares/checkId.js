import { isValidObjectId } from "mongoose";

const checkId = (req, res, next) => {
    if (!isValidObjectId) {
        throw new Error(`Invalid Object of: ${req.params.id}`)
    }
    next()
}

export default checkId