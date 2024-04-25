import React, { useState } from 'react'
import '../App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { serverURL } from '../API/url';

function Register() {
    const [values , setValues] = useState({
        name:'',
        email:'',
        password:''
    })
    console.log(values);

    const navigate = useNavigate()

    const handleSubmit = (e) => {
      e.preventDefault();
      const { name, email, password } = values;
      if (!name || !email || !password) {
          alert('Please Fill the form completely..!!');
      } else {
          axios.post(`${serverURL}/signup`, values)
              .then(res => {
                  alert('Registered successfully..!!');
                  navigate('/login')
              })
              .catch(err => {
                console.log(err)
              });
      }
  };


  
  return (
    <>
      <div className='main position-fixed d-flex justify-content-center align-items-center'>
           <div style={{width:'330px'}} className='text-white'>
              <h1 className='mb-5'>Registration Form</h1>
              <Form>
                 <Form.Group className="mb-3" controlId="formBasicUsername">
                   <Form.Label>Your Name</Form.Label>
                   <Form.Control onChange={(e) => setValues({ ...values,name: e.target.value })} type="text" placeholder="Enter name" />
                 </Form.Group>
           
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Label>Email address</Form.Label>
                   <Form.Control onChange={(e)=>{setValues({...values,email:e.target.value})}} type="email" placeholder="Enter email" />
                 </Form.Group>
           
                 <Form.Group className="mb-3" controlId="formBasicPassword">
                   <Form.Label>Password</Form.Label>
                   <Form.Control onChange={(e)=>{setValues({...values,password:e.target.value})}} type="password" placeholder="Password" />
                 </Form.Group>

                <div className='d-flex justify-content-between mt-4'>
                    <div>
                         <Button onClick={handleSubmit} variant="success" type="submit">
                           Sign Up
                         </Button>
                    </div>
                    <div>
                        <Link to='/login'>Already a User? Login</Link>
                    </div>
                </div>
               
              </Form>
              


           </div>
      </div>
    </>
  )
}

export default Register