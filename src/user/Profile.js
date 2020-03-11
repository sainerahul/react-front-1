import React, { Component } from 'react'
import { isAuthenticated } from '../auth/index'
import { Redirect, Link } from 'react-router-dom'
import DefaultDp from '../images/avatar.jpg'
import DeleteUser from './DeleteUser'
import { read } from './apiUser'
import FollowProfileButton from './FollowProfileButton'
import ProfileTabs from './ProfileTabs'
import {listByUser} from '../post/apiPost'
class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {following:[], followers:[]},
            redirectToSignin: false,
            following: false,
            error:"",
            posts:[]
        }
    }
    checkFollow = user =>{
        const jwt = isAuthenticated()
        const match = user.followers.find(follower=>{
            // one id has many other followers or vise-versa
            return follower._id === jwt.user._id
        })
        return match
    }
    clickFollowButton = callApi =>{
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        callApi(userId,token,this.state.user._id)
        .then(data=>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({user:data,following:!this.state.following})
            }
        })

    }
    init = userId => {
        const token = isAuthenticated().token
        read(userId, token)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                    this.setState({ redirectToSignin: true })
                    
                }
                else {
                    let following = this.checkFollow(data)
                    this.setState({ user: data,following })
                    this.loadPosts(data._id)
                }
            })
    }
    loadPosts=(userId)=>{
        const token = isAuthenticated().token;
        listByUser(userId,token)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }
            else{
                this.setState({posts:data})
            }
        })
    }

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId)

    }
    componentWillReceiveProps(props) {
        const userId = props.match.params.userId;
        this.init(userId)

    }


    render() {
        const { redirectToSignin, user,posts } = this.state
        if (redirectToSignin) return <Redirect to="/signin" />
        const photoUrl = user._id? `http://localhost:8081/user/photo/${user._id}?${new Date().getTime()}`: DefaultDp
        return (
            <div className="container">
                 <h2 className="mt-5 mb-5">Profile&nbsp;<i class="fa fa-user " aria-hidden="true"></i></h2>
                <div className="row">
                    <div className="col-md-3">
                       
                        {/* <img className="card-img-top" src={DefaultDp} alt={user.name}
                            style={{ width: '100%', height: '15vw', objectFit: 'cover' }} /> */}
                             <img  style={{height:"200px", width:"200px" ,borderRadius:"50%", border:"1px solid grey"}} className="img-thumbnail" src={photoUrl} onError={i=>{i.target.src = `${DefaultDp}`}} alt={user.name}/>
                             {/* <img className="img-thumbnail" 
                            style={{ width: '100%', height: '15vw', objectFit: 'cover' }} src={photoUrl} alt={user.name}/> */}

                    </div>
                    <div className="col-md-6" >
                        <div className="lead mt-2">
                            <p>Hello {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>{`Joined: ${new Date(user.created).toDateString()}`}</p>
                        </div>
                        {isAuthenticated().user && isAuthenticated().user._id == user._id ? (
                            <div className="d-inline-block" >
                                <Link className="btn btn-raised btn-secondary mr-4" to={`/user/edit/${user._id}`}>Edit<i class="fa fa-pencil-square-o ml-2" aria-hidden="true"></i></Link>
                                <DeleteUser userId={user._id}/>
                            </div>
                        ):(<FollowProfileButton following={this.state.following}
                            onButtonClick={this.clickFollowButton}

                        />)}
                        
                    </div>

                </div>
                <div className="row" >
                    <div className="col md-12 mt-3 mb-3" ><p className="lead" ><i>Bio.</i>    {user.about}</p></div>
                </div>
                <hr/>
                        <ProfileTabs followers={user.followers} following={user.following} posts={posts}/>
            </div>
        )
    }
}

export default Profile
