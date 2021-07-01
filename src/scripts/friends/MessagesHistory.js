import { getUserMessagesHistory } from "../data/provider.js";

export const MessagesHistory = () => {
    let userMessageHistory = getUserMessagesHistory();

    return `<div>  
        ${userMessageHistory.map((message) => {
            return `<div>
            <h4>Topic:${message.topic}</h4>
            <p>Message: ${message.messageBody}</p>
            <p>Sent on: ${message.dateSent} by ${message.userId}</p>
            </div>`
        }).join('')}
    </div>`
};