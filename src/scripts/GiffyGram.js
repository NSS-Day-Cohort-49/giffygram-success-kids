import { Posts } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js"
import { PostEntry } from "./feed/PostEntry.js"
import { MessageForm } from "./message/MessageForm.js";
import { DirectMessage } from "./friends/DirectMessage.js";
import { deletePendingMessage, getUserPendingMessages } from "./data/provider.js";
import { renderApp } from "./main.js";
import { MessagesHistory } from "./friends/MessagesHistory.js";
import { SentMessagesPage } from "./friends/sentMessagesPage.js";
import { ReceivedMessagesPage } from "./friends/ReceivedMessagesPage.js";
import { Footer } from "./nav/Footer.js"
import { Profile } from "./feed/Profile.js"
import { Year } from "./feed/Year.js"
import { FavoritePostsPage } from "./feed/favoritePostsPage.js";



//Sets initial state for messageForm and directMessage as false:
let navState = {
    messageFormPage: false,
    directMessagePage: false,
    messageHistoryPage: false,
    sentMessagesPage: false,
    receivedMessagesPage: false
};

let footerState = {
    postsbyuser_posts: false,
    postsbydate_posts: false,
    postsByFavorites: false
};


//Custom event listeners coming from Navbar and MessageForm modules being dispatched/broadcasted as a change in state which changes navState and
//does conditional rendering:
const applicationElement = document.querySelector(".giffygram");
applicationElement.addEventListener("footerUsersClickStateChanged", (customEvent) => {
    // console.log(footerState, customEvent.detail.userId)
    footerState.postsbyuser_posts = !footerState.postsbyuser_posts;
    if (footerState.postsbyuser_posts) {
        footerState.postsByFavorites = false;
        footerState.postsbydate_posts = false;
        applicationElement.innerHTML = `
        <div class="footer_div">${Footer()}</div>
        <div class="nav_div">${NavBar()}</div>
        <div class="posts_entry">${PostEntry()}</div>
        <div class="profile_div">${Profile(parseInt(customEvent.detail.userId))}</div>`
    } else {
        applicationElement.innerHTML = GiffyGram();
    }
});

applicationElement.addEventListener("footerStateChanged", (customEvent) => {
    console.log(footerState, customEvent.detail.postId)
    footerState.postsbydate_posts = !footerState.postsbydate_posts;
    if (footerState.postsbydate_posts) {
        footerState.postsByFavorites = false;
        footerState.postsbyuser_posts = false;
        applicationElement.innerHTML = `
        <div class="footer_div">${Footer()}</div>
        <div class="nav_div">${NavBar()}</div>
        <div class="posts_entry">${PostEntry()}</div>
        <div class="profile_div">${Year(parseInt(customEvent.detail.postId))}</div>`
    } else {
        applicationElement.innerHTML = GiffyGram();
    }
});


applicationElement.addEventListener("showOnlyFavorites", (customEvent) => {
    footerState.postsByFavorites = !footerState.postsByFavorites;
    if (footerState.postsByFavorites) {
        footerState.postsbydate_posts = false;
        footerState.postsbyuser_posts = false;
        applicationElement.innerHTML = FavoritePostsPage();
    } else {
        applicationElement.innerHTML = GiffyGram();
    }
});

applicationElement.addEventListener("messageFormStateChanged", (customEvent) => {
    console.log(navState)
    navState.messageFormPage = !navState.messageFormPage;
    if (navState.messageFormPage) {
        navState.directMessagePage = false;
        navState.messageHistoryPage = false;
        applicationElement.innerHTML = `
        <div class="nav_div">${NavBar()}</div>
        <div class="msg_form_div">${MessageForm()}</div>`
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
        <div id="hello">${MessagesHistory()}</div>`
    } else {
        navState.directMessagePage = false;
        navState.messageFormPage = false;
        applicationElement.innerHTML = GiffyGram();
    }
});

applicationElement.addEventListener("sentMessagesClicked", () => {
    navState.sentMessagesPage = true;
    navState.receivedMessagesPage = false;
    if (navState.sentMessagesPage === true && navState.receivedMessagesPage === false) {
        navState.messageHistoryPage = false;
        navState.receivedMessagesPage = false;
        navState.directMessagePage = false;
        navState.messageFormPage = false;
        applicationElement.innerHTML = `
        <div class="nav_div">${NavBar()}</div>
        <div id="hello">${SentMessagesPage()}</div>`
    } else {
        navState.receivedMessagesPage = false;
        navState.sentMessagesPage = false;
        navState.directMessagePage = false;
        navState.messageFormPage = false;
        applicationElement.innerHTML = GiffyGram();
    }
});


applicationElement.addEventListener("receivedMessagesClicked", () => {
    navState.receivedMessagesPage = true;
    navState.sentMessagesPage = false;
    if (navState.receivedMessagesPage === true && navState.sentMessagesPage === false) {
        navState.messageHistoryPage = false;
        navState.sentMessagesPage = false;
        navState.directMessagePage = false;
        navState.messageFormPage = false;
        applicationElement.innerHTML = `
        <div class="nav_div">${NavBar()}</div>
        <div id="hello">${ReceivedMessagesPage()}</div>`
    } else {
        navState.receivedMessagesPage = false;
        navState.sentMessagesPage = false;
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
    <section class="posts_entry">
        ${PostEntry()}
    </section>
    <h1 class="post_header">Posts:</h1>
    <section class="posts">
        ${Posts()}
    </section>
    <div class="footer_div">
        ${Footer()}
    </div>
    
    `
};