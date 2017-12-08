import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import * as cors from "cors";
import * as passport from "passport";
import * as jwt from "jsonwebtoken";

import * as setup from "./../app/setup/index";
import * as config from "./index.js";
import UserRoute from "./../app/routes/user";
import AuthRoute from "./../app/routes/auth";
import StaticRoute from "./../app/routes/static";
import passportInit from "./passport-conf";
import databaseInit from "./database";

const passportConfig = passportInit(passport);
const database = databaseInit(mongoose);

const app = express();

app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(morgan('dev'));
app.use(cors());
//  instead of cors
//app.use(function(req, res, next) {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});
app.use(passportConfig.initialize());
app.set('budgetsecret', config.secret);

// define routes
UserRoute(app);
AuthRoute(app);
StaticRoute(app);


export default app;
