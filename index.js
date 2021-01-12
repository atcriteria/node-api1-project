const server = require('./api/server');

server.listen(5000, () => {
    console.log(`listening on :5000`);
});