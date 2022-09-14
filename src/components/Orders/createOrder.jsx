import axios from "axios";
import { useState } from "react";
import { Form } from "react-bootstrap";
//import { handleChange, handleChangeMultiselect } from "../../utils/common";
export default function CreateOrder(props) {
    
    const user = JSON.parse(localStorage.getItem('User'))
    const [form,setForm] = useState({

        orderItems: [],
        totalPrice: "",

})

    const handleSubmit = (e) =>{
       
        e.preventDefault();
        console.log(user)

        axios
        .post(`http://localhost:5000/orders/${user._id}/customer`, form)
        .then((res)=>{
            console.log(res);
            //props.history.push("/orders");
   })
   .catch((err)=>{
       console.log(err)
   });

        

    }

    const handleChangeMultiselect = (event, callback = () => {}) =>{
        const {name, value, selectedOptions } = event.target;
        
        setForm((preState) => {
        
            return{
                ...preState,
                [name]:Array.from(selectedOptions,(option)=>option.value),
            };
        });
        
        callback();
        
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

   

    return (
        <div className="container">
            
            <h2>Create Order</h2>
            <form onSubmit={handleSubmit}>



                <div className="form-group">
                    <Form.Select multiple={true} onChange={(e)=>handleChangeMultiselect(e)}  
                    name="orderItems" aria-label="Default select example">
                        <option>Select Product</option>
                        <option value="Phone">Phone</option>
                        <option value="Charger">Charger</option>
                        <option value="headphone">headphone</option>
                        <option value="headphone">Laptop</option>
                        <option value="headphone">Speaker</option>
                    </Form.Select>
                </div>


                <div className="form-group">
                    <label htmlFor="Total">Total</label>
                    <input
                        type="number"
                        className="form-control"
                        onChange={(e) => handleChange(e)}
                        id="Total"
                        name="totalPrice"
                        placeholder="Total"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}