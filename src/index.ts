import * as mongoose from 'mongoose';
import { InjectionFactory } from '@plopezm/tsinject';
import { Server } from "@plopezm/decorated-express";
//import { Server } from "../../decorated-express/dist/index";
import { UserService } from './services/user.service';
import { UserResource } from "./resources/user.resource";

InjectionFactory.register(UserService);

mongoose.connect('mongodb://localhost:27017/auth', { useMongoClient: true})
    .catch((err) => {
        console.log(err);
        process.exit();
    });

let server = Server.bootstrap();
server.registerResource(UserResource);
server.start("/api", 8080);
