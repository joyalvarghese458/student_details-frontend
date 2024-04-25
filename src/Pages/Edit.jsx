import React, { useState } from 'react'
import { serverURL } from '../API/url';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

function Edit({ fetchData, studentData }) {
    //state for edit
    const [editStd, setEditStd] = useState(studentData,{
        idnum: '',
        firstname: '',
        lastname: '',
        dob: '',
        address: '',
        phone: '',
        email: ''
    })
    console.log(editStd);

    // const [editValue, setEditValue] = useState(studentData);
    
   

    const [editShow, setEditShow] = useState(false);

    //state to editid
    const [editId, setEditId] = useState('')

    //modal functions
    const handleEditClose = () => setEditShow(false);
    const handleEditShow = (id) => {
        setEditId(id)
        setEditShow(true)
    }

    //edit
    const handleEdit = () => {
        axios.put(`${serverURL}/edit/${editId}`, editStd)
            .then(res => {
                 alert('Student details edited successfully')
                fetchData()
            }).catch(err => console.log(err))

    }
    return (
        <div>
            <button onClick={() => handleEditShow(editStd.idnum)} className='btn btn-primary m-2'>Edit</button>

            {/* modal for edit student */}
            <Modal show={editShow} onHide={handleEditClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicId">
                            <Form.Label>Id No.</Form.Label>
                            <Form.Control minLength={4} maxLength={4} onChange={(e) => setEditStd({ ...editStd, idnum: e.target.value })} value={editStd.idnum} type="text" placeholder="Enter four digit id" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicFname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control value={editStd.firstname} onChange={(e) => setEditStd({ ...editStd, firstname: e.target.value })} type="text" placeholder="Enter First Name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicLname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control onChange={(e) => setEditStd({ ...editStd, lastname: e.target.value })} value={editStd.lastname} type="text" placeholder="Enter Last Name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDOB">
                            <Form.Label>Date Of Birth</Form.Label>
                            <Form.Control value={editStd.dob.split('T')[0]} onChange={(e) => setEditStd({ ...editStd, dob: e.target.value })} type="date" placeholder="Enter DOB" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control value={editStd.address} onChange={(e) => setEditStd({ ...editStd, address: e.target.value })} type="address" placeholder="Enter Address" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control value={editStd.phone} onChange={(e) => setEditStd({ ...editStd, phone: e.target.value })} maxLength={10} type="tel" placeholder="Enter Phone Number" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control value={editStd.email} onChange={(e) => setEditStd({ ...editStd, email: e.target.value })} type="email" placeholder="Enter Email" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { handleEdit(); handleEditClose(); }}>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Edit