import { getUsers, savePendingMessage, sendMessage } from "../data/provider.js";

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", event => {
    if (event.target.id === "sendButton") {
        const recipientId = document.querySelector("#msg_recipient").value
        const messageBody = document.querySelector("#message_body").value
        const topic = document.querySelector("#msg_topic_input").value
        
        const dataToSendToAPI = {
            userId: parseInt(localStorage.getItem("gg_user")), //need to display name of sender/user
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
            <div class="header_div">
                <h2 class="msg_form_header">Direct Message</h2>
                <button id="exitButton" class="close">&#x2718;</button>
            </div>
            
            <div class="topic_div">
                <div>
                    <label class="msg_label" for="msg_topic">Topic:</label>
                </div>
                <div>
                    <input id="msg_topic_input" class="msg_top_input" type="text" placeholder="Enter Topic" />
                </div>
            </div>
            <div class="recipient_div">
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
            </div>
            <div class="msg_content">
                <label class="msg_label contentLabel" for="messageBody">Message:</label>
                <textarea name="msgContent" class= "textarea_message" id="message_body" columns="30" rows="8" placeholder="Message Content"></textarea>
            </div>
            <div class="msgForm_button">
                <button id="sendButton">Send</button>
                <button id="cancelButton">Cancel</button>
            </div>
        </div>
    `
};



