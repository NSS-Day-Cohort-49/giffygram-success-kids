// const apiURL = "http://localhost:8088"
const applicationElement = document.querySelector(".giffygram")
const apiURL = "http://localhost:8088"

const applicationState = {
    users: [],
    posts: [],
    likes: [],
    messages: [],
    currentUser: {},
    feed: {
        chosenUser: null,
        displayFavorites: false,
        displayMessages: false
    }
}

export const fetchUsers = () => {
    return fetch(`${apiURL}/users`)
        .then(response => response.json())
        .then(
            (usersData) => {
                applicationState.users = usersData
            }
        );
};

export const fetchPosts = () => {
    return fetch(`${apiURL}/posts`)
        .then(response => response.json())
        .then(
            (postsData) => {
                applicationState.posts = postsData
            }
        );
};

export const getUsers = () => {
    return applicationState.users.map(user => ({...user}));
};

export const getPosts = () => {
    return applicationState.posts.map(post => ({...post}));
};