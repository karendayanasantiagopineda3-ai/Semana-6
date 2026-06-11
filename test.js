const http = require('http');

const data = JSON.stringify({tipo: "Iluminacion publica", descripcion: "La comunidad reporta 3 postes sin luz en la carrera 5"});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/incidencia',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log(body);
    require('fs').writeFileSync('ejemplo-incidencia.txt', body);
  });
});

req.write(data);
req.end();
