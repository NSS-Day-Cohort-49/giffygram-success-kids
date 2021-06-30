import { getUserPendingMessages, getUsers } from "../data/provider.js";



export const DirectMessage = () => {
    const users = getUsers();
    //find users return user.id matches the message.userId display user.name
    let unreadMessages = getUserPendingMessages()

    return `<div>  
        ${unreadMessages.map((message) => {
            const foundUser = users.find(user => user.id === parseInt(message.userId));
            return `<div>
            <h4>Topic:${message.topic}</h4>
            <p>Message: ${message.messageBody}</p>
            <p>Sent on: ${message.dateSent} by ${foundUser.name}</p>
            </div>`
        }).join('')}
    </div>`
};

//sort method to sort messages by date sent then add styling