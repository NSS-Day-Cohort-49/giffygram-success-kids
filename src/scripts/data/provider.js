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

//GET HTTP Fetch Requests:

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


export const fetchLikes = () => {
    return fetch(`${apiURL}/likes`)
        .then(response => response.json())
        .then(
            (likesData) => {
                // Store the external state in application state
                applicationState.likes = likesData
            }
        );
};

//POST HTTP fetch requests:

export const favoritePost = (starredData) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(starredData)
    }

    return fetch(`${apiURL}/likes`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

//Functions getting copy of each property of applicationState

export const getUsers = () => {
    return applicationState.users.map(user => ({...user}));
};

export const getPosts = () => {
    return applicationState.posts.map(post => ({...post}));
};

export const getLikes = () => {
    return applicationState.likes.map(like => ({...like}))
}
