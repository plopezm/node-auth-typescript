import { Typegoose, prop, ModelType, staticMethod } from 'typegoose';

export class User extends Typegoose {
    @prop({unique: true, required: true, index: true })
    username: string;
    @prop({required: true})
    password: string;
    @prop()
    displayName?: string;
    @prop()
    firstName?: string;
    @prop()
    lastName?: string;
    @prop()
    description?: string;
    @prop()
    verified?: boolean;

    @staticMethod
    static findByUsername(this: ModelType<User> & typeof User, username: string) {
        return this.findOne({ username });
    }
}

export const UserModel = new User().getModelForClass(User);