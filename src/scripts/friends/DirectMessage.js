import { getUserPendingMessages } from "../data/provider.js"

export const DirectMessage = () => {
    let unreadMessages = getUserPendingMessages()

    return `<div>  
        ${unreadMessages.map((message) => {
            return `<div>
            <h4>${message.topic}</h4>
            <p>${message.messageBody}</p>
            <p>Sent on: ${message.dateSent}</p>
            </div>`
        }).join('')}
    </div>`
}