import * as mongoose from 'mongoose';
import { InjectionFactory } from '@plopezm/tsinject';
//import { InjectionFactory } from '../../inject/dist/index';
import { Server } from "@plopezm/decorated-express";
//import { Server } from "../../decorated-express/dist/index";
import { UserService } from './services/user.service';
import { UserResource } from "./resources/user.resource";
import * as bodyParser from 'body-parser';
import * as logger from "morgan";

InjectionFactory.register(UserService);

mongoose.connect('mongodb://localhost:27017/auth', { useMongoClient: true})
    .catch((err) => {
        console.log(err);
        process.exit();
    });

let server = Server.bootstrap();
server.config(logger("dev"),
 bodyParser.json(),
 bodyParser.urlencoded({extended: true}));
server.registerResource(UserResource);
server.start("/api", 8080);
