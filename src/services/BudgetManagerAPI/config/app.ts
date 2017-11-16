import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import * as cors from "cors";
import * as passport from "passport";
import * as jwt from "jsonwebtoken";
import * as config from "./index.js";
import passportInit from "./passport";
import databaseInit from "./database";
const passportConfig = passportInit(passport);
const database = databaseInit(mongoose, config);

const app = express();


app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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
