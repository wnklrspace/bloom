import UserModel from '../../../models/UserModel';
import { Callback, ErrorMessage, Message } from '../../../types/EventsMap';
import { DatabaseUserProps, UserProps } from '../../../types/interfaces/userInterface';
import { Request, Response } from 'express';

const editUser = async (params:{userId: string}, req: Request, callback: Callback) => {
    const { userId } = params;
    
    const {cName, address, contact} = req.body;
    const updatedFields: Partial<UserProps> = {};

    if (cName) updatedFields.cName = cName;
    if (address) updatedFields.address = address;
    if (contact) updatedFields.contact = contact;

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updatedFields, {new: true});

    if (updatedUser) {
        callback({
            isSuccess: true,
            message: Message.USER_SUCCESSFULLY_UPDATED,
            res: updatedUser,
        });
    } else {
        callback({
            isSuccess: false,
            message: ErrorMessage.USER_COULD_NOT_BE_UPDATED,
        });
    }

}

export default editUser;