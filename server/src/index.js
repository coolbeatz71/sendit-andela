import http from 'http';
import app from './app';


// creating a port or use the one from the environment process
const port = process.env.PORT || 8080;
// creating a server
const server = http.createServer(app);

server.listen(port);

module.exports = server;
