import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Add from './Add';
import { serverURL } from '../API/url';
import Edit from './Edit';

function StudentList() {

  const [lists, setLists] = useState([])
  console.log(lists);
  //Display List

     const fetchData = ()=>{
      axios.get(`${serverURL}/lists`)
      .then(result => {
        if (result.data.status) {
          setLists(result.data.Result)
          console.log(result.data.Result);
        } else {
          alert('error')
        }
        
      }).catch(err => console.log(err))
    }
    
    useEffect(()=>{
      fetchData()    
    },[])
 
   //delete
   const handleDelete = (id) => {
    axios.delete(`${serverURL}/delete/${id}`)
      .then(res => {
        setLists(prevLists => prevLists.filter(student => student.idnum !== id));
      }).catch(err => {
        console.log(err);
      })
  }
  //deletebutton
  const deleteAlert = (id)=>{
    const confirmDelete = window.confirm('Are you sure to delete?');
    if(confirmDelete){
      handleDelete(id)
    }
  }

 
  return (
    <div>
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
              <th><center><Add  fetchData={fetchData}/></center></th>
            </tr>
          </thead>
          <tbody>

            {
              lists.map(sData => (
                <tr className='border-bottom'>
                  <td>{sData.idnum}</td>
                  <td>{sData.firstname}</td>
                  <td>{sData.lastname}</td>
                  <td>{sData.dob.split('T')[0]}</td>
                  <td>{sData.address}</td>
                  <td>{sData.phone}</td>
                  <td>{sData.email}</td>
                  <td><center className='d-flex'>
                      <Edit studentData={sData} fetchData={fetchData}/>
                    <button onClick={() => deleteAlert(sData.idnum)} className='btn btn-danger m-2'>Delete</button>
                  </center></td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>

    </div>
  )
}

export default StudentList