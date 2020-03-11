import React, { Component } from 'react'
import { list } from "./apiPost"
import {Link} from 'react-router-dom'
import DefaultPost from '../images/noimage.png'
import LoaderSpinner from '../images/LoaderSpinner'
class Post extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                this.setState({ posts: data })
                console.log(this.state)
            }
        })
    }
    renderPost = (posts) => {
       return (
        <div className="row">{posts.map((post, i) =>  {
            const posterId = post.postedBy ? `/user/${post.postedBy._id}`:''
            const posterName = post.postedBy ? post.postedBy.name : "Unknown"

            return(
                <div className="card col-md-12"  key={i}>
            {/* <img className="card-img-top" src={DefaultDp} alt={user.name} 
            style={{width:'100%', height:'15vw', objectFit:'cover'}}/> */}
            {/* <img style={{height:"200px", width:"auto", borderRadius:"50%", border:"1px solid grey"}} className="img-thumbnail" src={`http://localhost:8081/user/photo/${user._id}`} onError={i=>{i.target.src = `${DefaultDp}`}} alt={user.name}/> */}
            <div className="card-body" >
                <img src={`http://localhost:8081/post/photo/${post._id}`} alt={post.title} onError={i=>i.target.src=`${DefaultPost}`} className="img-thumbnail mb-3" style={{height: '200', width: '100'}}/>
              <div className="card-title lead">{post.title}</div>
              <p className="card-text">{post.body.substring(0,20)}</p>
              <br/>
              <p className="font-lead mark">
                  Posted by {" "}
                  <Link to={`${posterId}`}>{posterName}</Link> {" "}
                  on {new Date(post.created).toDateString() }
              </p>
              <Link to={`/post/${post._id}`} className="btn btn-raised btn-sm btn-info">View<i class="fa fa-eye ml-2" aria-hidden="true"></i></Link>
            </div>
          </div> 
            )
            })}
            </div>
       )
    }
    render() {
        const { posts } = this.state;
        
        return (
            <div classNameName="container">
                <h2 className="mt-5 mb-5">Recent Feed</h2>
                {this.renderPost(posts)}
            </div>
        )
    }
}

export default Post


