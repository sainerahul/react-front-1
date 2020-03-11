import React from 'react'
import Post from '../post/Post'
const Home = () => {
    return (
       <div> <div className="jumbotron">
            <h1>Commento&nbsp;<i class="fa fa-commenting-o" aria-hidden="true"></i></h1>
            <p className="lead" >Posting Re-Defined</p>
            
        </div>
        <div className="container" >
            <Post/>
        </div>
        </div>
    )
}

export default Home 
