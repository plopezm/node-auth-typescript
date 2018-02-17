import * as mongoose from "mongoose";

export interface IUserModel extends mongoose.Document {
    username: string;
    password: string;
    userData?: UserData;
    verified?: boolean;
    createdAt: Date;
    modifiedAt: Date;
}

export class UserData {
    displayName?: string;
    firstName?: string;
    lastName?: string;
    description?: string;
}

const UserDataSchema = new mongoose.Schema({
    displayName: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    }
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userData: {
        type: UserDataSchema,
        required: false
    },
    verified: {
        type: Boolean,
        required: false
    },
    createdAt: {
         type: Date,
         required: false
    },
    modifiedAt: {
         type: Date,
         required: false
    }
}).pre('save', (next) => {
    if(!this._doc) {
        next();
        return this;
    }
    let doc = <IUserModel>this._doc;
    let now = new Date();
    if (!doc.createdAt) {
      doc.createdAt = now;
    }
    doc.modifiedAt = now;
});

export const UserModel = mongoose.model<IUserModel>('user', UserSchema, 'users', true);
