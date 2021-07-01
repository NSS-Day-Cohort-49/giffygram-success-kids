import { GiffyGram } from "./GiffyGram.js"
import { LoginForm } from "./auth/Login.js"
import { fetchUsers, fetchPosts } from "./data/provider.js"
import { PostEntry } from "./feed/PostEntry.js"
import { GiffyGram } from "./GiffyGram.js";
import { LoginForm } from "./auth/Login.js";
import { fetchUsers, fetchPosts, fetchMessages, fetchPendingMessages, fetchFavorites } from "./data/provider.js";
const applicationElement = document.querySelector(".giffygram");

export const renderApp = () => {
    const user = parseInt(localStorage.getItem("gg_user"))

    fetchUsers()
        .then(fetchPosts)
        .then(fetchPosts)
        .then(fetchMessages)
        .then(fetchFavorites)
        .then(fetchPendingMessages)
        .then(() => {
            if (user) {
                applicationElement.innerHTML = GiffyGram()
            } else {
                applicationElement.innerHTML = LoginForm()
            }
        })
    }
    
    // fetchPosts()
    //     .then()
    //     .then(() => {
    //         if (userId) {
    //             applicationElement.innerHTML = PostEntry()
    //         } else {
    //             applicationElement.innerHTML = LoginForm()
    //         }
        // })
        });
};

renderApp();

applicationElement.addEventListener("stateChanged", (customEvent) => {
    renderApp();
});
});