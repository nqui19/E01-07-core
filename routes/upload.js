const router = require('express').Router()
const cloudinary = require('cloudinary').v2
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')
    //Upload image on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

router.post('/upload', (req, res) => {
    try {
        console.log(req.files.file)
        if (!req.files || Object.keys(req.files).length === 0) return res.status(400).send('No files were uploaded.')
        const file = req.files.file;

        // @ts-ignore
        //for (const file of files){
        if (file.size > 1024 * 1024) {
            // @ts-ignore
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: "Size too large" })
        }
        // @ts-ignore
        if (file.mimetype !== "image/jpeg" && file.mimetype !== 'image/png') {
            // @ts-ignore
            removeTmp(file.tempFilePath)
            return res.status(400).json({ msg: "File format is incorrect." })
        }
        // @ts-ignore
        //cloudinary.uploader.upload(file.tempFilePath, { folder: `test/${file.name}` }, async(err, result) => {
        cloudinary.uploader.upload(file.tempFilePath, { folder: `EC107` }, async(err, result) => {
            if (err) throw err
                // @ts-ignore
            removeTmp(file.tempFilePath)

            res.json({ public_id: result.public_id, url: result.secure_url })
        })//}
    } catch (err) {
        return res.status(400).json({ msg: err.message })
    }
})

router.post('/destroy', (req, res) => {
    try {
        const { public_id } = req.body
        if (!public_id) return res.status(400).json({ msg: 'No image selected' })
        cloudinary.uploader.destroy(public_id, async(err, result) => {
            if (err) throw err
            res.json({ msg: "Deleted Image" })
        })
    } catch (err) {
        return res.status(400).json({ msg: err.message })
    }
})
const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
}

module.exports = router