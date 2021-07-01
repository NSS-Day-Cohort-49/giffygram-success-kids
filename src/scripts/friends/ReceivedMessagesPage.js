import { getUsers, getUserPendingMessages } from "../data/provider.js";


// Counter for messages received in messages history:
const countReceivedMessages = () => {
    let i = 0;
    getUserPendingMessages().forEach(() => {
        i++
    });
    return i;
};


export const ReceivedMessagesPage = () => {
    return `<div> 
        <div class="msg_btns">
            <div><button id="sentMsgBtn">Sent</button></div>
            <div><button id="receivedMsgBtn">Received</button></div>
            <div><button id="allMsgBtn">All</button></div>
        </div>
        <div id="receivedMsgDiv">
        <div class="receivedMsgCounter"><h1 class="received_msg_counter">Received Messages:</h1><div class="msg_count">${countReceivedMessages()}</div></div>
        ${getUserPendingMessages().map((userSentMessage) => {
            return `<div class="received_msg_div">
                <p>Topic: ${userSentMessage.topic}</p>
                <p>Message: ${userSentMessage.messageBody}</p>
                <p>Date Sent: ${userSentMessage.dateSent}</p>
                <p>Sender: ${getUsers().find((user) => user.id === userSentMessage.userId).name}</p>
            </div>
            `  
        }).join("")}
    </div>
    `
};
