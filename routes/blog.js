const express = require('express');

const router = express.Router();

const blogController = require('../controllers/blogCreateController');

router.post('/add-blog', blogController.blogCreateHandler);

module.exports = router;