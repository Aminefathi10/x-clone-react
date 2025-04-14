const main = socket => {
    console.log('user connected!')
    socket.on('prompt', async prompt => {
        console.log(prompt);
        try {
            // getResponse(socket, 'short', prompt);
            const result = await gemeni.generateContent(prompt);
            socket.emit('response', result.response.text());
        } catch (err) {
            console.log(err);
            socket.emit('error', 'server error, try again later!');
        }
    })
}

module.exports = main;