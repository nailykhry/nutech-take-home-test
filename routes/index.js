const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const routesPath = __dirname;

fs.readdirSync(routesPath)
    .filter(file => file !== 'index.js' && file.endsWith('-route.js'))
    .forEach(file => {
        const routePath = path.join(routesPath, file); 
        router.use(require(routePath)); 
    });

module.exports = router;
