const apiURL = "http://localhost:8088"
const applicationElement = document.querySelector(".giffygram")


const applicationState = {
    users: [],
    posts: [],
    likes: [],
    messages: [],
    pendingMessages: [], //unread messages in messages array
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

export const fetchLikes = () => {
    return fetch(`${apiURL}/likes`)
        .then(response => response.json())
        .then(
            (likesData) => {
                applicationState.likes = likesData
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

export const fetchPendingMessages = () => {
    return fetch(`${apiURL}/pendingMessages`)
    .then(response => response.json())
    .then(
        (pendingMessagesData) => {
            applicationState.pendingMessages = pendingMessagesData
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

export const getLikes = () => {
    return applicationState.likes.map(like => ({...like}))
};

export const getMessages = () => {
    return applicationState.messages.map(message => ({...message}))
};

//Returns the filtered and unread/pending messages of the specific user:
export const getUserPendingMessages = () => {
    const userId = parseInt(localStorage.getItem("gg_user"));
    return applicationState.pendingMessages.filter(pendingMessage => {
        if (userId === pendingMessage.userId) {
            return pendingMessage;
        }
    });
};

export const getUserMessagesHistory = () => {
    const userId = parseInt(localStorage.getItem("gg_user"));
    return applicationState.messages.filter(messageHistory => {
        if (userId === messageHistory.userId) {
            return messageHistory;
        }
    });
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

    return fetch(`${apiURL}/likes`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        })
};

export const sendMessage = (messageContent) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageContent)
    }

    return fetch(`${apiURL}/messages`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            alert("Your Message Has Been Sent! :D");
            applicationElement.dispatchEvent(new CustomEvent("stateChanged"))
        })
};

export const savePendingMessage = (messageContent) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(messageContent)
    }

    return fetch(`${apiURL}/pendingMessages`, fetchOptions)
        .then(response => response.json());
};

export const deletePendingMessage = (messageId) => {
    const fetchOptions = {
        method: "DELETE"
    }
    return fetch(`${apiURL}/pendingMessages/${messageId}`, fetchOptions)
    .then(response => response.json());
}
