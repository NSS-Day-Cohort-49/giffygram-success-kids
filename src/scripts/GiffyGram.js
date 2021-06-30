import { Posts } from "./feed/PostList.js"
import { NavBar } from "./nav/NavBar.js"

export const GiffyGram = () => {

    // Show main main UI
    return `
    <section class="nav_div">
        ${NavBar()}
    </section>
   
    
    <section class="posts">
        <h2>Posts</h2>
        ${Posts()}
    </section>
    `
}
