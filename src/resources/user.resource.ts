import * as express from "express";

import { Inject } from "@plopezm/tsinject";
// import { Inject } from '../../../inject/dist/index';
 import { GET, POST, DELETE, PUT, Middlewares, BasicAuth, JWTAuth, JWTFactory, SignOptions, BasicData } from "@plopezm/decorated-express";
// import { GET, POST, DELETE, PUT, Middlewares, BasicAuth, JWTFactory, JWTAuth, SignOptions, BasicData } from  "../../../decorated-express/dist/index";
import { UserService } from "../services/user.service";
import { IUserModel } from "../models/user.model";

function sayHelloWorld1(req: express.Request, res: express.Response, next: Function) {
    console.log("Hello world middleware 1");
    next();
}

function sayHelloWorld2(req: express.Request, res: express.Response, next: Function) {
    console.log("Hello world middleware 2");
    next();
}

export class UserResource {

    @Inject()
    userService: UserService;

    constructor(){
    }

    @GET("/login")
    @BasicAuth(UserService.validateUser)
    login(req: express.Request, res: express.Response, next: Function){
        let basicAuthUser: BasicData = res.locals.auth.basic;

        let signOptions: SignOptions = {
            expiresIn: 15
        };
        let token = JWTFactory.generateToken("secret",
            {username: basicAuthUser.username}, signOptions);
        res.json({status: 80, token: token});
    }
        
    @GET("/users/:username")
    @Middlewares(sayHelloWorld1, sayHelloWorld2)
    @JWTAuth("secret", { algorithm: 'HS512' })
    findUser(req: express.Request, res: express.Response, next: Function){
        let id = req.params.username;
        let jwtPayload = res.locals.auth.jwt;
        console.log(jwtPayload);
        let userPromise = this.userService.getByUsername(id);
        userPromise.then((user) => {
            if(!user){
                res.status(404);
                res.json({code: 404, msg: "NOT_FOUND"});
                return;
            }
            res.json(user);
        }).catch((err) => {
            res.json(err);
        });
    }

    @POST("/users")
    createUser(req: express.Request, res: express.Response, next: Function) {
        let userPromise = this.userService.create(req.body);
        userPromise.then((user) => {
            if(!user){
                res.status(400);
                res.json({code: 400, msg: "BAD_REQUEST"});
                return;
            }
            res.json(user);
        }).catch((err) => {
            res.json(err);
        });
    }

    @PUT("/users/:username")
    updateUser(req: express.Request, res: express.Response, next: Function) {
        let id = req.params.username;
        let userPromise = this.userService.update(id, req.body);
        userPromise.then((user) => {
            if(!user){
                res.status(404);
                res.json({code: 404, msg: "NOT_FOUND"});
                return;
            }
            res.json(req.body);
        }).catch((err) => {
            res.json(err);
        });
    }

    @DELETE("/users/:username")
    deleteUser(req: express.Request, res: express.Response, next: Function) {
        let id = req.params.username;
        let userPromise = this.userService.remove(id);
        userPromise.then((user) => {
            if(!user){
                res.status(404);
                res.json({code: 404, msg: "NOT_FOUND"});
                return;
            }
            res.json(req.body);
        }).catch((err) => {
            res.json(err);
        });
    }

}
