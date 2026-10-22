const { WebSocketServer } = require('ws');

// Avvia il server WebSocket sulla porta 8080
const wss = new WebSocketServer({ port: 8080 });

let position = 0; // Indice del quadrato rosso (da 0 a 4)
let direction = 1; // 1 = avanti (destra), -1 = indietro (sinistra)

// Aggiorna la posizione ogni 500ms e la invia a tutti i client
setInterval(() => {
  // Aggiorna posizione
  position += direction;

  // Inverti la direzione quando si raggiungono i bordi
  if (position === 4) direction = -1;
  if (position === 0) direction = 1;

  // Invia la nuova posizione a tutti i client connessi
  wss.clients.forEach((client) => {
    if (client.readyState === 1) { // 1 = OPEN
      client.send(position.toString());
    }
  });
}, 500);

console.log('Server WebSocket avviato sulla porta 8080');
