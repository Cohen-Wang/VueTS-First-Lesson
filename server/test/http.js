
let http = require('http');


let server = http.createServer(function (req, res) {
    res.end('ahhahahhrehhehehe');
});

server.listen(3000, '192.168.2.101');