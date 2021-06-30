import { getUsers, savePendingMessage, sendMessage } from "../data/provider.js";

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", event => {
    if (event.target.id === "sendButton") {
        const recipientId = document.querySelector("#msg_recipient").value
        const messageBody = document.querySelector("#message_body").value
        const topic = document.querySelector("#msg_topic_input").value
        
        const dataToSendToAPI = {
            userId: parseInt(localStorage.getItem("gg_user")),
            recipientId: parseInt(recipientId),
            topic: topic,
            messageBody: messageBody,
            dateSent: new Date().toLocaleDateString(),
        }

        savePendingMessage(dataToSendToAPI);
        sendMessage(dataToSendToAPI);
    } else if (event.target.id === "exitButton") {
        applicationElement.dispatchEvent(new CustomEvent("messageFormStateChanged"));
    } else if (event.target.id === "cancelButton") {
        applicationElement.dispatchEvent(new CustomEvent("messageFormStateChanged"));
    }
});

export const MessageForm = (state) => {
    const users = getUsers();

        return `
        <div class="message_form">
            <div>
                <button id="exitButton" class="close">&#x2718;</button>
            </div>
            <h2 class="msg_form_header">Direct Message</h2>
            <div>
                <label for="msg_topic">Topic:</label>
            </div>
            <div>
                <input id="msg_topic_input" class="msg_top_input" type="text" placeholder="Enter Topic" />
            </div>
            <div>
                <label class="msg_label" for="msg_recipient">Recipient:</label>
            </div>
            <div>
                <select id="msg_recipient" class="selectRecipient" name="msg_recipient">
                    <option value="">Choose a recipient...</option>
                    ${users.map(user => {
                        return `<option class="recipient" value="${user.id}">${user.name}</option>`}).join("")
                    }
                </select>
            </div>
            <div class="msg_content">
                <label class="label" for="messageBody">Message:</label>
                <textarea name="msgContent" id="message_body" columns="10" rows="8" placeholder="Message Content"></textarea>
            </div>
            <div>
                <button id="sendButton">Send</button>
                <button id="cancelButton">Cancel</button>
            </div>
        </div>
    `
};



