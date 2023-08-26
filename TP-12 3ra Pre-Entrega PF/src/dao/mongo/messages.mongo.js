import messagesModel from "../models/message.model.js";

export class messageDBManager{
    async getMessages(){
        try {
            const messages = await messagesModel.find();
            return messages
        } catch (error) {
            return error;
        }
    }

    async addMessage(data){
        try {
            const { user, message } = data
            const messageAdded = await messagesModel.create({user: user, messages: [message]});
            return messageAdded
        } catch (error) {
            return error;
        }
    }

}