import React from 'react'
import StudentList from './StudentList';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Home() {
  const navigate = useNavigate()
  

    //logout
    const handleLogout = ()=>{
      navigate('/login', { replace: true })
    }

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 

  return (
    <div className='p-5'>
      <Row>
        <Col md={4}></Col>
        <Col md={4}><center><h1>STUDENTS DETAILS</h1></center></Col>
        <Col className='d-flex justify-content-end' md={4}>
          <button onClick={handleShow} className='btn btn-primary'>Log Out</button>
        </Col>
      </Row>

     <StudentList/>

     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Body>Confirm Log Out!</Modal.Body>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Log out
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default Home