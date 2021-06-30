import { getUserPendingMessages, getUsers } from "../data/provider.js"

export const DirectMessage = () => {
    const users = getUsers();
    //find users return user.id matches the message.userId display user.name
    let unreadMessages = getUserPendingMessages()

    return `<div>  
        ${unreadMessages.map((message) => {
            return `<div>
            <h4>Topic:${message.topic}</h4>
            <p>Message: ${message.messageBody}</p>
            <p>Sent on: ${message.dateSent} by ${message.userId}</p>
            </div>`
        }).join('')}
    </div>`
};