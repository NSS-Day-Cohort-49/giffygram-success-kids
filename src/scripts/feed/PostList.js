import { getPosts } from "../data/provider.js"



export const Posts = () => {
    const posts = getPosts();
    console.log(posts)

    let postHTML = `${posts.map(post => {
        return `<section>
            <h1 class="post_title">${post.title}</h1>
            <img class="post_img" src="${post.url}"/>
            <section class="post_description">${post.description}</section>
            <button class="post_favorite" id="favorite--${post.id}"><img src="https://img.icons8.com/material-outlined/24/000000/christmas-star.png"/></button>
            <button class="post_remove" id="remove--${post.id}"><img src="https://img.icons8.com/dusk/24/000000/trash.png"/></button>
        </section>`
    }).join("")}`

    // let postHTML = `${posts.map(post => {
    //     return `<li>
    //     <input type="hidden" value="${post.id}" name="post"> ${post.title} <img src="${post.url}"/> ${post.description}
    //     </li>`}).join("")
    // }`

    return postHTML;
};
