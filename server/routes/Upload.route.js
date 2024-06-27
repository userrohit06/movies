import path from 'path'
import express from 'express'
import multer from 'multer'
import sharp from 'sharp'
import fs from 'fs'

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname)
        const basename = path.basename(file.originalname, extname)
        cb(null, `${basename}-${Date.now()}${extname}`)
    }
})

const fileFilter = (req, file, cb) => {
    const filetypes = /jpe?g|png|webp/
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/

    const extname = path.extname(file.originalname)
    const mimetype = file.mimetype

    if (filetypes.test(extname) && mimetypes.test(mimetype)) {
        cb(null, true)
    } else {
        cb(new Error("Images only"), false)
    }
}

const upload = multer({ storage, fileFilter })
const uploadSingleImage = upload.single("image")

router.route("/").post((req, res) => {
    uploadSingleImage(req, res, async (err) => {
        if (err) {
            res.status(400).json({ message: err.message })
        } else if (req.file) {
            try {
                const originalPath = req.file.path
                const resizedPath = `uploads/resized-${req.file.filename}`

                // resize the image to 500px width and save it
                await sharp(req.file.path)
                    .resize({ width: 800 })
                    .toFile(resizedPath)

                res.status(200).json({
                    message: "File uploaded and resized successfully",
                    originalImage: `/${originalPath.replace(/\\/g, '/')}`,
                    resizedImage: `/${resizedPath.replace(/\\/g, '/')}`
                })
            } catch (error) {
                res.status(500).json({
                    message: "No image file provided"
                })
            }
        } else {
            res.status(400).json({ message: "No image file provided" })
        }
    })
})

export default router