import { Posts } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js"
import { PostEntry } from "./feed/PostEntry.js"

export const GiffyGram = () => {

    // Show main main UI
    return `
    <section class="nav_div">
        ${NavBar()}
    </section>
    ${PostEntry()}
    
    <section class="posts">
        <h2>Posts</h2>
        ${Posts()}
    </section>
    `
}
