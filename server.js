const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: PORT }, () => {
    console.log(`Voice WebSocket server running on port ${PORT}`);
});

wss.on('connection', (ws) => {
    console.log('New client connected!');

    ws.on('message', (message) => {
        // Пересылаем полученные пакеты голоса/данных всем остальным подключенным игрокам
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
