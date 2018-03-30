/* add to scripts in package.json file
"dev": "node ./node_modules/webpack-dev-server/bin/webpack-dev-server.js",
"postinstall": "webpack -p",
"start": "node server.js",
*/

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();

app.use(express.static(__dirname));

app.get('*', (req,res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(port);
console.log('Server started');
