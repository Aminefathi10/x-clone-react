const getResponse = require('./ai/openAI');
const gemeni = require('./ai/gemeni')
const express = require('express');
const { join } = require('node:path')
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const cors = require('cors');
const dotenv = require('dotenv');
const mainSocket = require('./sockets/main');
const { logEvents } = require('./middleware/logger');
const postsHandler = require('./routes/postsController');
const usersHandler = require('./routes/usersController');
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
const io = new Server(server, ioConfig);

app.use(cors());
app.use(express.json());
app.use(logEvents);

app.use('/', require('./routes/root'))
app.use('/posts', postsHandler);
app.use('/users', usersHandler);
app.use(express.static(join(__dirname, 'dist')));



// app.get('/', (_req, res) => res.sendFile(join(__dirname, 'dist', 'index.html')))



io.on('connection', mainSocket);

server.listen(PORT, () => console.log('Server is running'))

