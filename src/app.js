const express = require("express");
const port = process.env.PORT || 7000
const app = express();
const morgan = require("morgan");
const fs = require('fs');
const path = require("path");

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' })

app.use(morgan("common", {
    stream: accessLogStream
}));





// app server
module.exports = function appServer() {
    app.listen(port, () => {
    console.log(`Server runnning on port: ${port} access via http://localhost:${port}`);
})
}

