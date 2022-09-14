import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'




export default function Orders(props) {


    const deleteOrder = (id) => {
        axios
            .delete(`http://localhost:5000/order/${id}`)
            .then((res) => {
                setOrders((Prev) => {
                    return Prev.filter((order) => {
                        return order._id !== id
                    })
                })
            })
        console.log(id)

    }

    const [editForm, setEditForm] = useState(
        {
            userId: "",
            orderStatus: ""
        }
    )


    const [showModal, setShowModal] = useState(false)

    const editOrder = (id) => {
        let payload = { orderStatus: editForm.orderStatus }
        axios
            .put(`http://localhost:5000/edit/${id}`, payload)
            .then((res) => {
                fetchOrders();
                console.log(res)
                setShowModal(false)
            })
            .catch((err) => {
                console.log(err)
            });
    }





    const [orders, setOrders] = useState([
        {
            _id: "",
            product: [],
            totalPrice: "",
            orderStatus: ""
            
        }
    ]);

    const user = JSON.parse(localStorage.User)

    const fetchOrders = () => {
        axios
            .get(`http://localhost:5000/orders/${user._id}`)
            .then((res) => {
                console.log(res);
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    useEffect(() => { fetchOrders(); }, [])



    return (
        <>

            <div className="container">

                <h1>Orders</h1>
                
                <table className="table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Product</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            orders.map((order) => {
                                return (

                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.orderItems}</td>
                                        <td>{order.totalPrice}</td>
                                        <td>{order.orderStatus}</td>
                                        <td>
                                            <button onClick={(e) => {
                                                setEditForm(order);
                                                setShowModal(true);
                                            }}>Edit</button>
                                            
                                            <button onClick={() => deleteOrder(order._id)} >Delete</button>
                                        </td>

                                    </tr>

                                )
                            })}

                    </tbody>

                </table>
            </div>
            <EditOrder
                showModal={showModal}
                setShowModal={setShowModal}
                editForm={editForm}
                setEditForm={setEditForm}
                editOrder={editOrder}
            />



        </>
    );
}



export function EditOrder({ showModal, setShowModal, editForm, setEditForm, editOrder }) {

    const handleEditSubmit = (e) => {
        e.preventDefault()
        editOrder(editForm._id)

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
                <Modal.Title>Edit Order</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicOrderStatus">
                        <Form.Label>Order Status: </Form.Label>

                        <Form.Control
                            type="string"
                            name="orderStatus"
                            value={editForm.orderStatus}
                            onChange={handleEditChange}
                            placeholder="Enter Status"
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