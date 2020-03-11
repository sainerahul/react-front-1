import React, { Component } from 'react'
import { findPeople, follow } from "./apiUser"
import {Link} from 'react-router-dom'
import DefaultDp from '../images/avatar.jpg'
import {isAuthenticated} from '../auth/index'
import LoaderSpinner from '../images/LoaderSpinner'
class FindPeople extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            error:'',
            open:false,
            followMessage:'',
            loading:true
        }
    }
    componentDidMount() {
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        findPeople(userId,token).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                this.setState({ users: data,loading:false })
                console.log(this.state)
            }
        })
    }
    clickFollow=(user,i) => {
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        follow(userId,token,user._id)
        .then(data=>{
            if(data.error){
                this.setState({error:data.error})
            }
            else{
                let toFollow = this.state.users
                toFollow.splice(i,1)
                this.setState({users:toFollow,open:true,followMessage:`Following ${user.name}`})
                console.log('open=',this.state.open)
            }
        })

    }
    renderUsers = (users) => {

       return <div className="row">{users.map((user, i) => (  (
        
        <div className="card col-md-2 m-1"  key={i}>
             <div className="text-center">
        <img style={{height:"200px", width:"200px", borderRadius:"50%", border:"1px solid grey"}} className="img-thumbnail mt-2" src={`http://localhost:8081/user/photo/${user._id}`} onError={i=>{i.target.src = `${DefaultDp}`}} alt={user.name}/>
        <div className="card-body">
          <div className="card-title lead">{user.name}</div>
          <p className="card-text">{user.email}</p>
        
          <div className="text-center" >
          <Link to={`/user/${user._id}`} className="btn btn-raised btn-sm btn-info">View</Link>
          <button onClick={()=>this.clickFollow(user,i)} className="btn btn-raised btn-info float-right btn-sm">Follow<i class="fa fa-twitter ml-2" aria-hidden="true"></i></button>
          </div>
        </div>
        </div>
      </div> 
       ) ))}</div>
    }
    render() {
        const { users,open,followMessage,loading } = this.state;
        return (
            <div>
           {loading?
           <div className="text-center">
           <LoaderSpinner/>
           </div>
           :
           <div classNameName="container">
            
           <h2 className="mt-5 mb-5 ml-2">Find People</h2>
           
           
           {open && (<div className="alert alert-info">
   <p>{followMessage }</p>
           </div>)}
           
           {this.renderUsers(users)}
       </div>
           }
           
            
            </div>
        )
    }
}

export default FindPeople


