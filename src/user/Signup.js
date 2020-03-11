import React, { Component } from 'react'
import {signup} from '../auth'
import {Link} from 'react-router-dom'
class Signup extends Component {
    constructor(props) {
        super(props)

        this.state = {

            name: '',
            email: '',
            password: '',
            error: '',
            open:false
        }
    }
    handleChange = (name) => event => {
        this.setState({error:""})
        this.setState({ [name]: event.target.value })
    }
    handleSubmit = event => {
        event.preventDefault()
        const {name, email, password} = this.state
        const user = {
            name,email,password
        }
        // console.log("user objects",user)
        signup(user).then(data=>{
            if(data.error) this.setState({error:data.error});
            else this.setState({error:'',name:'',email:'',password:'',open:true});
        })
    }
   
    render() {
        const { name, email, password,error,open } = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>
                <div className="alert alert-danger" style={{display:error?"":"none"}}> 
                    {error}
                </div>
                <div className="alert alert-success" style={{display:open?"":"none"}}> 
                    New account created successfully! <Link to="/signin">Signin here</Link>
                </div>
                <form>
                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input type="text" className="form-control" value={name} onChange={this.handleChange("name")} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input type="email" className="form-control" value={email} onChange={this.handleChange("email")} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input type="password" className="form-control" value={password} onChange={this.handleChange("password")} />
                    </div>
                    <button className="btn btn-raised btn-dark" onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Signup
