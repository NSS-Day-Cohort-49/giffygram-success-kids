const apiURL = "http://localhost:8088"
const applicationElement = document.querySelector(".giffygram")


const applicationState = {
    users: [],
    posts: [],
    favorites: [],
    messages: [],
    currentUser: {},
    feed: {
        chosenUser: null,
        displayFavorites: false,
        displayMessages: false
    }
};

//GET HTTP FETCH REQUESTS:

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

export const fetchFavorites = () => {
    return fetch(`${apiURL}/favorites`)
        .then(response => response.json())
        .then(
            (likesData) => {
                applicationState.favorites = favoritesData
            }
        );
};

export const fetchMessages = () => {
    return fetch(`${apiURL}/messages`)
        .then(response => response.json())
        .then(
            (messagesData) => {
                applicationState.messages = messagesData
            }
        );
};

//Functions getting copy of properties in applicationState:

export const getUsers = () => {
    return applicationState.users.map(user => ({...user}));
};

export const getPosts = () => {
    return applicationState.posts.map(post => ({...post}));
};

export const getFavorites = () => {
    return applicationState.favorites.map(favorite => ({...favorite}))
};

export const getMessages = () => {
    return applicationState.messages.map(message => ({...message}))
};

//POST HTTP FETCH REQUESTS:

export const favoritePost = (starredData) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(starredData)
    }

    return fetch(`${apiURL}/favorite`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        })
};

export const deletePost = (id) => {

    return fetch(`${apiURL}/posts/${id}`, { method: "DELETE" })
        .then(
            () => {
                applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}