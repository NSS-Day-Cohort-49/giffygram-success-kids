import { getUsers, getPosts } from "../data/provider.js";



export const Year = (userYear) => {
    const users = getUsers();
    const posts = getPosts();

    // let messagesSorted = userMessageHistory.sort((a,b) => {
        //     return b.dateSent - a.dateSent
        // });
    let sortedPosts = posts.sort((a,b) => {
        return b.dateSent - a.dateSent
    });
    const filteredPosts =sortedPosts.filter(userPost => {
        return userPost.year === userYear
    });

    let userProfileHTML = filteredPosts.map(post => {  
        return `
               
                <div class="profile_posts">
                    <h1>${post.title}</h1>
                    <img class="post_img" src="${post.url}" alt="Posted Gif" /> 
                    <div>${post.description}</div>
                    <div>Posted By: <div class="user_name" id="chosenUser--${post.year}"> ${post.year}</div> on ${post.dateSent}</div>
                </div>
                `
            }).join("")
    
    return userProfileHTML;
};