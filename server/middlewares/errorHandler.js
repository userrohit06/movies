const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode).json({
        message: error.message,
        stack: process.env.NODE_ENV === "DEVELOPMENT" ? error.stack : {}
    })
}

export default errorHandler