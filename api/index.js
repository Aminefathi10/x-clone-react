const getResponse = require('./ai/index');
const gemeni = require('./ai/gemeni')
const express = require('express');
const { join } = require('node:path')
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const PORT = 8000;

const app = express();

const ioConfig = {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  };
  
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(express.static(join(__dirname, 'dist')))

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Request Body:", req.body); // Log request body
  next();
});

app.get('/', (req, res) => res.sendFile(join(__dirname, 'dist', 'index.html')))

// POST route
app.post("/generate", async (req, res) => {
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
        console.log(err.message);
        res.status(500).json({
            massage: 'please try again latter'
        })
    }
   
});


io.on('connection', socket => {
    console.log('user connected!')
    socket.on('prompt', async prompt => {
        // console.log(prompt);
        // try {
        //     getResponse(socket, 'short', prompt);
        // } catch (err) {
        //     console.log(err)
        // }
        const result = await gemeni.generateContent(prompt);
        socket.emit('response', result.response.text())
    })
})

server.listen(PORT, () => console.log('Server is running'))

