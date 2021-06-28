import { Posts } from "./feed/PostList.js"

export const GiffyGram = () => {

    // Show main main UI
    return `<h1>Giffygram</h1>
    
    <section class="posts">
        <h2>Posts</h2>
        ${Posts()}
    </section>
    `
}
