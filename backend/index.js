var hapi = require('hapi');

var ws = new hapi.Server('localhost', 8080);

var breaks = [{
  id: '1',
  name: 'Carcavelos',
  region: 'Lisbon',
  lat: '42.99167',
  lon: '143.20028',
  type: 'Beach Break',
  direction: 'Left and Right'
}, {
 id: '2',
  name: 'Guincho',
  region: 'Lisbon',
  lat: '43.99167',
  lon: '142.20028',
  type: 'Beach Break',
  direction: 'Left and Right'
}];

ws.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    //reply('Zurf....');
    reply(breaks);
  }
});

ws.start();