require('./polyfill');
require('json3');
Object.assign(self, {io : require('socket.io-client')});
