const path = require('path');

const config = {
    resolve: {
        alias: {
            "jquery": path.join(path, "./src/services/jquery-stub.js")
        }
    }
};

module.exports = config;