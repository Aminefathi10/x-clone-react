
const db = require('../services/firebase');
const express = require('express');
const router = express.Router();
const users = db.collection('users');


router.route('/:user').get(async (req, res) => {
    try{
        const snapshot = await users.doc(req.params.user).get();
        if (!snapshot.exists) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(snapshot.data());  
        
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
    
    })
    

// router.route('/:id').get(async (req, res) => {
//     try {
//         const snap = await postsRef.doc(req.params.id).get();
//         res.json(snap.data())
//     } catch (error) {
//         res.status(401).end();
//     }
    
// })


module.exports = router;