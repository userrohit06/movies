import express from 'express'
import dotenv from 'dotenv'
import errorHandler from './middlewares/errorHandler.js'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import path from 'path'

// import routes
import userRouter from './routes/User.route.js'
import movieRouter from './routes/Movie.route.js'
import genreRouter from './routes/Genre.route.js'
import uploadRouter from './routes/Upload.route.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
dotenv.config()

const PORT = process.env.PORT || 9000

// declare routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/movies", movieRouter)
app.use("/api/v1/genres", genreRouter)
app.use("/api/v1/upload", uploadRouter)

app.use(errorHandler)

const __dirname = path.resolve()
app.use("/uploads", express.static(path.join(__dirname + "/uploads")))

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is up and running on PORT No. ${PORT}`);
        })
    })
    .catch(err => {
        console.error(`Error connecting to server: ${err.message}`);
    })
