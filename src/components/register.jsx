
import { useState } from "react";
import axios from "axios";
export default function Register(){

    const [form,setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form)
        
        axios.post('http://localhost:5000/customers/register', form)
            .then((res) => {
                alert(res.data.message)
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            });
        
    }

    const handleChange = (e) =>{
        e.preventDefault();
        setForm((prevData)=>{
            return{
                ...prevData,
                [e.target.name]: e.target.value
            }
            })
        }
    

    return(
        <div>
            

            <h1 className="d-flex justify-content-center">Register</h1>
            <form className="bg-dark text-white container rounded" style={{borderradius: "1rem" }} onSubmit={(e)=>handleSubmit(e)}>
                <div className= "form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email" 
                    onChange={(e)=>handleChange(e)}
                    id="email" placeholder="Email" />
                </div>
                <div className= "form-group">
                    <label for="validationServer01" htmlFor="password">Password</label>
                    <input type="password" name="password" id="validationServer01" className="form-control" 
                    onChange={(e)=>handleChange(e)}
                     placeholder="Password" />
                </div>
                <div className= "form-group"> 
                    <label htmlFor="Name">Name</label>
                    <input type="text" name="name" className="form-control" 
                    onChange={(e)=>handleChange(e)}
                    id="Name" placeholder="Enter Name" />
                    
                </div>
                <br></br>
            <button type="submit" class="btn btn-lg btn-outline-light">Submit</button>
                
            </form>
            
        </div>
    )
}