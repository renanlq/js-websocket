const ReadLineSync = require('readline-sync');
const WebSocket = require('ws');

const symbol = ReadLineSync.question('Witch coins pair whants to monitor? ');
const ws = new WebSocket('wss://stream.binance.com:9443/ws/bookTicker');

ws.onopen = () => {
    ws.send(JSON.stringify({
        "method": "SUBSCRIBE",
        "params": [
          `${symbol}@bookTicker`
        ],
        "id": 1
      }));    
}

ws.onmessage = (event) => {
    process.stdout.write('\033c');
    const obj = JSON.parse(event.data);
    console.log(`Symbol ${obj.s}`);
    console.log(`Best ask ${obj.a}`);
    console.log(`Best bid ${obj.b}`);
}
