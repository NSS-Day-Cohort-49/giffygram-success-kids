import { getUserPendingMessages, getUsers } from "../data/provider.js";



export const DirectMessage = () => {
    const users = getUsers();
    let unreadMessages = getUserPendingMessages();
    
    // let messagesSorted = unreadMessages.sort((a,b) => {
    //     return parseInt(b.dateSent.split("-").join("")) - parseInt(a.dateSent.split("-").join(""));
    // });

    let messagesSorted = unreadMessages.sort((a,b) => {
        return b.dateSent - a.dateSent
    });

    return `<div>  
        ${messagesSorted.map((message) => {
            const foundUser = users.find(user => user.id === parseInt(message.userId));
            return `<div class="dm_div">
                <p class="dm_topic">Topic: ${message.topic}</p>
                <p class="dm_msg">Message: ${message.messageBody}</p>
                <p class="dm_dateSent">Sent on: ${message.dateSent}</p>
                <p>From: ${foundUser.name}</p>
            </div>`
        }).join('')}
    </div>`
};

