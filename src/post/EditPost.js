import React, { Component } from 'react'
import {singlePost,update} from './apiPost'
import {isAuthenticated} from '../auth'
import {Redirect}from 'react-router-dom'
import LoaderSpinner from '../images/LoaderSpinner'
import {Link} from 'react-router-dom'

class EditPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            title: '',
            body: '',
            redirectToProfile:false,
            error:'',
            fileSize: 0,
            loading: false,
        }
    }
    init = postId => {
        singlePost(postId)
            .then(data => {
                if (data.error) {
                    // console.log(data.error) 
                    this.setState({ redirectToProfile: true })
                }
                else {
                    // console.log(data.name)
                    this.setState({
                        id: data._id,
                        title:data.title, 
                        body:data.body,
                        error:''
                    })
                    console.log('initial values',this.state)
                }
            })
    }

    componentDidMount() {
        this.postData = new FormData()
        const postId = this.props.match.params.postId;
        this.init(postId)

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
            console.log('this.state',this.state)
            const postId = this.state.id;
            console.log('postId is::::::',postId)
            const token = isAuthenticated().token;
            console.log("postData=", this.postData)
            update(postId, token, this.postData)
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
        const {title, body,error,redirectToProfile,photo,loading} = this.state
        
        if(redirectToProfile){
            return <Redirect to={`/`}/>
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">{title}</h2>
                {
                    loading ? (<div className=" text-center">
                        <LoaderSpinner />
                    </div>) :
                <form>
                <div className="form-group">
                        <label className="text-muted">Post picture</label>
                        <input type="file" className="form-control" accept="image/*"  onChange={this.handleChange("photo")} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Title</label>
                        <input type="text" className="form-control" value={title} onChange={this.handleChange("title")} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Body</label>
                        <textarea onChange={this.handleChange("body")} type="text" className="form-control" value={body}/>
                    </div>
                    {/* <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input type="password" className="form-control" value={password} onChange={this.handleChange("password")} />
                    </div> */}
                    <button className="btn btn-raised btn-info" onClick={this.handleSubmit}>Update</button>
                    <Link className="btn btn-raised btn-info ml-4" to={`/post/${this.state.id}`} >back<i class="fa fa-chevron-left ml-2" aria-hidden="true"></i></Link>
                </form>}
                
            </div>
        )
    }
}

export default EditPost
