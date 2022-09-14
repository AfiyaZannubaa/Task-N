
import { useState } from "react";

import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login(props){

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = (e) =>{
        
        e.preventDefault();
       // console.log(form)
    
    axios.post('http://localhost:5000/customers/login', form)
            .then((res) => {
                alert(res.data.message)
                console.log(res.data)
                localStorage.User = JSON.stringify(res.data.user)
            }).catch((error) => {
                console.log(error)
            });
        
    }
    const handleChange = (e)=>{
        e.preventDefault();
        setForm((prevData)=>{
        return{
            ...prevData,
            [e.target.name]: e.target.value
        }
        })
    }
    

    return (
        <div className = "container">
            <h2 className="d-flex justify-content-center">Login</h2>

            <form  className="bg-dark text-white container rounded" onSubmit={handleSubmit}>

                <div className="form-group">

                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" 
                    onChange= {(e)=>handleChange(e)} 
                    id="email" 
                    name= "email"
                    placeholder="Enter Email" />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    name="password"
                    className="form-control" 
                    onChange={(e)=>handleChange(e)} 
                    id="password" 
                    placeholder="Enter Password" />
                    <br />
                </div>
                <button type="submit" className="btn btn-lg btn-outline-light" >Submit</button>
            </form>
        </div>
    )
}