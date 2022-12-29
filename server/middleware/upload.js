import multer from 'multer'

 const upload = multer({
    limits: {
        fileSize: 5 * 1000 * 1000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

export default upload;