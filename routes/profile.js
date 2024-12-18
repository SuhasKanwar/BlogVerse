const express = require('express');
const path = require('path');
const multer = require('multer');

const router = express.Router();

const profileController = require('../controllers/profileController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('./public/avatars'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.get('/:id', profileController.profileRender);
router.get('/edit/:id', profileController.profileEditRednder);
router.post('/edit/:id', upload.single('profileImage'), profileController.profileUpdateHandler);

module.exports = router;