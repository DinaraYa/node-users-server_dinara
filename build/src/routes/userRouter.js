var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import { userController } from "../server.js";
export const userRouter = express.Router();
userRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.id)
        yield userController.getUser(req, res);
    else
        yield userController.getAllUsers(req, res);
}));
userRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield userController.addUser(req, res);
}));
userRouter.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    if (id) {
        yield userController.updateUser(req, res);
    }
}));
userRouter.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    if (id) {
        yield userController.removeUser(req, res);
    }
}));
