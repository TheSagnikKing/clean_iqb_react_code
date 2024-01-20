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
const Barberauth = React.lazy(() => import('./components/Middleware/Barberauth'))

const AdminDashboard = React.lazy(() => import('./components/Admin/Dashboard/Dashboard'))
const AdminSalons = React.lazy(() => import('./components/Admin/Salon/Salon'))
const AdminBarbers = React.lazy(() => import('./components/Admin/Barbers/Barbers'))
const AdminCustomers = React.lazy(() => import('./components/Admin/Customers/Customers'))
const AdminReports = React.lazy(() => import('./components/Admin/Reports/Reports'))
const AdminAdvertisements = React.lazy(() => import('./components/Admin/Advertisements/Advertisements'))
const AdminQueue = React.lazy(() => import('./components/Admin/Queue/Queue'))
const AdminAppointments = React.lazy(() => import('./components/Admin/Appointments/Appointments')) 


const BarberDashboard = React.lazy(() => import('./components/Barber/Dashboard/Dashboard'))
const BarberReports = React.lazy(() => import('./components/Barber/Reports/Reports'))
const BarberQueue = React.lazy(() => import('./components/Barber/Queue/QueueList/QueueList'))
const BarberAppointment = React.lazy(() => import('./components/Barber/Appointment/Appointment'))
const BarberNotification = React.lazy(() => import('./components/Barber/NotificationList/NotificationList'))

const App = () => {
  const [open, setOpen] = useState(false)

  return (
      <BrowserRouter>
        <Suspense fallback={<div className='lazy-loader'><BeatLoader color="rgba(54, 60, 214, 1)" /></div>}>
          <Routes>

            {/* Intial Page */}
            <Route path="/" element={<div>
              <Link to="/admin-signin">Admin Signin</Link>&nbsp;&nbsp;
            </div>} />

            {/* Admin Auth */}
            <Route path="/admin-signin" element={<Signin />} />
            <Route path="/admin-signup" element={<Signup />} />
            <Route path="/resetpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword/>}/>



            <Route path='/admin-dashboard' element={<Adminauth><Sidebar open={open} setOpen={setOpen} title={"Admin-Dashboard"}><AdminDashboard /></Sidebar></Adminauth>} />
            <Route path='/salon/salonlist' element={<Adminauth><Sidebar open={open} setOpen={setOpen} title={"Salons"}><AdminSalons /></Sidebar></Adminauth>} />
            <Route path='/barber/dashboard2' element={<Adminauth><Sidebar open={open} setOpen={setOpen} title={"Barbers"}><AdminBarbers /></Sidebar></Adminauth>} />
            <Route path='/customer/dashboard3' element={<Adminauth><Sidebar open={open} setOpen={setOpen} title={"Customers"}><AdminCustomers /></Sidebar></Adminauth>} />
            <Route path='/admin/reports' element={<Adminauth><Sidebar open={open} setOpen={setOpen} title={"Reports"}><AdminReports /></Sidebar></Adminauth>} />
            <Route path='/advertisement' element={<Adminauth><Sidebar open={open} setOpen={setOpen} title={"Advertisements"}><AdminAdvertisements /></Sidebar></Adminauth>} />
            <Route path='/queue' element={<Adminauth><Sidebar open={open} setOpen={setOpen} title={"Queue"}><AdminQueue /></Sidebar></Adminauth>} />
            <Route path='/appoinment' element={<Adminauth><Sidebar open={open} setOpen={setOpen} title={"Appointments"}><AdminAppointments /></Sidebar></Adminauth>} />

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


            <Route path='/barber-dashboard' element={<Barberauth><Sidebar open={open} setOpen={setOpen} title={"Barber-Dashboard"}><BarberDashboard /></Sidebar></Barberauth>}/>
            <Route path='/barber/reports' element={<Barberauth><Sidebar open={open} setOpen={setOpen} title={"Reports"}><BarberReports /></Sidebar></Barberauth>}/>
            <Route path='/barber/queuelist' element={<Barberauth><Sidebar open={open} setOpen={setOpen} title={"Queue"}><BarberQueue /></Sidebar></Barberauth>}/>
            <Route path='/barber/appoinment' element={<Barberauth><Sidebar open={open} setOpen={setOpen} title={"Appointment"}><BarberAppointment /></Sidebar></Barberauth>}/>
            <Route path='/barber/allnotification' element={<Barberauth><Sidebar open={open} setOpen={setOpen} title={"Notification"}><BarberNotification /></Sidebar></Barberauth>}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
  )
}

export default App

