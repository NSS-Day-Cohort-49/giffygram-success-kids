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
    <div class="msg_btns">
        <div><button id="sentMsgBtn">Sent</button></div>
        <div><button id="receivedMsgBtn">Received</button></div>
        <div><button id="allMsgBtn">All</button></div>
    </div>
    <div id="sentMsgDiv">
    <div class="sentMsgCounter"><h1 class="sent_msg_counter">Sent Messages:</h1><div class="msg_count">${countSentMessages()}</div></div>
    ${getUserSentMessages().map((userSentMessage) => {
      return `<div class="sent_msg_div">
        <p>Topic: ${userSentMessage.topic}</p>
        <p>Message: ${userSentMessage.messageBody}</p>
        <p>Date Sent: ${userSentMessage.dateSent}</p>
        <p>Recipient: ${getUsers().find((user) => user.id === userSentMessage.recipientId).name}</p>
      </div>
      `  
    }).join("")}
  </div>
  `
};