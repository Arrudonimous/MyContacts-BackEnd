const express = require('express');

const app = express();

const routes = require('./routes');

// Middleware
// app.use((request, response) => {
//   request.appId = 'MeuAppId';
//   response.send('Interceptado pelo Middleware');
// });
app.use(routes);

app.listen(3000, () => console.log('Server started at http://localhost:3000'));
