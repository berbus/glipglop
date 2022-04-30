const express = require('express')
const app = express()
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = process.env.REACT_APP_LISTEN_PORT || 3000
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/'


app.use(express.static(path.join(__dirname, 'build')));

app.use(
    '/api',
    createProxyMiddleware({
        target: API_URL,
        changeOrigin: true,
        logger: console
    })
);

app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Glipglop listening on ${PORT}`)
})
