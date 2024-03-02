import UserModel from "../../../models/UserModel";
import { UserProps } from "../../../types/interfaces/userInterface";
import { Callback, ErrorMessage, Message } from "../../../types/EventsMap";
import { Request } from "express";

const editCredentials = async (params:{userId: string}, req: Request, callback: Callback) => {
    const { userId } = params;

    const { oldPassword, newPassword } = req.body;

    try {
        const user = await UserModel.findById(userId);
        if (!user) {
            callback({
                isSuccess: false,
                message: ErrorMessage.USER_COULD_NOT_BE_FOUND,
            });
            return;
        }
        const isMatch = user.comparePassword(oldPassword);
        if (!isMatch) {
            callback({
                isSuccess: false,
                message: ErrorMessage.OLD_PASSWORD_IS_INCORRECT,
            });
            return;
        }
    } catch (error) {
        callback({
            isSuccess: false,
            message: ErrorMessage.COULD_NOT_UPDATE_PASSWORD
        });
        return;
    }


    const updatedUser = await UserModel.findByIdAndUpdate(userId, { password: newPassword });
    if (updatedUser) {
        callback({
        isSuccess: true,
        message: Message.USER_SUCCESSFULLY_UPDATED,
        });
    } else {
        callback({
        isSuccess: false,
        message: ErrorMessage.USER_COULD_NOT_BE_UPDATED
        });
    }

} 
export default editCredentials;