import { newPost, getUsers } from "../data/provider.js"

const applicationElement = document.querySelector(".giffygram")

applicationElement.addEventListener("click", clickEvent => {
    clickEvent.preventDefault();
    if (clickEvent.target.id === "newPost__submit") {
        const postTitle = document.querySelector("title").value
        const postURL = document.querySelector("url").value
        const postDescription = document.querySelector("description").value

        const dataToSendToAPI = {
           title: postTitle,
           url: postURL,
           description: postDescription,
           timestamp: Date.now(),
           userId: parseInt(localStorage.getItem("gg_user"))
        }

        newPost(dataToSendToAPI)
    }
})

export const PostEntry = () => {
    let html = `
    <div class="newPost">
    <div>
        <input value=""
               name="title"
               class="newPost__input"
               type="text"
               placeholder="Gif title" />
    </div>
    <div>
            <input value=""
                   name="url"
                   class="newPost__input"
                   type="text"
                   placeholder="URL of gif" />
        </div>
        
        <textarea name="description"
            class="newPost__input"
            placeholder="Add a caption?"></textarea>

        <button id="newPost__submit">Save</button>
        <button id="newPost__cancel">Cancel</button>
    </div>
    `
    return html
}