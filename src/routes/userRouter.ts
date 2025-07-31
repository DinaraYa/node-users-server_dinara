

import express from "express";
import {userController} from "../server.ts";

export const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
  if (req.query.id) await userController.getUser(req, res);
  else await userController.getAllUsers(req, res);
})

userRouter.post('/', async (req, res) => {
  await userController.addUser(req, res);
})

userRouter.put('/', async (req, res) => {
  const id = req.query.id
  if (id) {
    await userController.updateUser(req, res);
  }
})

userRouter.delete('/', async (req, res) => {
  const id = req.query.id
  if (id) {
  await userController.removeUser(req, res);
  }
})