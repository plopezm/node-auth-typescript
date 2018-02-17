import { Produces } from "@plopezm/tsinject";
//import { Produces } from "../../../inject/dist/core/inject";

import { UserModel, IUserModel } from "../models/user.model";

export class UserService {
    constructor(){
    }

    static validateUser = (username: string, passwd: string): Promise<boolean> => {
        return UserModel.findOne({username: username, password: passwd}).exec()
        .then((user: IUserModel | null) => {
            return user !== null;
        });
    }

    getByUsername(username: string): Promise<IUserModel | null>{
        return UserModel.findOne({username: username}).exec();
    }

    getByUsernameAndPassword(username: string, password: string): Promise<IUserModel | null>{
        return UserModel.findOne({username: username, password: password}).exec();
    }

    create(user: IUserModel): Promise<IUserModel> {
        let newUser = new UserModel(user);
        return newUser.save();
    }

    update(id: string, user: IUserModel): Promise<IUserModel | null> {
        let query = { username: id };
        return UserModel.findOneAndUpdate(query, user).exec();        
    }

    remove(id: string): Promise<void>{
        let query = { username: id };
        return UserModel.remove(query).exec();
    }

}
