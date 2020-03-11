import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import DefaultDp from '../images/avatar.jpg'
class ProfileTabs extends Component {
    render() {
        const {following,followers,posts} = this.props
        return (
            <div className="row">
                <div className="col-md-4" >
                    <h3 className="text-info" >Followers</h3>
                    <hr/>
                    {followers.map((person, index) =>{
                        return (
                        <div key={index}>
                           
                            <div>
                                <Link to={`/user/${person._id}`} >
                                <img style={{borderRadius:"50%", border:"1px solid black"}}  className="float-left mr-2" height="30px" width="30px" src={`http://localhost:8081/user/photo/${person._id}`} onError={i=>(i.target.src=`${DefaultDp}`)}  alt={person.name} />
                                <div>
                                    <p className="lead" style={{color:"black"}}>{person.name}</p>
                                </div>
                                </Link>
                            </div>
                           
                        </div>)

                    })}
                </div>
    
                <div className="col-md-4" >
                    <h3 className="text-info" >Following</h3>
                    <hr/>
                    {following.map((person, index) =>{
                        return (
                        <div key={index}>
                            
                            <div>
                                <Link to={`/user/${person._id}`} >
                                <img style={{borderRadius:"50%", border:"1px solid black"}} className="float-left mr-2" width="30px" height="30px" src={`http://localhost:8081/user/photo/${person._id}`} onError={i=>(i.target.src=`${DefaultDp}`)}  alt={person.name} />
                                <div>
                                    <p className="lead" style={{color:"black"}}>{person.name}</p>
                                </div>
                                </Link>
                            </div>
                            
                        </div>)

                    })}
                </div>

                <div className="col-md-4" >
                    <h3 className="text-info" >My Posts</h3>
                    <hr/>
                    {posts.map((post, index) =>{
                        return (
                        <div key={index}>
                            
                            <div>
                                <Link to={`/post/${post._id}`} >
                                {/* <img style={{borderRadius:"50%", border:"1px solid black"}} className="float-left mr-2" width="30px" height="30px" src={`http://localhost:8081/user/photo/${person._id}`} onError={i=>(i.target.src=`${DefaultDp}`)}  alt={person.name} /> */}
                                <div>
                                    <p className="lead" style={{color:"black"}}>{post.title}</p>
                                </div>
                                </Link>
                            </div>
                            
                        </div>)

                    })}
                </div>

            </div>
        )
    }
}

export default ProfileTabs
