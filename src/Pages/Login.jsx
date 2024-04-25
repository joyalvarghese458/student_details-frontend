import React, { useState } from 'react'
import '../App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { serverURL } from '../API/url';

function Login() {
  const navigate = useNavigate()
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })
  console.log(loginData);

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = loginData
    if (!email || !password) {
      alert('Please Fill the form completely..!!')
    }
    else {
      axios.post(`${serverURL}/login`, loginData)
        .then(res => {
          if (res.data.success) {
            navigate('/home');
          } else {
            console.log(res.data); 
            alert('Incorrect email id / password');
          }
        })
        .catch(err => {
          if (err.response && err.response.status === 401) {
              alert('Incorrect email or password');
          } else {
              console.error('Error:', err);
              alert('An error occurred. Please try again later.');
          }
      });
    }
  }
  return (
    <>
      <div className='main position-fixed d-flex justify-content-center align-items-center'>
        <div style={{ width: '330px' }} className='text-white'>
          <h1 className='mb-5'>Login Form</h1>
          <Form>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} type="password" placeholder="Password" />
            </Form.Group>

            <div className='d-flex justify-content-between mt-4'>
              <div>
                <Button onClick={handleLogin} variant="success" type="submit">
                  Sign In
                </Button>
              </div>
              <div>
                <Link to='/'>Not a User? Register</Link>
              </div>
            </div>

          </Form>



        </div>
      </div>
    </>
  )
}

export default Login