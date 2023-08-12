import mongoose, { Document, Schema } from "mongoose";

enum UserRole {
    USER = "user",
    ADMIN = "admin",
}

interface IUser {
    username: string;
    password: string;
    role: UserRole;
    refresh_token: string;
}

interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: UserRole.USER },
    refresh_token: { type: String, required: false },
});

export default mongoose.model<IUserModel>("users", UserSchema);
