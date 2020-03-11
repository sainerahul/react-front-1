import React, { Component } from 'react'
import { create } from './apiPost'
import { Redirect } from 'react-router-dom'
import { isAuthenticated } from '../auth/index'
import DefaultDp from '../images/avatar.jpg'
import LoaderSpinner from '../images/LoaderSpinner'
class NewPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            body: '',
            photo: '',
            error: '',
            user: {},
            fileSize: 0,
            loading: false,
            redirectToProfile: false
        }
    }

    componentDidMount() {
        this.postData = new FormData()
        this.setState({ user: isAuthenticated().user })
    }
    isValid = () => {
        const { fileSize, title, body } = this.state
        if (fileSize > 100000) {
            this.setState({ error: 'File size should be less than 100 kb', loading: false })
            return false
        }
        if (title.length == 0 || body.length == 0) {
            this.setState({ error: 'All fields are required', loading: false })
            return false
        }

        return true

    }
    handleChange = (name) => event => {
        this.setState({ error: "" })
        const value = name === 'photo' ? event.target.files[0] : event.target.value

        const fileSize = name === 'photo' ? event.target.files[0].size : 0;

        this.postData.set(name, value)
        this.setState({ [name]: value, fileSize })
    }
    handleSubmit = event => {
        event.preventDefault()

        if (this.isValid()) {
            this.setState({ loading: true })

            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            console.log("postData=", this.postData)
            create(userId, token, this.postData)
                .then(data => {
                    if (data.error) this.setState({ error: data.error });
                    else {
                        this.setState({ loading: false, title: '', body: '', photo: '', redirectToProfile: true });
                        console.log("new post", data)
                    }
                })
        }
    }
    render() {
        const { title, body, photo, user, error, loading, redirectToProfile } = this.state
        if (redirectToProfile) {
            return <Redirect to={`/user/${user._id}`} />
        }
        // const photoUrl = id? `http://localhost:8081/user/photo/${id}?${new Date().getTime()}`: DefaultDp
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Create New Post</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                {
                    loading ? (<div className=" text-center">
                        <LoaderSpinner />
                    </div>) : <div>
                            {/* <img style={{height:"200px", width:"auto"}} className="img-thumbnail" src={photoUrl} onError={i=>{i.target.src = `${DefaultDp}`}} alt={name}/> */}
                            <form>
                                <div className="form-group">
                                    <label className="text-muted">Photo</label>
                                    <input type="file" className="form-control" accept="image/*" onChange={this.handleChange("photo")} />
                                </div>
                                <div className="form-group">
                                    <label className=" text-muted">Title</label>
                                    <input type="text" className="form-control" value={title} onChange={this.handleChange("title")} />
                                </div>
                                <div className="form-group">
                                    <label className="text-muted">Body</label>
                                    <textarea onChange={this.handleChange("body")} type="text" className="form-control" value={body} />
                                </div>
                                {/* <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input type="password" className="form-control" value={password} onChange={this.handleChange("password")} />
                    </div> */}
                                <button className="btn btn-raised btn-info" onClick={this.handleSubmit}>Post</button>
                            </form>
                        </div>}

            </div>
        )
    }
}

export default NewPost
