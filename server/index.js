const server = require('./app');

server.listen(8484,'localhost',() => {
    console.log('Server is listening on port 8484');
});

module.exports.time = Date.now();
