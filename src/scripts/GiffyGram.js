import { Posts } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js"
import { PostEntry } from "./feed/PostEntry.js"
import { MessageForm } from "./message/MessageForm.js";
import { DirectMessage } from "./friends/DirectMessage.js";
import { deletePendingMessage, getUserPendingMessages } from "./data/provider.js";
import { renderApp } from "./main.js";
import { MessagesHistory } from "./friends/MessagesHistory.js";


//Sets initial state for messageForm and directMessage as false:
let navState = {
    messageFormPage: false,
    directMessagePage: false,
    messageHistoryPage: false
};

//Custom event listeners coming from Navbar and MessageForm modules being dispatched/broadcasted as a change in state which changes navState and
//does conditional rendering:

const applicationElement = document.querySelector(".giffygram");
applicationElement.addEventListener("messageFormStateChanged", (customEvent) => {
    console.log(navState)
    navState.messageFormPage = !navState.messageFormPage;
    if (navState.messageFormPage) {
        navState.directMessagePage = false;
        navState.messageHistoryPage = false;
        applicationElement.innerHTML = `
        <div class="nav_div">${NavBar()}</div>
        <div >${MessageForm()}</div>`
    } else {
        navState.directMessagePage = false;
        navState.messageHistoryPage = false;
        applicationElement.innerHTML = GiffyGram();
    }
});

applicationElement.addEventListener("counterButtonClicked", (customEvent) => {
    console.log(navState)
    navState.directMessagePage = true;
    if (navState.directMessagePage) {
        navState.messageHistoryPage = false;
        navState.messageFormPage = false;
        applicationElement.innerHTML = `
        <div class="nav_div">${NavBar()}</div>
        <div >${DirectMessage()}</div>`
    } else {
        navState.directMessagePage = false;
        navState.messageHistoryPage = false;
        navState.messageFormPage = false;
        applicationElement.innerHTML = GiffyGram();
    }
});

applicationElement.addEventListener("logoClicked", (customEvent) => {
    console.log(navState)
    if (navState.directMessagePage) {
        getUserPendingMessages().forEach((pendingMessage) => {
            deletePendingMessage(pendingMessage.id);
        });
        navState.directMessagePage = false;
        navState.messageFormPage = false;
        navState.messageHistoryPage = false;
        applicationElement.innerHTML = GiffyGram();
        renderApp();
    } else {
        navState.directMessagePage = false;
        navState.messageFormPage = false;
        navState.messageHistoryPage = false;
        applicationElement.innerHTML = GiffyGram();
    }
});

applicationElement.addEventListener("messageHistoryClicked", (customEvent) => {
    // navState.messageHistoryPage = !navState.messageHistoryPage;
    console.log(navState)
    navState.messageHistoryPage = true;
    if (navState.messageHistoryPage) {
        navState.directMessagePage = false;
        navState.messageFormPage = false;
        applicationElement.innerHTML = `
        <div class="nav_div">${NavBar()}</div>
        <div >${MessagesHistory()}</div>`
    } else {
        navState.directMessagePage = false;
        navState.messageFormPage = false;
        applicationElement.innerHTML = GiffyGram();
    }
});


export const GiffyGram = () => {
    // Show main main UI
    return `
    <div class="nav_div">
        ${NavBar()}
    </div>
        ${PostEntry()}
    
    <section class="posts">
        <h2>Posts</h2>
        ${Posts()}
    </section>
    `
}