const path = require('path');

const config = {
    resolve: {
        alias: {
            "jquery": path.join(__dirname, "./src/services/jquery-stub.js")
        }
    }
};

module.exports = config;