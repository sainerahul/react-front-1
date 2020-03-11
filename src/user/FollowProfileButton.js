import React, { Component } from 'react'
import {follow,unfollow} from './apiUser'
class FollowProfileButton extends Component {
    followClick=()=>{
        this.props.onButtonClick(follow)
    }
    unfollowClick=()=>{
        this.props.onButtonClick(unfollow)
    }
    render() {
        return (
            <div className="d-inline-block">
                {
                    !this.props.following?(<button onClick={this.followClick} className="btn btn-raised btn-info  mr-4" >Follow<i class="fa fa-twitter ml-2" aria-hidden="true"></i></button>)
                    :
                    (
                    <button onClick={this.unfollowClick} className="btn btn-raised btn-secondary " >UnFollow</button>
                    )
                }
                

            </div>
        )
    }
}

export default FollowProfileButton
