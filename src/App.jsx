import React, { Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import BeatLoader from "react-spinners/BeatLoader";

const Sidebar = React.lazy(() => import('./components/Sidebar/Sidebar'))

// Admin Routes
const Signin = React.lazy(() => import('./components/Admin/Auth/Signin/Signin'))
const Signup = React.lazy(() => import('./components/Admin/Auth/Signup/Signup'))
const ForgotPassword = React.lazy(() => import('./components/Admin/Auth/ForgotPassword/ForgotPassword'))
const ResetPassword = React.lazy(() => import('./components/Admin/Auth/ResetPassword/ResetPassword'))
const Adminauth = React.lazy(() => import('./components/Middleware/Adminauth'))

const AdminDashboard = React.lazy(() => import('./components/Admin/Dashboard/Dashboard'))
const BarberDashboard = React.lazy(() => import('./components/Barber/Dashboard/Dashboard'))

const App = () => {
  const [open, setOpen] = useState(false)

  return (
      <BrowserRouter>
        <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
          <Routes>

            {/* Intial Page */}
            <Route path="/" element={<div>
              <Link to="/admin-signin">Admin Signin</Link>&nbsp;&nbsp;
              <Link to="/barber-signin">Barber Signin</Link>
            </div>} />

            {/* Admin Auth */}
            <Route path="/admin-signin" element={<Signin />} />
            <Route path="/admin-signup" element={<Signup />} />
            <Route path="/resetpassword" element={<ForgotPassword />} />
            <Route path="/resetnewpassword/:token" element={<ResetPassword/>}/>



            <Route path='/admin-dashboard' element={<Adminauth><Sidebar open={open} setOpen={setOpen} title={"Admin-Dashboard"}><AdminDashboard /></Sidebar></Adminauth>} />
            <Route path='/barber-dashboard' element={<Sidebar open={open} setOpen={setOpen} title={"Admin-Dashboard"}><BarberDashboard /></Sidebar>}/>

            {/* <Route path="admin-dashboard" element={<Si}/>  */}

            {/* Admin Page START ====================================*/}

            {/* Dashboard */}
            {/* <Route path="/admin-dashboard" element={<Dashboard/>}/> */}

            {/* Salon */}
            {/* <Route path="/salon/salonlist" element={<SalonListTable/>}/>
          <Route path="/salon/createsalon" element={<CreateSalon/>}/>
          <Route path="/salon/updateSalon/:salonId" element={<UpdateSalon/>}/> */}

            {/* Barber */}
            {/* <Route path="/barber/barberlist" element={<BarberListTable/>}/>
          <Route path="/barber/createbarber" element={<CreateBarber/>}/>
          <Route path="/barber/updatebarber" element={<UpdateBarber/>}/> */}

            {/* Customer */}
            {/* <Route path="/customer/customerlist" element={<CustomerListTable/>}/> */}

            {/* Queue */}
            {/* <Route path="/queue" element={<Queue/>}/> 
          <Route path="/queue/barberlist" element={<QueuebarberList/>}/>
          <Route path="/queue/barberservices/:barberid/:barbername" element={<QueuebarberServices/>}/>
          <Route path="/queue/selectservices" element={<QueueselectServices/>}/>
          <Route path="/queue/selectservicebarber/:serviceid" element={<QueueselectBarber/>}/>
          <Route path="/queue/autoqueservices" element={<Queautojoinservices/>}/>
          <Route path="/queue/mycustomer" element={<MyCustomer/>}/> */}

            {/* Appointment */}
            {/* <Route path="/appoinment" element={<Appoinment/>}/>
          <Route path="/appointment/barber" element={<AppointBarber/>}/>
          <Route path="/appointment/barberservices/:barberid/:barbername" element={<AppointBarberServices/>}/>
          <Route path="/appoinment/service" element={<AppointSelectServices/>}/>
          <Route path="/appointment/selectservicebarber/:serviceid" element={<AppointmentSelectBarber/>}/> */}

            {/* Admin Page END  ====================================*/}

          </Routes>
        </Suspense>
      </BrowserRouter>
  )
}

export default App

