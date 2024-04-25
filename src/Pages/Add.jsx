import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Button, Form, Modal } from 'react-bootstrap';
import { serverURL } from '../API/url';

function Add({fetchData}) {
   

       //state for add
  const [addStd, setAddStd] = useState({
    idnum: '',
    firstname: '',
    lastname: '',
    dob: '',
    address: '',
    phone: '',
    email: ''
  })
  console.log(addStd);

  const [addShow, setAddShow] = useState(false);

  const handleAddClose = () => setAddShow(false);
  const handleAddShow = () => setAddShow(true);

   //function to add
   const handleAdd = (e) => {
    e.preventDefault()
    const { idnum, firstname, lastname, dob, address, phone, email } = addStd
    if (!idnum || !firstname || !lastname || !dob || !address || !phone || !email) {
      alert('Please Fill the form completely..!!')
    } else {
      axios.post(`${serverURL}/addstudent`, addStd)
        .then(res => {
          fetchData()
          alert('Student added successfully..!!');
          handleAddClose()
          
        }).catch(err => {
          alert('Failed / error..!!');
        })
    }
    
  }
 
  
  return (
    <div>
        <button onClick={handleAddShow} className='btn btn-warning m-2'>Add Student</button>

        {/* modal for add student */}
      <Modal show={addShow} onHide={handleAddClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group className="mb-3" controlId="formBasicId">
              <Form.Label>Id No.</Form.Label>
              <Form.Control minLength={4} maxLength={4} onChange={(e) => setAddStd({ ...addStd, idnum: e.target.value })} type="text" placeholder="Enter four digit id" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicFname">
              <Form.Label>First Name</Form.Label>
              <Form.Control onChange={(e) => setAddStd({ ...addStd, firstname: e.target.value })} type="text" placeholder="Enter First Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control onChange={(e) => setAddStd({ ...addStd, lastname: e.target.value })} type="text" placeholder="Enter Last Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDOB">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control onChange={(e) => setAddStd({ ...addStd, dob: e.target.value })} type="date" placeholder="Enter DOB" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control onChange={(e) => setAddStd({ ...addStd, address: e.target.value })} type="address" placeholder="Enter Address" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control onChange={(e) => setAddStd({ ...addStd, phone: e.target.value })} maxLength={10} type="tel" placeholder="Enter Phone Number" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={(e) => setAddStd({ ...addStd, email: e.target.value })} type="email" placeholder="Enter Email" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAdd}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Add