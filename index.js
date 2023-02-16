const fs = require('fs');
const path = require('path');
const SocketIO = require('socket.io');
const createServeStaticFile = require('karma/lib/web-server.js').createServeStaticFile;

module.exports = {
    socketServer         : ['factory', Object.assign((webServer, executor, config) => {
        const server = new SocketIO.Server(webServer, {
            // avoid destroying http upgrades from socket.io to get proxied websockets working
            destroyUpgrade : false,
            path           : config.urlRoot + 'socket.io/',
            transports     : config.transports,
            forceJSONP     : config.forceJSONP,
            // Default is 5000 in socket.io v2.x and v3.x.
            pingTimeout : config.pingTimeout || 5000,
            // Default in v2 is 1e8 and coverage results can fail at 1e6
            maxHttpBufferSize : 1e8,
            // with Socket.IO v2 clients
            allowEIO3 : true,
        });

        // hack to overcome circular dependency
        executor.socketIoSockets = server.sockets;

        return server;
    }, {$inject : ['webServer', 'executor', 'config']})],
    serveStaticFile      : ['factory', Object.assign(config => {
        const fn = createServeStaticFile(config);
        return function (filepath, $1, $2, transform, ...args) {
            return fn.apply(this, /karma\.js|client(?:_with_context)?\.html/.test(filepath) ? [filepath, $1, $2, data =>
                /karma\.js/.test(filepath)
                    ? transform(data).replace('iframe.contentWindow.onbeforeunload = undefined', 'try{$&}catch(e){}')
                    : transform(data).replace('<script src="socket.io/socket.io.min.js"></script>', () => `<script>\n${
                        fs.readFileSync(path.resolve(__dirname, 'dist/socket.io.polyfill.min.js'), 'utf8')
                    }\n</script>`), ...args] : arguments);
        };
    }, {$inject : ['config']})],
    'framework:polyfill' : ['factory', Object.assign(files => {
        files.unshift({
            pattern  : require.resolve('@aleen42/karma-polyfill/dist/index.min.js'),
            included : true,
            served   : true,
            watched  : false,
        });
    }, {$inject : ['config.files']})],
};
