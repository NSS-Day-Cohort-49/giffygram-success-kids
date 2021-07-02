export const PostEdit = (userEditRequest) => {
    let html = `
    <div class="newPost">
    <h3>Post a Gif?</h3>
    <div>
        <input value="${userEditRequest.title}"
               name="postTitle"
               class="newPost__input"
               type="text"
               placeholder="Gif title" />
    </div>
    <div>
            <input value="${userEditRequest.url}"
                   name="postURL"
                   class="newPost__input"
                   type="text"
                   placeholder="URL of gif" />
        </div>
        
        <textarea name="postDescription"
            class="newPost__desc"
            placeholder="Add a caption?">${userEditRequest.description}</textarea>

        <button id="updatePost--${userEditRequest.id}">Update</button>
        <button id="newPost__cancel">Cancel</button>
    </div>
    `
    return html
}