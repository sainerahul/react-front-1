import React, { Component } from 'react'
import { singlePost,remove } from './apiPost'
import DefaultPost from '../images/noimage.png'
import LoaderSpinner from '../images/LoaderSpinner'
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth'
import {Redirect} from 'react-router-dom'
import EditPost from './EditPost'
import Comment from './Comment'

class SinglePost extends Component {
    state = {
        post: '',
        redirectToHome: false,
        comments:[]
    }
    componentDidMount = () => {
        const postId = this.props.match.params.postId
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                this.setState({ post: data,
                comments:data.comments })
                console.log('this.state.comments',data)
            }
        })
    }

    updateComments = comments => {
        console.log('updateComments')
        this.setState({comments})
    }

    deletePost=()=>{
        const postId=this.props.match.params.postId;
        const token= isAuthenticated().token;

        remove(postId,token)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({redirectToHome:true})
            }
        })
    }
    renderPost =(post)=>{
        const posterId = post.postedBy ? `/user/${post.postedBy._id}`:''
        const posterName = post.postedBy ? post.postedBy.name : "Unknown"

        return (
            <div className="card col-md-12">
                <h3 className="display-2 mt-5 mb-5">{post.title}</h3>
            {/* <img className="card-img-top" src={DefaultDp} alt={user.name} 
            style={{width:'100%', height:'15vw', objectFit:'cover'}}/> */}
            {/* <img style={{height:"200px", width:"auto", borderRadius:"50%", border:"1px solid grey"}} className="img-thumbnail" src={`http://localhost:8081/user/photo/${user._id}`} onError={i=>{i.target.src = `${DefaultDp}`}} alt={user.name}/> */}
            <div className="card-body" >
                <img src={`http://localhost:8081/post/photo/${post._id}`} alt={post.title} onError={i=>i.target.src=`${DefaultPost}`} className="img-thumbnail mb-3" style={{height: 'auto', width: 'auto', objectFit:'cover'}}/>
              
              <p className="card-text">{post.body}</p>
              <br/>
              <p className="font-lead mark">
                  Posted by {" "}
                  <Link to={`${posterId}`}>{posterName}</Link> {" "}
                  on {new Date(post.created).toDateString() } {" "} edited on {new Date(post.updated).toDateString() }
              </p>
              <div className="d-inline-block" >
              <Link to={`/`} className="btn btn-raised btn-sm btn-info mr-5">back<i class="fa fa-chevron-left ml-2" aria-hidden="true"></i></Link>
              {isAuthenticated().user && isAuthenticated().user._id == post.postedBy._id && 
             <>
             <Link to={`/post/edit/${post._id}`} className="btn btn-raised btn-sm btn-secondary mr-2">Edit<i class="fa fa-pencil-square-o ml-2" aria-hidden="true"></i></Link>
              <button onClick={this.deletePost} className="btn btn-raised btn-secondary btn-sm">Delete<i class="fa fa-trash-o ml-2" aria-hidden="true"></i></button>
             </>
             } 
                
                </div>
            </div>
          </div> 
        )

    }
    render() {
        if(this.state.redirectToHome){
            return <Redirect to={`/`}/>
        }
        const {post, comments} = this.state
        return (
            <div>
                {
                !post ?
                
                (<div className="text-center">
                    <h2><LoaderSpinner/></h2>
                    
                    {/* <h1><LoaderSpinner/></h1> */}
                </div>) :<div>
                <h2 className="ml-2 mt-4">Post</h2>
                
                {this.renderPost(post)}        
                <Comment postId={post._id} comments={comments.reverse()} updateComments={this.updateComments}/>
                </div>
                
                }
                
            </div>
        )
    }
}

export default SinglePost
