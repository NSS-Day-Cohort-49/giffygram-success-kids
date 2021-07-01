import { getUsers } from "../data/provider.js"

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "loginButton") {
        let foundUser = null
        const userState = getUsers()

        const email = document.querySelector("input[name='email']").value
        const password = document.querySelector("input[name='password']").value

        for (const user of userState) {
            if (user.email === email && user.password === password) {
                foundUser = user
            }
        }

        if (foundUser !== null) {
            localStorage.setItem("gg_user", foundUser.id)
            document.querySelector(".giffygram").dispatchEvent(new CustomEvent("stateChanged"))
        } else {
            alert("Authentication Failed, Please Enter Correct Credentials To Log In.");
        }
    }
});

export const LoginForm = () => {
    return `
    <div class="login_wrapper loginForm">
        <form action="" class="form">
            <img class="avatar" src="../images/avatar.png"/>
            <h1 class="title">Giffygram</h1>
            <div class="input_group">
                <input class="log_input" type="text" name="email" autofocus id="loginUser" required>
                <label class="log_label" for="email"><img class="icon" src="https://img.icons8.com/color/48/000000/user-male-circle--v1.png"/>Email:</label>
            </div>
            <div class="input_group">
                <input class="log_input" type="password" name="password" autofocus id="loginPassword" required>
                <label class="log_label" for="password"><img class="icon" src="https://img.icons8.com/color-glass/50/000000/lock-2.png"/>Password:</label>
            </div>
            <button id="loginButton">Login</button>
            <h2 class="slogan">The .gif that keeps on gif-ing...</h2>
        </form>
    </div>
    `
}