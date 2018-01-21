import { UserModel, User } from "../models/user.model";
import { InstanceType } from "typegoose";
//import { Produces } from "../../../inject/dist/core/inject";
import { Produces } from "@plopezm/tsinject";

export class UserService {
    constructor(){
    }

    async get(username: string): Promise<User> {
        let user = await UserModel.findByUsername(username);
        return user;
    }

    async create(user: User): Promise<User> {
        let userCreated = await UserModel.create(user);
        return userCreated;
    }

    async update(id: string, user: User): Promise<User> {
        let query = { username: id };
        let userUpdated = await UserModel.findOneAndUpdate(query, user);
        return userUpdated;
    }

    async remove(id: string): Promise<User> {
        let query = { username: id };
        let userRemoved = await UserModel.remove(query)
        return userRemoved;
    }

}

export class UserServiceFactory {

    protected static userServiceFactory: UserService;

    @Produces("UserServiceFactory")
    static getInstance(): UserService {
        if (!UserServiceFactory.userServiceFactory){
            UserServiceFactory.userServiceFactory = new UserService();
        }
        return UserServiceFactory.userServiceFactory;
    }

}
