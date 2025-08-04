
const db = require('../services/firebase');
const express = require('express');
const router = express.Router();
const postsRef = db.collection('Posts');


router.route('/').get(async (req, res) => {
    try{
        const snapshot = await postsRef.get();
        const posts = [];
        snapshot.forEach(doc => {
            posts.push({
                id: doc.id,
                ...doc.data()
            });
        });

        res.json(posts)
        
    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
    
    })
    .post(async (req, res) => {
        try {
            const response = await postsRef.add(req.body);
            res.send({ id: response.id })
        } catch (error) {
            res.status(401).end()
        }
    })
    .delete(async (req, res) => {
        try {
            const response = await postsRef.doc(req.body.id).delete();
            res.json(response);
        } catch (error) {
            res.status(401).send('the document povided does not exist');
        }
        
    });

router.route('/:id').get(async (req, res) => {
    try {
        const snap = await postsRef.doc(req.params.id).get();
        res.json(snap.data())
    } catch (error) {
        res.status(401).end();
    }
    
})


module.exports = router;