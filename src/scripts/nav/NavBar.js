import { getUserPendingMessages } from "../data/provider.js";

const applicationElement = document.querySelector(".giffygram");

//click event listener that dispatches new custom events for elements in the navbar when triggered which is listened and rendered in
//Giffygram module:

applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "directMessageIcon") {
        applicationElement.dispatchEvent(new CustomEvent("messageFormStateChanged"));
    } else if (clickEvent.target.id === "messageCounter") {
        applicationElement.dispatchEvent(new CustomEvent("counterButtonClicked"));
    } else if (clickEvent.target.id === "logo") {
        applicationElement.dispatchEvent(new CustomEvent("logoClicked"));
    } else if (clickEvent.target.id === "msg_history") {
        applicationElement.dispatchEvent(new CustomEvent("messageHistoryClicked"));
    } else if (clickEvent.target.id === "logout") {
        localStorage.removeItem("gg_user");
        document.querySelector(".giffygram");
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    }
});

// function that counts/stores the pending messages that are unread in DM; using forEach method instead of map method since it's not needed to 
//return anything from the user pending messages array after it loops:

let countUserPendingMessages = () => {
    let i = 0;
    getUserPendingMessages().forEach(() => {
        i++
    });
    return i;
};


export const NavBar = () => {
    return `
        <nav class="navigation">
            <div class="navigation__item navigation__icon">
                <img class="img_logo" id="logo" src="./images/giffygramLogo.PNG" alt="Giffygram Logo" />
            </div>
            <div class="imgGif">
                <img class="img_gif" id="logo" src="./images/gifjif.gif" alt="giffy" />
            </div>
            <div class="navigation__item navigation__message">
                <img id="directMessageIcon" src="https://img.icons8.com/dusk/48/000000/ball-point-pen.png" alt="DM" />
                <div id="messageCounter" class="notification__count">${countUserPendingMessages()}</div>
            </div>
            <div class="msgHistory">
                <button id="msg_history">Message History</button>
            </div>
            <div class="logout_button">
                <button class="navigation__logout" id="logout">Logout</button>
            </div>
        </nav>
    `
};