import { UserModel, User } from "../models/user.model";
import { InstanceType } from "typegoose";

export class UserService {

    users: any = {};

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

}
