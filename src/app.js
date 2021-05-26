const express = require("express");
const oasTools = require("oas-tools");
const jsyaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

var spec = fs.readFileSync(path.normalize(`${__dirname}/../spec/spec.yaml`), "utf8");
var oasDoc = jsyaml.load(spec);

const app = express();

const port=3000;

const oasToolsOptions={
    controllers: path.normalize(`${__dirname}/`),
    strict: false,
};

oasTools.configure(oasToolsOptions);

oasTools.initializeMiddleware(oasDoc, app, function(middleware) {
    // Configuration of usage of swagger middlewares with app.use()
    // console.log(middleware);
    app.use(middleware.swaggerMetadata());
  
    // Start the server
    app.listen(port, ()=>{
        console.log("app is listening on ", port);
    });
  });

