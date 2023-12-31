import React, { useEffect, useState } from 'react'
import "./SalonListTable.css"
import { useSelector } from 'react-redux'
import { GrAdd } from 'react-icons/gr'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiFillEdit, AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios'
import { PuffLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router-dom'
import { RiSettings3Fill } from 'react-icons/ri'
import AdminLayout from '../../../layout/Admin/AdminLayout'

const SalonListTable = () => {

    const [search,setSearch] = useState("")
    const [salonList,setSalonList] = useState([])
    const [loading,setLoading] = useState(false)

    const searchHandler = async() => {
        if(search === ""){

        }else{
            setLoading(true)
            const {data} = await axios.get(`https://iqb-backend2.onrender.com/api/salon/getAllSalonsByAdminEmail?adminEmail=${search}`)
            setSalonList(data)
            setLoading(false)
        }  
    }

    console.log(salonList)

    const navigate = useNavigate()

    const addSalonNavigate = () => {
        navigate("/salon/createsalon")
    }
 
  return (
    <>
        <AdminLayout/>
        <div className="wrapper">
                <div className="header">
                    <p>Salons List</p>

                    <div>
                        <div className='salon-input'>
                            <input
                                type="text"
                                placeholder='Search By Admin Email'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <button onClick={searchHandler}><AiOutlineSearch/></button>
                        </div>

                        <div onClick={addSalonNavigate}>
                            <GrAdd />
                        </div>
                    </div>
                </div>

                {/* Table  */}
                <div className='table'>
                 {
                    loading ? <div className='salon-puff-loader-box'><PuffLoader/></div> : salonList && salonList.response ? salonList.response.map((salon,index) => (
                        <div key={index} className='salon-item'>
                            <div>
                                <p>Salon ID</p>
                                <p>{salon.salonId}</p>
                            </div>

                            <div>
                                <p>Salon Code</p>
                                <p>{salon.salonCode}</p>
                            </div>

                            <div>
                                <p>Salon Name</p>
                                <p>{salon.salonName}</p>
                            </div>

                            <div>
                                <p>Admin Email</p>
                                <p>{salon.adminEmail}</p>
                            </div>

                            <div>
                                <p>Address</p>
                                <p>{salon.address}</p>
                            </div>

                            <div>
                                <p>City</p>
                                <p>{salon.city}</p>
                            </div>

                            <Link to={`/salon/updatesalon/${salon.salonId}`}>
                                <AiFillEdit/>
                            </Link>

                            <Link to="#">
                                <RiSettings3Fill/>
                            </Link>

                        </div>
                    )) : <p className='salon-search'>Search Your Salons</p>
                 }
                </div>

            </div>
        
    </>
  )
}

export default SalonListTable