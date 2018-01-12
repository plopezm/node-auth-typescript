import * as mongoose from 'mongoose';
import { InjectionFactory } from '@plopezm/tsinject';
import { Server } from "@plopezm/decorated-express";
import { UserService } from './services/user.service';
import { UserResource } from "./resources/user.resource";

InjectionFactory.register(UserService);

mongoose.connect('mongodb://localhost:27017/auth', { useMongoClient: true});

let server = Server.bootstrap();
server.registerResource(UserResource);
server.start(8080);
