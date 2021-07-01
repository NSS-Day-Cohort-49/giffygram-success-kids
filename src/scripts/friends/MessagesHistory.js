import { getAllUserMessages, getUserMessagesHistory, getUsers } from "../data/provider.js";

const applicationElement = document.querySelector(".giffygram")
const hello = document.querySelector("#hello");
console.log('hello', hello);

applicationElement.addEventListener("click", (event) => {
    if(event.target.id === "sentMsgBtn") {
        console.log('sent')
        applicationElement.dispatchEvent(new CustomEvent("sentMessagesClicked"));
    } else if (event.target.id === "receivedMsgBtn") {
        console.log('received')
        applicationElement.dispatchEvent(new CustomEvent("receivedMessagesClicked"));
    } else if (event.target.id === "allMsgBtn") {
        console.log("all")
        applicationElement.dispatchEvent(new CustomEvent("messageHistoryClicked"));
    }
});

export const MessagesHistory = () => {
    const users = getUsers();
    let userMessageHistory = getAllUserMessages();

    // let messagesSorted = userMessageHistory.sort((a,b) => {
    //     return parseInt(b.dateSent.split("-").join("")) - parseInt(a.dateSent.split("-").join(""));
    // });

    // let messagesSorted = userMessageHistory.sort((a,b) => {
    //     return b.dateSent - a.dateSent
    // });


                return `<div> 
                <div>
                    <button id="sentMsgBtn">Sent</button>
                    <button id="receivedMsgBtn">Received</button>
                    <button id="allMsgBtn">All</button>
                </div>
                <div id="messageHistoryDiv">
                    ${userMessageHistory.map((message) => {
                    // const foundUser = users.find(user => user.id === parseInt(message.userId));
                    return `<div class="msg_history_div">
                    <div class="msg_hx"><h4 class="msgHistory">Topic:${message.topic}</h4>
                    <p "msgHistory">Message: ${message.messageBody}</p>
                    <p "msgHistory">Sent on: ${message.dateSent}</p>
                    </div>
                </div>
            </div>`
        }).join('')}
        </div>`
};

//add sort method to sort messages by date
