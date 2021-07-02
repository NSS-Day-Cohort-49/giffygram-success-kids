import { getPosts, deletePost, favoritePost, getUsers, getUserFavorites, deleteFavorite } from "../data/provider.js"
// import { Profile } from "./Profile.js";

export const Posts = () => {
    const posts = getPosts();
    const users = getUsers();

    // initial count value of i for the favorites array is zero;
    let i = 0;

    // matching id of post to userFavorite postId
    let postHTML = `${posts.map(post => {

        let foundUserFavorite = getUserFavorites().filter((userFavorite) => {
            if (post.id === userFavorite.postId) {
                return userFavorite;
            }
        });

        let favoriteIcon;

        // if the found user favorites array is empty and clicked, then render the patrick star favorite icon
        if (typeof foundUserFavorite[i] !== 'undefined') {
            if (foundUserFavorite[i].postId === post.id) {
                favoriteIcon = `<img class="post_favorite" src="https://img.icons8.com/cute-clipart/64/000000/patrick-star.png" id="favorite--${post.id}" />`
            }
        // if the array is not empty when clicked, then render the blank star icon
        } else {
            favoriteIcon = `<img class="post_favorite" src="https://img.icons8.com/material-outlined/48/000000/christmas-star.png" id="favorite--${post.id}" />`
        };

        const foundUser = users.find(user => user.id === parseInt(post.userId));
        return `<section class="postlist">
            <h1 class="post_title">${post.title}</h1>
            <img class="post_img" src="${post.url}"/>
            <section class="post_description">${post.description}</section>
            <option id="chosenUserPost" class="post_user" value="${foundUser.id}">Posted by: ${foundUser.name} on ${post.dateSent}</option>
            <div class="post_buttons">
            ${favoriteIcon}
            <img class="post_remove" src="https://img.icons8.com/dusk/48/000000/trash.png" id="remove--${post.id}" />
            </div>
        </section>`
    }).join("")}`

    i++
    return postHTML;
};

{/* <option id="chosenUserPost" class="post_user" value="${foundUser.id}"></option><div>Posted by: <div class="postUser">${foundUser.name}</div> on ${post.dateSent}</div> */}
{/* <button class="post_favorite" id="favorite--${post.id}">Favorite</button> */}
{/* <button class="post_remove" id="remove--${post.id}">Delete</button> */}

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", click => {
    if (click.target.id.startsWith("remove--")) {
        const [,postId] = click.target.id.split("--")
        deletePost(parseInt(postId))
    }
});

applicationElement.addEventListener("click", (event) => {
    if(event.target.id === "chosenUserPost") {
        applicationElement.dispatchEvent(new CustomEvent("footerUsersClickStateChanged", {detail:{userId: event.target.value}}))
    }
});

// event listener that posts to favorites array in db when blank star button clicked if array is empty and re-renders; else deletes the id of
//favorited post from db if array is not empty: 
applicationElement.addEventListener("click", click => {
    if (click.target.id.startsWith("favorite--")) {
        let [,postId] = click.target.id.split("--")
        postId = parseInt(postId);
        const dataToSendToAPI = {
            userId: parseInt(localStorage.getItem("gg_user")),
            postId: parseInt(postId)
        }
        let favoriteFound = getUserFavorites().find((userFavorite) => {
            if (postId === userFavorite.postId) {
                return userFavorite
            }
        });
        if (typeof favoriteFound === 'undefined') {
            favoritePost(dataToSendToAPI)
        } else {
            deleteFavorite(favoriteFound.id);
        }
    }
});

// edit button
// applicationElement.addEventListener("click", clickEvent => {
//     if (clickEvent.target.id.startsWith("updatePost")) {
//         const [,postId] = clickEvent.target.id.split("--")[1];
//         const postTitle = document.querySelector("input[name='postTitle']").value
//         const postURL = document.querySelector("input[name='postURL']").value
//         const postDescription = document.querySelector("textarea[name='postDescription']").value

//         const dataToSendToAPI = {
//            title: postTitle,
//            url: postURL,
//            description: postDescription,
//            timestamp: Date.now(),
//            userId: parseInt(localStorage.getItem("gg_user")),
//            id: parseInt(postId)
//         }

        // put something here

       // editPost(dataToSendToAPI)
        // .then(response => {
            // put something here
        // })

//     }
// })