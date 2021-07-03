import { getPosts, getUserFavorites, getUsers } from "../data/provider.js";
import { Footer } from "../nav/Footer.js";
import { NavBar } from "../nav/NavBar.js";
import { PostEntry } from "./PostEntry.js";


export const FavoritePostsPage = () => {

    const users = getUsers();
    return  `<div class="footer_div">${Footer()}</div>
    <div class="nav_div">${NavBar()}</div>
    <div class="posts_entry">${PostEntry()}</div>
    ${getUserFavorites().map((userFavoritePosts) => {
        let foundUserFavorite
        let postFound = getPosts().find((post) => {
            if(userFavoritePosts.postId === post.id) {
                return post;
            }
        });
        if (postFound.id === userFavoritePosts.postId) {
            foundUserFavorite = postFound;
        }

        console.log('post found', postFound.userId);
        

        
        const foundUser = users.find(user => user.id === postFound.userId);
        console.log('found user', foundUser);
        return `<section class="fave_list">
        <h1 class="fave_title">${foundUserFavorite.title}</h1>
        <img class="fave_img" src="${foundUserFavorite.url}"/>
        <div class="fave_div"><section class="fave_description">${foundUserFavorite.description}</section></div>
        <option id="chosenUserPost" class="fave_user" value="${foundUser.id}">Posted by: ${foundUser.name} on ${foundUserFavorite.dateSent}</option>
        <div class="fave_buttons">
        <img class="fave_favorite" src="https://img.icons8.com/cute-clipart/64/000000/patrick-star.png" id="favorite--${foundUserFavorite.id}" />
        <img class="fave_remove" src="https://img.icons8.com/dusk/48/000000/trash.png" id="remove--${foundUserFavorite.id}" />
        </div>
    </section>`

    })}
    `




};


