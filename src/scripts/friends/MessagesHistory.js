import { getUserMessagesHistory, getUsers } from "../data/provider.js";


export const MessagesHistory = () => {
    const users = getUsers();
    let userMessageHistory = getUserMessagesHistory();

    // let messagesSorted = userMessageHistory.sort((a,b) => {
    //     return parseInt(b.dateSent.split("-").join("")) - parseInt(a.dateSent.split("-").join(""));
    // });

    let messagesSorted = userMessageHistory.sort((a,b) => {
        return b.dateSent - a.dateSent
    });

    return `<div>  
        ${messagesSorted.map((message) => {
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
//add alert on login page for wrong credentials when authenticating