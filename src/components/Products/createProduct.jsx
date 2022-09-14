import './product.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { useState } from "react";


export default function Products(){


    

    
    
    const handleChange = (e) =>{
        console.log(e.target)
        e.preventDefault();
        setProduct((prevData)=>{
            return{
                ...prevData,
                [e.target.name]: e.target.value
            }
            })
        }

        //
        //
        //
        const [product, setProduct] = useState([
            {
                username: "",
                productName: "",
                Price: "",
                
            }
        ]);
    
       
        
        
        const handleSubmit = (e) => {
            e.preventDefault()
            axios
                .post(`http://localhost:5000/product`,product)
                .then((res) => {
                    console.log(res);
                    setProduct(res.data);
                })
                .catch((err) => {
                    console.log(err)
                });
        }
    
        // useEffect(() => { AxiosProduct(); }, [])
        //
        //
        //

    return(
        <div>
            <h2>Create Your Products Here</h2>
            <form onSubmit={handleSubmit} >

            <div >
            <label htmlFor="name"> Username</label>
            <input 
            className= "name" 
            onChange={(e) => handleChange(e)}
            type="name" 
            name="username" 
            id="name"  />   
            </div>

            <div>
                <label htmlFor = "name">Product Name</label>
                <input 
                className="productname" 
                onChange={(e) => handleChange(e)}
                type="productName" 
                name="productName" 
                id="productName" />
                
                <label htmlFor ="price">Price</label>
                <input 
                type="number"
                onChange={(e) => handleChange(e)} 
                name="Price" 
                id="price"/>

                <br />
                <br />
                <button 
                type="submit" 
                name="submit" 
                className="btn btn-outline-dark ">submit</button>
            </div>
             
            </form>
            
        </div>
    )
}