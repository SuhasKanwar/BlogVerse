const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, path.resolve(`./public/cover-images/${req.user._id}`));
        cb(null, path.resolve(`./public/cover-images/`));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()} - ${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

const blogController = require('../controllers/blogCreateController');
const blogViewController = require('../controllers/blogViewController');
const commentsController = require('../controllers/commentsController');

router.post('/add-blog', upload.single('coverImage'), blogController.blogCreateHandler);
router.get('/:id', blogViewController.blogViewRender);
router.post('/comment/:blogID', commentsController.commentHandler);
router.post('/ai-rewrite', blogController.blogAIRewrite);

module.exports = router;