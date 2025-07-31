const express = require('express');
const router = express.Router();
const { join } = require('node:path');


router.route('/').get((req, res) => {
    res.sendFile(join(__dirname, '..', 'dist', 'index.html'))
});

module.exports = router;