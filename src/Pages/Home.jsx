import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
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

  //state for edit
  const [editStd, setEditStd] = useState({
    idnum: '',
    firstname: '',
    lastname: '',
    dob: '',
    address: '',
    phone: '',
    email: ''
  })
  console.log(editStd);

  //modal state
  const [addShow, setAddShow] = useState(false);
  const [editShow, setEditShow] = useState(false);

  const [lists, setLists] = useState([])

  //state to editid
  const [editId , setEditId] = useState('')

  const navigate = useNavigate()

  //modal functions
  const handleAddClose = () => setAddShow(false);
  const handleAddShow = () => setAddShow(true);
  const handleEditClose = () => setEditShow(false);
  const handleEditShow = (id) =>{
    setEditId(id)
    setEditShow(true)
  } 

  //logout
  const handleLogout = ()=>{
    navigate('/login')
  }
  //function to add
  const handleAdd = (e) => {
    e.preventDefault()
    const { idnum, firstname, lastname, dob, address, phone, email } = addStd
    if (!idnum || !firstname || !lastname || !dob || !address || !phone || !email) {
      alert('Please Fill the form completely..!!')
    } else {
      axios.post('http://localhost:4000/addstudent', addStd)
        .then(res => {
          alert('Student added successfully..!!');
          
          setLists(prevLists => [...prevLists, addStd]);
        }).catch(err => {
          alert('Failed / error..!!');
        })
    }
    handleAddClose()
  }

  //Display List

 
    const fetchData = ()=>{
      axios.get('http://localhost:4000/lists')
      .then(result => {
        if (result.data.status) {
          setLists(result.data.Result)
        } else {
          alert('error')
        }
      }).catch(err => console.log(err))
    }
    
    useEffect(()=>{
      fetchData()    
    },[])
 

  //edit
  const handleEdit = () => {
    axios.put(`http://localhost:4000/edit/${editId}`,editStd)
    .then(res=>{
       fetchData()
    }).catch(err=>console.log(err))

  }

  //delete
  const handleDelete = (id) => {
    axios.delete(`http://localhost:4000/delete/${id}`)
      .then(res => {
        setLists(prevLists => prevLists.filter(student => student.idnum !== id));
      }).catch(err => {
        console.log(err);
      })
  }

  return (
    <div className='p-5'>
      <Row>
        <Col md={4}></Col>
        <Col md={4}><center><h1>STUDENTS DETAILS</h1></center></Col>
        <Col className='d-flex justify-content-end' md={4}>
          <button onClick={handleLogout} className='btn btn-primary'>Log Out</button>
        </Col>
      </Row>

      <div className='p-3 bg-secondary shadow rounded mt-5'>
        <table style={{ color: 'white' }} className='w-100'>
          <thead className='border-bottom'>
            <tr>
              <th>Std Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date of birth</th>
              <th>Address</th>
              <th>Phone</th>
              <th>email</th>
              <th><center><button onClick={handleAddShow} className='btn btn-success m-2'>Add Student</button></center></th>
            </tr>
          </thead>
          <tbody>

            {
              lists.map(sData => (
                <tr className='border-bottom'>
                  <td>{sData.idnum}</td>
                  <td>{sData.firstname}</td>
                  <td>{sData.lastname}</td>
                  <td>{sData.dob}</td>
                  <td>{sData.address}</td>
                  <td>{sData.phone}</td>
                  <td>{sData.email}</td>
                  <td><center>
                    <button onClick={() => handleEditShow(sData.idnum)} className='btn btn-primary m-2'>Edit</button>
                    <button onClick={() => handleDelete(sData.idnum)} className='btn btn-danger'>Delete</button>
                  </center></td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>

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

      {/* modal for edit student */}
      <Modal show={editShow} onHide={handleEditClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group className="mb-3" controlId="formBasicId">
              <Form.Label>Id No.</Form.Label>
              <Form.Control minLength={4} maxLength={4} onChange={(e) => setEditStd({ ...editStd, idnum: e.target.value })} type="text" placeholder="Enter four digit id" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicFname">
              <Form.Label>First Name</Form.Label>
              <Form.Control onChange={(e) => setEditStd({ ...editStd, firstname: e.target.value })} type="text" placeholder="Enter First Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLname">
              <Form.Label>Last Name</Form.Label>
              <Form.Control onChange={(e) => setEditStd({ ...editStd, lastname: e.target.value })} type="text" placeholder="Enter Last Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDOB">
              <Form.Label>Date Of Birth</Form.Label>
              <Form.Control onChange={(e) => setEditStd({ ...editStd, dob: e.target.value })} type="date" placeholder="Enter DOB" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control onChange={(e) => setEditStd({ ...editStd, address: e.target.value })} type="address" placeholder="Enter Address" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control onChange={(e) => setEditStd({ ...editStd, phone: e.target.value })} maxLength={10} type="tel" placeholder="Enter Phone Number" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control onChange={(e) => setEditStd({ ...editStd, email: e.target.value })} type="email" placeholder="Enter Email" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => { handleEdit();handleEditClose();  }}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Home