const express = require("express");
const usersRouter = require("./user/controller");
const groupsRouter = require("./group/controller");
const loginRouter = require('./login/controller')
const customLogger = require('./util/costomLogger')
const errorMiddlewear = require('./util/errors/middlewear')
const jwtTokenService = require('./login/services/jwt')

const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(customLogger)

app.use('/login', loginRouter)

app.use('/users', jwtTokenService.checkToken, usersRouter)
app.use('/groups', jwtTokenService.checkToken, groupsRouter)

app.use(errorMiddlewear);

const port = process.env.PORT || 3000;
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