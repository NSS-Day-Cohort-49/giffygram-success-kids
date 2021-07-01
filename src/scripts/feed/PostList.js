import { getPosts, deletePost, favoritePost } from "../data/provider.js"

export const Posts = () => {
    const posts = getPosts();

    let postHTML = `${posts.map(post => {
        return `<section>
            <h1 class="post_title">${post.title}</h1>
            <img class="post_img" src="${post.url}"/>
            <section class="post_description">${post.description}</section>
            <div class="post_buttons">
            <img class="post_favorite" src="https://img.icons8.com/material-outlined/48/000000/christmas-star.png" id="favorite--${post.id}" />
            <img class="post_remove" src="https://img.icons8.com/dusk/48/000000/trash.png" id="remove--${post.id}" />
            </div>
        </section>`
    }).join("")}`

    return postHTML;
};

{/* <button class="post_favorite" id="favorite--${post.id}">Favorite</button> */}
{/* <button class="post_remove" id="remove--${post.id}">Delete</button> */}

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", click => {
    if (click.target.id.startsWith("remove--")) {
        const [,postId] = click.target.id.split("--")
        deletePost(parseInt(postId))
    }
});

// In original post call below: you are sending the id to the database and not the the object? thats why its breaking.
// ex: favorites: [2] ????? should be: favorites: { id:1, userId:1, postId:2 }
// applicationElement.addEventListener("click", click => {
//     if (click.target.id.startsWith("favorite--")) {
//         const [,postId] = click.target.id.split("--")
//         favoritePost(parseInt(postId))
//     }
// });

// Refactored favoritePost call below to send the object when doing post:
applicationElement.addEventListener("click", click => {
    if (click.target.id.startsWith("favorite--")) {
        const [,postId] = click.target.id.split("--")
        const dataToSendToAPI = {
            userId: parseInt(localStorage.getItem("gg_user")),
            postId: parseInt(postId)
        }
        favoritePost(dataToSendToAPI)
    }
});
