import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {signin,authenticate} from '../auth'
import LoaderSpinner from '../images/LoaderSpinner'
class Signin extends Component {
    constructor(props) {
        super(props)

        this.state = {


            email: '',
            password: '',
            error: '',
            redirectToRefer: false,
            loading: false

        }
    }
    
    handleChange = (name) => event => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value })
    }
    handleSubmit = event => {
        event.preventDefault()
        
        this.setState({ loading: true })
        const { email, password } = this.state
        const user = {
            email, password
        }
        // console.log("user objects",user)
        signin(user).then(data => {
            if (data.error) this.setState({ error: data.error, loading: false });
            else {
                // authenticate
                authenticate(data, () => {
                    this.setState({ redirectToRefer: true })
                })
            }
        })
    }
    
    render() {
        const { email, password, error, redirectToRefer, loading } = this.state
        if (redirectToRefer) {
            return <Redirect to="" />
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signin</h2>
                <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                    {error}
                    
                </div>
                {loading ?
                
                (<div className="text-center">
                    {/* <h2>Loading...</h2> */}
                    
                    <h1><LoaderSpinner/></h1>
                </div>) : 
                <form id="form">

                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input type="email" className="form-control" value={email} onChange={this.handleChange("email")} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input type="password" className="form-control" value={password} onChange={this.handleChange("password")} />
                    </div>
                    <button className="btn btn-raised btn-dark" onClick={this.handleSubmit}>Submit</button>
                </form>}
            </div>
        )
    }
}

export default Signin
