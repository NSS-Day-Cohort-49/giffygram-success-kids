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
        <div>
            <button id="sentMsgBtn">Sent</button>
            <button id="receivedMsgBtn">Received</button>
            <button id="allMsgBtn">All</button>
        </div>
        <div id="messageHistoryDiv">
        <p>Received Messages: ${countReceivedMessages()}</p>
        ${getUserPendingMessages().map((userSentMessage) => {
            return `
                <p>Topic: ${userSentMessage.topic}</p>
                <p>Message: ${userSentMessage.messageBody}</p>
                <p>Date Sent: ${userSentMessage.dateSent}</p>
                <p>Sender: ${getUsers().find((user) => user.id === userSentMessage.userId).name}</p>
            `  
        }).join("")}
    </div>
    `
};

//Needs styling