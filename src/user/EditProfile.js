import React, { Component } from 'react'
import { read, update,updateUser } from './apiUser'
import { Redirect } from 'react-router-dom'
import { isAuthenticated } from '../auth/index'
import DefaultDp from '../images/avatar.jpg'
import LoaderSpinner from '../images/LoaderSpinner'
import {Link} from 'react-router-dom'
class EditProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: "",
            name: "",
            email: "",
            about:"",
            password: "",
            error:'',
            redirectToProfile: false,
            loading: false,
            fileSize:0
        }
    }
    init = userId => {
        const token = isAuthenticated().token
        read(userId, token)
            .then(data => {
                if (data.error) {
                    // console.log(data.error) 
                    this.setState({ redirectToProfile: true })
                }
                else {
                    // console.log(data.name)
                    this.setState({ id: data._id,
                         name: data.name,
                         email: data.email, 
                         error:'' ,
                         about:data.about
                        })
                }
            })
    }

    componentDidMount() {
        this.userData = new FormData()
        const userId = this.props.match.params.userId;
        this.init(userId)

    }
    isValid = () =>{
        const {name, email, password,fileSize} = this.state
        if(fileSize>100000){
            this.setState({error:'File size should be less than 100 kb',loading:false})
            return false
        }
        if(name.length==0){
            this.setState({error:'Name is required',loading:false})
            return false
        }
        // if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        //     this.setState({error:'Email is Invalid'})
        //     return false
        // }
        if(password.length>=1 && password.length<=5){
            this.setState({error:'Password must be longer than 5 characters',loading:false})
            return false
        }
        
        return true

    }
    handleChange = (name) => event => {
        this.setState({error:""})
        const value = name==='photo' ? event.target.files[0]:event.target.value
      
        const fileSize = name==='photo' ? event.target.files[0].size:0;
        
        this.userData.set(name,value)
        this.setState({ [name]: value, fileSize })
    }
    handleSubmit = event => {
        event.preventDefault()
       
        if(this.isValid()){
            this.setState({loading: true})
            const { name, email, password } = this.state
        const user = {
            name, email
        }
        
        const userId = this.props.match.params.userId;
        const token = isAuthenticated().token;
        console.log("userData",this.userData)
        update(userId, token, this.userData)
        .then(data => {
            if (data.error) this.setState({ error: data.error });
            else {
                updateUser(data,()=>{
                    this.setState({ redirectToProfile: true });
                })
                }
        })
        }
    }
    render() {
        const { id, name, email, password,error, redirectToProfile,loading,about } = this.state
        if (redirectToProfile) {
            return <Redirect to={`/user/${id}`} />
        }
        const photoUrl = id? `http://localhost:8080/user/photo/${id}?${new Date().getTime()}`: DefaultDp
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                </div>
                {loading ? (<div className=" text-center">
                <h1><LoaderSpinner/></h1>
                </div>) : <div>
                <img style={{height:"200px", width:"auto"}} className="img-thumbnail" src={photoUrl} onError={i=>{i.target.src = `${DefaultDp}`}} alt={name}/>
                <form>
                <div className="form-group">
                        <label className="text-muted">Profile picture</label>
                        <input type="file" className="form-control" accept="image/*"  onChange={this.handleChange("photo")} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input type="text" className="form-control" value={name} onChange={this.handleChange("name")} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input type="email" className="form-control" value={email} onChange={this.handleChange("email")} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">About</label>
                        <textarea onChange={this.handleChange("about")} type="text" className="form-control" value={about}/>
                    </div>
                    {/* <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input type="password" className="form-control" value={password} onChange={this.handleChange("password")} />
                    </div> */}
                    <button className="btn btn-raised btn-info" onClick={this.handleSubmit}>Update</button>
                    <Link className="btn btn-raised btn-info ml-4" to={`/user/${id}`}>Back<i class="fa fa-chevron-left ml-2" aria-hidden="true"></i></Link>
                </form>
                </div>
    }
            </div>
        )
    }
}

export default EditProfile
