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
            return `<div class="msg_history_div">
            <div class="msg_hx"><h4 class="msgHistory">Topic:${message.topic}</h4>
            <p "msgHistory">Message: ${message.messageBody}</p>
            <p "msgHistory">Sent on: ${message.dateSent}</p>
            <p "msgHistory">From: ${foundUser.name}</p></div>
            </div>`
        }).join('')}
    </div>`
};

//sort method to sort messages by date sent then add styling
//add alert on login page for wrong credentials when authenticating