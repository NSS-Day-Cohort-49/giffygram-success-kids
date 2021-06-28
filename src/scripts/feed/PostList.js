import { getPosts } from "../data/provider.js"

// export const Posts = () => {
//     const posts = getPosts()

//     let html = `
//         <ul>
//             ${
//                 posts.map(
//                       (post) => `<li>
//                         <input type="hidden" value="${post.id}" name="post"> ${post.title} ${post.url} ${post.desciption}
//                       </li>`).join("")
//             }
//         </ul>
//     `

//     return html
// }

export const Posts = () => {
    const posts = getPosts();
    console.log(posts)
    let postHTML = `${posts.map(post => {
        return `<li>
        <input type="hidden" value="${post.id}" name="post"> ${post.title} <img src="${post.url}"/> ${post.desciption}
        </li>`}).join("")
    }`

    return postHTML;
}
