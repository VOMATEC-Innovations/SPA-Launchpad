const express = require('express');
const app = express();
const port = 3000;


const buildConfigData = () => {
    const config = {}
    const configEnvPrefix = 'SPA_';
    for (const [key, value] of Object.entries(process.env))
    if (key.startsWith(configEnvPrefix))
        config[key.replace(configEnvPrefix, '')] = value;
    
    return config;
}
const configData = buildConfigData();

const getConfigRoute = () => {
    let route = process.env.CONFIG_ROUTE;
    if (route)
        route = route.replace(/[^a-zA-Z0-9-_]/g, '');

    return route ? `/${route}` : '/config';
}
const configRoute = getConfigRoute();


app.use(express.static('public'));

app.get(configRoute, (req, res) => {
    res.json(configData);
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
    console.log(`Serving config on route '${configRoute}'`);
    console.log('Config:', JSON.stringify(configData));
})