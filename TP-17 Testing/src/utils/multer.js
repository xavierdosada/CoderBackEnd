import __dirname from '../utils.js'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, `${__dirname}/../public/img`)
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploader = multer({
    storage,
    onError: function(err, next) {
        console.log("file upload-img error", err)
        next()
    }
})

export default uploader;