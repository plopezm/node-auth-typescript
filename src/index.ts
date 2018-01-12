import * as mongoose from 'mongoose';
import { InjectionFactory } from '../../inject/dist/index';
import { Server } from "../../decorated-express/dist/index";
import { UserService } from './services/user.service';
import { UserResource } from "./resources/user.resource";

InjectionFactory.register(UserService);

mongoose.connect('mongodb://localhost:27017/auth', { useMongoClient: true});

let server = Server.bootstrap();
server.registerResource(UserResource);
server.start(8080);
