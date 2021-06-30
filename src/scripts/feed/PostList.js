import { getPosts, deletePost, favoritePost } from "../data/provider.js"

export const Posts = () => {
    const posts = getPosts();

    let postHTML = `${posts.map(post => {
        return `<section>
            <h1 class="post_title">${post.title}</h1>
            <img class="post_img" src="${post.url}"/>
            <section class="post_description">${post.description}</section>
            <div class="post_buttons">
            <button class="post_favorite" id="favorite--${post.id}">Favorite</button>
            <button class="post_remove" id="remove--${post.id}">Delete</button>
            </div>
        </section>`
    }).join("")}`

    return postHTML;
};

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", click => {
    if (click.target.id.startsWith("remove--")) {
        const [,postId] = click.target.id.split("--")
        deletePost(parseInt(postId))
    }
})

applicationElement.addEventListener("click", click => {
    if (click.target.id.startsWith("favorite--")) {
        const [,postId] = click.target.id.split("--")
        favoritePost(parseInt(postId))
    }
})