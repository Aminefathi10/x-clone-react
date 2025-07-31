const router = require('express').Router();
const db = require('../services/firebase');
const usersREF = db.collection('users');




router.route('/:id').get(async (req, res) => {
    const userData = await usersREF.doc(req.params.id).get();
    
})