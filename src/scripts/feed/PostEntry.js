import { newPost, getUsers } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", clickEvent => {
    clickEvent.preventDefault();
    if (clickEvent.target.id === "newPost__submit") {
        const postTitle = document.querySelector("input[name='postTitle']").value
        const postURL = document.querySelector("input[name='postURL']").value
        const postDescription = document.querySelector("textarea[name='postDescription']").value

        const dataToSendToAPI = {
           title: postTitle,
           url: postURL,
           description: postDescription,
           dateSent: new Date().toLocaleDateString(),
           year: new Date().getFullYear(),
           userId: parseInt(localStorage.getItem("gg_user"))
        }

        newPost(dataToSendToAPI)
    }
})

applicationElement.addEventListener("click", clickEvent => {
    clickEvent.preventDefault();
    if (clickEvent.target.id === "newPost__cancel") {
        applicationElement.dispatchEvent(new CustomEvent ("stateChanged"))
    }
})

export const PostEntry = () => {
    let html = `
    <div class="newPost">
    <h3>Post a Gif?</h3>
    <div>
        <input value=""
               name="postTitle"
               class="newPost__input"
               type="text"
               placeholder="Gif title" />
    </div>
    <div>
            <input value=""
                   name="postURL"
                   class="newPost__input"
                   type="text"
                   placeholder="URL of gif" />
        </div>
        
        <textarea name="postDescription"
            class="newPost__input"
            placeholder="Add a caption?"></textarea>

        <button id="newPost__submit">Save</button>
        <button id="newPost__cancel">Cancel</button>
    </div>
    `
    return html
}