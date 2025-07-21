const gemeni = require('../ai/gemeni');
const getResponse = require('../ai/openAI')

const main = socket => {
    console.log('user connected!')
    socket.on('prompt', async prompt => {
        console.log(prompt);
        try {
            // const result = await getResponse(socket, 'short', prompt);
            // socket.emit('response', result.choices[0].message.content);

            const result = await gemeni.generateContent(prompt);
            socket.emit('response', result.response.text());
        } catch (err) {
            console.log(err);
            socket.emit('error', 'seems like there is an issue, try again later!');
        }
    })
}

module.exports = main;