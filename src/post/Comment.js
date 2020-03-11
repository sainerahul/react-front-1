import React, { Component } from 'react'
import { comment, uncomment } from './apiPost'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import DefaultDp from '../images/avatar.jpg'
class Comment extends Component {
    state = {
        text: '',
        error: '',
    }
    handleChange = event => {
        this.setState({
            text: event.target.value,
            error: ''
        })

    }
    isValid = () => {
        console.log('called isValid')
        const { text } = this.state
        if (text.length <= 0 || text.length > 150) {
            // console.log(text.length)
            this.setState({ error: "Comment should not be empty and more than 150 characters" })
            return false;
        }
        // console.log(text,"text.length",text.length)
        return true;
    }
    addComment = e => {
        e.preventDefault()

        if (!isAuthenticated()) {
            this.setState({ error: `Please sign in to add a comment` })
            return false;
        }

        const result = this.isValid()
        console.log(result)
        if (result === true) {
            const userId = isAuthenticated().user._id
            const postId = this.props.postId
            const token = isAuthenticated().token;

            comment(userId, token, postId, { text: this.state.text })
                .then(data => {
                    if (data.error) {
                        console.log(data.error)
                    }
                    else {
                        this.setState({ text: '' })
                        // dispatch new comments to parent
                        this.props.updateComments(data.comments)
                    }

                })
        }

    }
    deleteComment=(comment)=>{
        const userId = isAuthenticated().user._id
        const postId = this.props.postId
        const token = isAuthenticated().token;

        uncomment(userId, token, postId, comment)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    // dispatch new comments to parent
                    this.props.updateComments(data.comments)
                }

            })
    }
    render() {
        const { comments } = this.props
        const { error } = this.state;
        return (
            <div>
                <h2 className="mt-5 mb-5 ml-3" >Leave a Comment</h2>
                <form onSubmit={this.addComment}>
                    <div className="form-group ml-3" >
                        <input className="form-control" placeholder="write a comment and hit enter.." type="text" onChange={this.handleChange} value={this.state.text} />
                    </div>
                </form>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}

                </div>
                {/* {JSON.stringify(comments)} */}
                {/* <hr/> */}
                <div className="col-md-5 col-md-offset-2" >
                    <h3 className="text-info" >{comments.length} Comments</h3>
                    <hr />
                    {comments.map((comment, index) => {
                        return (
                            <div key={index}>

                                <div>
                                    <Link to={`/user/${comment.postedBy._id}`} >
                                        <img style={{ borderRadius: "50%", border: "1px solid black" }} className="float-left mr-2" width="30px" height="30px" src={`http://localhost:8081/user/photo/${comment.postedBy._id}`} onError={i => (i.target.src = `${DefaultDp}`)} alt={comment.postedBy.name} />
                                    </Link>
                                    <div>
                                        <p className="lead" style={{ color: "black" }}>{comment.text}</p>
                                        <p className="font-lead mark">
                                            By {" "}
                                            <Link to={`/user/${comment.postedBy._id}`}>{comment.postedBy.name}</Link> {" "}
                                            on {new Date(comment.created).toDateString()} {" "}
                                            <span>
                                                {isAuthenticated().user && isAuthenticated().user._id == comment.postedBy._id &&(
                                                    <>
                                                     <button onClick={() =>this.deleteComment(comment)} className="btn btn-danger btn-xs float-right mr-1">Delete<i class="fa fa-trash-o ml-2" aria-hidden="true"></i></button>
                                                    </>
                                                )}
                                            </span>
                                        </p>
                                    </div>

                                </div>

                            </div>)

                    })}
                </div>
            </div>
        )
    }
}

export default Comment
