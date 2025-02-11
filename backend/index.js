const getResponse = require('./ai/index');
const express = require('express');
const cors = require('cors');
const port = 8000;

const app = express();

app.use(cors());
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Request Body:", req.body); // Log request body
  next();
});

// POST route
app.post("/", async (req, res) => {
    const { prompt } = req.body;

    if(!prompt) {
        return res.status(400).json({
            message: 'please enter a prompt'
        });   
    }
    try { 
        const completion = await getResponse('short', prompt);
        res.status(200).json({
        res: completion.choices[0].message.content
    }) 
    } catch (err) {
        console.log(err);
        res.status(500).json({
            massage: 'please try again latter'
        })
    }
   
});

module.exports = app