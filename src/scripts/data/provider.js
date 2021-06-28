const apiURL = "http://localhost:8088"
const applicationElement = document.querySelector(".giffygram")


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
                // Store the external state in application state
                applicationState.users = usersData
            }
        );
};

export const getUsers = () => {
    return applicationState.users.map(user => ({...user}));
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

export const getLikes = () => {
    return applicationState.likes.map(like => ({...like}))
}