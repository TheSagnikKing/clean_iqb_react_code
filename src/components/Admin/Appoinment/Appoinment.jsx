import React from 'react'
import "./Appoinment.css"
import { Link } from 'react-router-dom'
import AdminLayout from '../../layout/Admin/AdminLayout'

const Appoinment = () => {

  return (
    <>
      <AdminLayout />
      <div className='queue-wrapper-app'>
        <p>Select Your Appoinment</p>

        <div>
          <Link to="/appointment/barber">Select Barber</Link>
          <Link to="/appoinment/service">Select Service</Link>
        </div>
      </div>

    </>
  )
}

export default Appoinment