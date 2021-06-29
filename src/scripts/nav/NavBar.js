const applicationElement = document.querySelector(".giffygram");


applicationElement.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "logout") {
        localStorage.removeItem("gg_user");
        document.querySelector(".giffygram");
        applicationElement.dispatchEvent(new CustomEvent("stateChanged"));
    };
});

export const NavBar = () => {
    return `
        <nav class="navigation">
            <div class="navigation__item navigation__icon">
                <img class="img_logo" id="logo" src="./images/giffygramLogo.PNG" alt="Giffygram Logo" />
            </div>
            <div>
                <img class="img_gif" id="logo" src="./images/gifjif.gif" alt="giffy" />
            </div>
            <div class="navigation__item navigation__message">
                <img id="directMessageIcon" src="https://img.icons8.com/dusk/48/000000/ball-point-pen.png" alt="DM" />
                <div class="notification__count">0</div>
            </div>
            <div class="logout_button">
                <button class="navigation__logout" id="logout">Logout</button>
            </div>
        </nav>
    `
};