import { Posts } from "./feed/PostList.js";
import { NavBar } from "./nav/NavBar.js";
import { MessageForm } from "./message/MessageForm.js";
import { DirectMessage } from "./friends/DirectMessage.js";
import { deletePendingMessage, getUserPendingMessages } from "./data/provider.js";
import { renderApp } from "./main.js";

//Sets initial state for messageForm and directMessage as false:
let navState = {
    messageFormPage: false,
    directMessagePage: false
};

//Custom event listeners coming from Navbar and MessageForm modules being dispatched/broadcasted as a change in state which changes navState and
//does conditional rendering:

const applicationElement = document.querySelector(".giffygram");
applicationElement.addEventListener("messageFormStateChanged", (customEvent) => {
    navState.messageFormPage = !navState.messageFormPage;
    navState.directMessagePage = false;
    if (navState.messageFormPage) {
        applicationElement.innerHTML = `
        <div class="nav_div">${NavBar()}</div>
        <div >${MessageForm()}</div>`
    } else {
        applicationElement.innerHTML = GiffyGram();
    }
});

applicationElement.addEventListener("counterButtonClicked", (customEvent) => {
    navState.directMessagePage = true;
    if (navState.directMessagePage) {
        applicationElement.innerHTML = `
        <div class="nav_div">${NavBar()}</div>
        <div >${DirectMessage()}</div>`
    } else {
        applicationElement.innerHTML = GiffyGram();
    }
});

applicationElement.addEventListener("logoClicked", (customEvent) => {
    if (navState.directMessagePage) {
        getUserPendingMessages().forEach((pendingMessage) => {
            deletePendingMessage(pendingMessage.id);
        });
        navState.directMessagePage = false;
        navState.messageFormPage = false;
        applicationElement.innerHTML = GiffyGram();
        renderApp();
    } else {
        navState.directMessagePage = false;
        navState.messageFormPage = false;
        applicationElement.innerHTML = GiffyGram();
    }
});


export const GiffyGram = () => {
        return `
        <div class="nav_div">${NavBar()}</div>            
        <section class="posts">
            <h2>Posts</h2>
            ${Posts()}
        </section>
        `
};



