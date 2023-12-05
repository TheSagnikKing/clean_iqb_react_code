import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import SignIn from './components/Admin/admin_authentication/Signin'
import SignUp from './components/Admin/admin_authentication/SignUp'
import ResetPassword from './components/Admin/admin_authentication/ResetPassword'
import ResetNewPassword from './components/Admin/admin_authentication/ResetNewPassword'
import Verifyemail from './components/Admin/admin_authentication/Verifyemail'
import Dashboard from './components/Admin/Dashboard/Dashboard'
import BarberListTable from './components/Admin/Barber/BarberListTable/BarberListTable'
import CreateBarber from './components/Admin/Barber/CreateBarber/CreateBarber'
import UpdateBarber from './components/Admin/Barber/UpdateBarber/UpdateBarber'
import SalonListTable from './components/Admin/Salon/SalonListTable/SalonListTable'
import CreateSalon from './components/Admin/Salon/CreateSalon/CreateSalon'
import UpdateSalon from './components/Admin/Salon/UpdateSalon/UpdateSalon'
import CustomerListTable from './components/Admin/Customer/CustomerListTable/CustomerListTable'
import Queue from "./components/Admin/Queue/Queue"
import QueuebarberList from "./components/Admin/Queue/QueuebarberList/QueuebarberList"
import QueuebarberServices from "./components/Admin/Queue/QueuebarberServices/QueuebarberServices"
import QueueselectServices from "./components/Admin/Queue/QueueselectServices/QueueselectServices"
import QueueselectBarber from "./components/Admin/Queue/QueueselectBarber/QueueselectBarber"
import Queautojoinservices from "./components/Admin/Queue/AutoJoine/Queautojoinservices/Queautojoinservices"
import MyCustomer from "./components/Admin/Queue/MyCustomer/MyCustomer"
import Appoinment from "./components/Admin/Appoinment/Appoinment"
import AppointBarber from "./components/Admin/Appoinment/AppointBarber/AppointBarber"
import AppointBarberServices from "./components/Admin/Appoinment/AppointBarberServices/AppointBarberServices"
import AppointSelectServices from "./components/Admin/Appoinment/AppointSelectServices/AppointSelectServices"
import AppointmentSelectBarber from "./components/Admin/Appoinment/AppointmentSelectBarber/AppointmentSelectBarber"

const App = () => {

  return (
      <BrowserRouter>
        <Routes>

          {/* Intial Page */}
          <Route path="/" element={<div>
            <Link to="/admin-signin">Admin Signin</Link>&nbsp;&nbsp;
            <Link to="/barber-signin">Barber Signin</Link>
          </div>}/>

          {/* Admin Auth */}
          <Route path="/admin-signin" element={<SignIn/>}/>
          <Route path="/admin-signup" element={<SignUp/>}/>
          <Route path="/resetpassword" element={<ResetPassword/>}/>
          <Route path="/resetnewpassword" element={<ResetNewPassword/>}/>
          <Route path="/verifyemail" element={<Verifyemail/>}/>

          {/* Admin Page START ====================================*/}

          {/* Dashboard */}
          <Route path="/admin-dashboard" element={<Dashboard/>}/>

          {/* Salon */}
          <Route path="/salon/salonlist" element={<SalonListTable/>}/>
          <Route path="/salon/createsalon" element={<CreateSalon/>}/>
          <Route path="/salon/updateSalon/:salonId" element={<UpdateSalon/>}/>

          {/* Barber */}
          <Route path="/barber/barberlist" element={<BarberListTable/>}/>
          <Route path="/barber/createbarber" element={<CreateBarber/>}/>
          <Route path="/barber/updatebarber" element={<UpdateBarber/>}/>

          {/* Customer */}
          <Route path="/customer/customerlist" element={<CustomerListTable/>}/>

          {/* Queue */}
          <Route path="/queue" element={<Queue/>}/> 
          <Route path="/queue/barberlist" element={<QueuebarberList/>}/>
          <Route path="/queue/barberservices/:barberid/:barbername" element={<QueuebarberServices/>}/>
          <Route path="/queue/selectservices" element={<QueueselectServices/>}/>
          <Route path="/queue/selectservicebarber/:serviceid" element={<QueueselectBarber/>}/>
          <Route path="/queue/autoqueservices" element={<Queautojoinservices/>}/>
          <Route path="/queue/mycustomer" element={<MyCustomer/>}/>

          {/* Appointment */}
          <Route path="/appoinment" element={<Appoinment/>}/>
          <Route path="/appointment/barber" element={<AppointBarber/>}/>
          <Route path="/appointment/barberservices/:barberid/:barbername" element={<AppointBarberServices/>}/>
          <Route path="/appoinment/service" element={<AppointSelectServices/>}/>
          <Route path="/appointment/selectservicebarber/:serviceid" element={<AppointmentSelectBarber/>}/>
          
          {/* Admin Page END  ====================================*/}

        </Routes>
      </BrowserRouter>
  )
}

export default App

