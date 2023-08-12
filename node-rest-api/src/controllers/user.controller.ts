import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/user.model";

export const getUsers = async (request: Request, response: Response) => {
    try {
        const users = await User.find();
        return response.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async (request: Request, response: Response) => {
    try {
        const { _id } = request.params;
        const user = await User.findOne({
            _id: new mongoose.Types.ObjectId(_id),
        });
        return response.status(200).json(user);
    } catch (error) {
        console.error(error);
    }
};

export const insertUser = async (request: Request, response: Response) => {
    try {
        const { username, password, role, refresh_token } = request.body;

        const isUsernameExist = await User.findOne({ username });
        if (isUsernameExist)
            return response
                .status(400)
                .json({ msg: `${username} is already taken` });

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            username,
            password,
            role,
            refresh_token,
        });
        await user.save();
        return response
            .status(201)
            .json({ msg: `${username} succefully added` });
    } catch (error: any) {
        return response.status(422).json({ msg: error?._message });
    }
};

export const editUser = async (request: Request, response: Response) => {
    try {
        const { _id } = request.params;
        const { username, password, role, refresh_token } = request.body;

        const isUsernameExist = await User.find({ username });
        if (isUsernameExist.length !== 0)
            return response
                .status(400)
                .json({ msg: `username is already taken` });

        const userFromDatabase = await User.findOne({
            _id: new mongoose.Types.ObjectId(_id),
        });

        const user = await User.updateOne(
            { _id: new mongoose.Types.ObjectId(_id) },
            { username, password, role, refresh_token }
        );

        if (user.acknowledged && user.modifiedCount >= 1)
            return response.status(200).json({
                msg: `${userFromDatabase!.username} successfully edited`,
            });
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = async (request: Request, response: Response) => {
    try {
        const { _id } = request.params;

        const findUser = await User.findOne({
            _id: new mongoose.Types.ObjectId(_id),
        });
        const _idFromDatabase: Array<string> = String(findUser?._id).split(`"`);
        const isSameUser: boolean = _idFromDatabase[0] === _id;

        if (!isSameUser)
            return response.status(400).json({ msg: `id: ${_id} not found` });

        const user = await User.deleteOne({
            _id: new mongoose.Types.ObjectId(_id),
        });

        if (user.acknowledged && user.deletedCount >= 1)
            return response
                .status(200)
                .json({ msg: `${findUser?.username} successfully deleted` });
    } catch (error) {
        console.log(error);
    }
};
