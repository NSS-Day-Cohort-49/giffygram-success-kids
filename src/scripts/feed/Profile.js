import { getUsers, getPosts } from "../data/provider.js";



export const Profile = (userProfileId) => {
    const users = getUsers();
    const posts = getPosts();

    // let messagesSorted = userMessageHistory.sort((a,b) => {
        //     return b.dateSent - a.dateSent
        // });
    let sortedPosts = posts.sort((a,b) => {
        return b.dateSent - a.dateSent
    });
    const filteredPosts =sortedPosts.filter(userPost => {
        return userPost.userId === userProfileId
    });

    let userProfileHTML = filteredPosts.map(post => { 
        const foundUser = users.find(user => user.id === parseInt(post.userId));  
        return `
               
                <div class="profile_posts user_profile profile_div">
                    <h1>${post.title}</h1>
                    <img class="post_img posted_gif post_gif" src="${post.url}" alt="Posted Gif" /> 
                    <div>${post.description}</div>
                    <div>Posted By: <div class="user_name" id="chosenUser--${post.userId}"> ${foundUser.name}</div> on ${post.dateSent}</div>
                </div>
                `
            }).join("")
    
    return userProfileHTML;
};
