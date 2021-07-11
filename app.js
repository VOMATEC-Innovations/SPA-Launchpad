const express = require('express')
const app = express()
const port = 3000

const configEnvPrefix = 'SPA_';
let config = {};

app.use(express.static('public'));

app.get('/config', (req, res) => {
    res.set('Content-Type', 'application/json')
    res.send(JSON.stringify(config));
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
    console.log(`Building config`);
    for (const [key, value] of Object.entries(process.env))
        if (key.startsWith(configEnvPrefix))
            config[key.replace(configEnvPrefix, '')] = value;

    console.log('Config', JSON.stringify(config));
})

