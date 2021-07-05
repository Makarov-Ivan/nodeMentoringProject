const express = require("express");
const { usersRouter } = require("./user/controller");
const { groupsController } = require("./group/controller");
const customLogger = require('./util/costomLogger')
const errorMiddlewear = require('./util/errors/middlewear')

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(customLogger)

const port = process.env.PORT | 3000;

app.use('/users', usersRouter)
app.use('/groups', groupsController)

app.use(errorMiddlewear);

app.listen(port, () => {
    console.log("app is listening on ", port);
});

process.on('uncaughtException', (err, origin) => {
    console.log(
        process.stderr.fd,
        `Caught exception: ${err}\n` +
        `Exception origin: ${origin}`
    );
});