import * as express from "express";
import { Inject } from "../../../inject/dist/index";
import { GET, POST, DELETE } from "../../../decorated-express/dist/index";
import { UserService } from "../services/user.service";
import { PUT } from "../../../decorated-express/dist/decorations/resource.decoration";

export class UserResource {

    @Inject
    userService: UserService;

    constructor(){
    }

    @GET("/users/:username")
    findUser(req: express.Request, res: express.Response, next: Function){
        let id = req.params.username;
        let userPromise = this.userService.get(id);
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

}
