import { Link, withRouter } from 'react-router-dom'
import React from 'react'
import { signout, isAuthenticated } from '../auth'
const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "grey" }
    else return { color: "#ffffff" }
}



const Menu = ({ history }) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/")} to="/" >home<i class="fa fa-home fa-lg ml-2" aria-hidden="true"></i></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/users")} to="/users" >Users<i class="fa fa-users fa-lg ml-2" aria-hidden="true"></i></Link>
                </li>
                {!isAuthenticated() && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">Signup<i class="fa fa-user-plus fa-lg ml-2" aria-hidden="true"></i></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">Signin<i class="fa fa-sign-in fa-lg ml-2" aria-hidden="true"></i></Link>
                        </li>
                    </>
                )}
                {isAuthenticated() && (
                    <>
                        <li className="nav-item">


                            <Link className="nav-link" to={`/post/create`} style={isActive(history, `/post/create`)}>new post</Link>
                        </li>

                        <li className="nav-item">


                            <Link className="nav-link" to={`/findpeople`} style={isActive(history, `/findpeople`)}>Find people<i class="fa fa-search fa-lg ml-2" aria-hidden="true"></i></Link>
                        </li>


                        <li className="nav-item">


                            <Link className="nav-link" to={`/user/${isAuthenticated().user._id}`} style={isActive(history, `/user/${isAuthenticated().user._id}`)}>WELCOME  {isAuthenticated().user.name}</Link>
                        </li>
                        <li className="nav-item">
                            <span className="nav-link " style={isActive(history, "/signout"), { cursor: "pointer", color: "white" }} onClick={() => signout(() => history.push('/signin'))} >Signout<i class="fa fa-sign-out fa-lg ml-2" aria-hidden="true"></i></span>
                           
                        </li>
                    </>
                )}
            </ul>
            {/* <span className=" nav nav-tabs bg-dark nav-link float-right " style={isActive(history, "/signout"), { cursor: "pointer", color: "white" }} onClick={() => signout(() => history.push('/signin'))} >Signout<i class="fa fa-sign-out fa-lg ml-2" aria-hidden="true"></i></span> */}

        </div>
    )
}

export default withRouter(Menu)
