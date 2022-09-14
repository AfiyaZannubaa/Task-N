import 'bootstrap/dist/css/bootstrap.min.css';
import './product.css'
import axios from "axios";
import { useState } from "react";
import { useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'




export default function CreateProduct(props) {

    //deleteProduct

    const deleteProduct = (id) => {
        axios
            .delete(`http://localhost:5000/deleteProduct/${id}`)
            .then((res) => {
                setProduct((Prev) => {
                    return Prev.filter((products) => {
                        return products._id !== id
                    })
                })
            })
        console.log(id)

    }

    const [editForm, setEditForm] = useState(
        {
            username: "",
            productName: ""
        }
    )
    const [showModal, setShowModal] = useState(false)

    const editProduct = () => {
        let payload = { productName: editForm.productName }
        axios
            .put(`http://localhost:5000/editProduct/${editForm._id}`, payload)
            .then((res) => {
                fetchProducts();
                console.log(res)
                setShowModal(false)
            })
            .catch((err) => {
                console.log(err)
            });
    }



    // const user = JSON.parse(localStorage.getItem('User'))
    const [product, setProduct] = useState([
        {
            Product: "",
            Price: "",
            Total: "",

        }
    ]);



    const fetchProducts = () => {
        axios
            .get(`http://localhost:5000/createProduct`)
            .then((res) => {
                console.log(res);
                setProduct(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    useEffect(() => { fetchProducts(); }, [])

    //   useEffect(() => {
    //     axios.get('http://localhost:5000/product').then((res) => {
    //         console.log(res)
    //     })
    //   },[])

    return (

        <>

        <div className='container'>
            <table className="table">
                <thead>
                    <tr >
                        <th>username</th>
                        <th >productName</th>
                        <th >productTotal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        product.map((products) => {
                            return (
                                <tr key={products.username} >
                                    <td>{products.username}</td>
                                    <td>{products.productName}</td>
                                    <td>{products.Price}</td>

                                    <td>
                                        <button onClick={(e) => {
                                            setEditForm(products);
                                            setShowModal(true);
                                        }}>Edit</button>

                                        <button onClick={() =>
                                            deleteProduct(products._id)} >Delete</button>
                                    </td>
                                </tr>
                            )
                        })}

                </tbody>
            </table>
        </div>


        <EditProduct
        showModal={showModal}
        setShowModal={setShowModal}
        editForm={editForm}
        setEditForm={setEditForm}
        editProduct={editProduct}
    />

</>


       

    );
    


};


export function EditProduct({ showModal, setShowModal, editForm, setEditForm, editProduct }) {

    const handleEditSubmit = (e) => {
        e.preventDefault()
        editProduct(editForm.username)

    }

    const handleEditChange = (e) => {
        e.preventDefault()
        setEditForm((prevData) => {
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })

    }
    return (
        <Modal show={showModal} onHide={() => {
            setShowModal(false);
        }} >
            <Modal.Header closeButton>
                <Modal.Title>Edit Products</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicProductName">
                        <Form.Label>Product Name: </Form.Label>

                        <Form.Control
                            type="string"
                            name="productName"
                            value={editForm.productName}
                            onChange={handleEditChange}
                            placeholder="Change Product"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => {
                    setShowModal(false)

                }}
                    variant="secondary">Close</Button>
                <Button onClick={(e) => {
                    handleEditSubmit(e)
                }}
                    variant="primary">Save changes</Button>
            </Modal.Footer>
        </Modal>
    );

}