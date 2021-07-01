import { getUsers, getUserSentMessages } from "../data/provider.js";

// Counter for messages sent in messages history:
const countSentMessages = () => {
    let i = 0;
    getUserSentMessages().forEach(() => {
        i++
    });
    return i;
};


export const SentMessagesPage = () => {
  return `<div> 
    <div>
        <button id="sentMsgBtn">Sent</button>
        <button id="receivedMsgBtn">Received</button>
        <button id="allMsgBtn">All</button>
    </div>
    <div id="messageHistoryDiv">
    <p>Sent Messages: ${countSentMessages()}</p>
    ${getUserSentMessages().map((userSentMessage) => {
      return `
        <p>Topic: ${userSentMessage.topic}</p>
        <p>Message: ${userSentMessage.messageBody}</p>
        <p>Date Sent: ${userSentMessage.dateSent}</p>
        <p>Recipient: ${getUsers().find((user) => user.id === userSentMessage.recipientId).name}</p>
      `  
    }).join("")}
  </div>
  `
};

//Needs styling: