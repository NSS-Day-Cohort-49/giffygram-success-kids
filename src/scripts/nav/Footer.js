import { getUsers, getPosts } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("change", changevent => {
    if (changevent.target.id === "postsbyuser_posts") {
        applicationElement.dispatchEvent(new CustomEvent("footerUsersClickStateChanged",{detail:{userId: changevent.target.value}}));
    } else if (changevent.target.id === "postsbydate_posts") {
        applicationElement.dispatchEvent(new CustomEvent("footerStateChanged",{detail:{postId: changevent.target.value}}));
    }
});

applicationElement.addEventListener("click", (event) => {
    if (event.target.id === "showFavoritesToggle") {
        applicationElement.dispatchEvent(new CustomEvent("showOnlyFavorites"));
    }
})

export const Footer = () => {
    const posts = getPosts()
    const users = getUsers()

return`
  <div class= "footer">
    <div>
        <label class="postsbydate_label" for="postsbydate_posts"> Post since </label>
  
        <select id="postsbydate_posts" class="selectUser" name="postsbydate_posts">
            <option value="">Choose a Year...</option>
            ${posts.map(post => {
                return `<option class="post" value="${post.year}">${post.year}</option>`}).join("")
            }
        </select>
    </div>

    <div>
        <label class="postsbyuser_label" for="postsbyuser_posts">Post by User </label>

        <select id="postsbyuser_posts" class="selectUser" name="postsbyuser_posts">
            <option value="">Choose a User...</option>
            ${users.map(user => {
                return `<option class="user" value="${user.id}">${user.name}</option>`}).join("")
            }
        </select>
    </div>

    
    <div> 
    Show Favorites Only
    <input id="showFavoritesToggle" class="showOnlyFavorites_input" type="checkbox" />
            </div>
  </div>
`
};