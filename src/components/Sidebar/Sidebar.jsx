import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { BiSearch } from 'react-icons/bi'
import { IoHome } from 'react-icons/io5'
import { RiUserSettingsLine } from 'react-icons/ri'
import { MdOutlineMessage } from 'react-icons/md'
import { IoIosAnalytics } from 'react-icons/io'
import { BsCart2 } from 'react-icons/bs'
import { AiFillHeart, AiFillSetting, AiFillFile } from 'react-icons/ai'
import "./sidebar.css"
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import AdminHeader from '../Admin/Header/Header'
import BarberHeader from '../Barber/Header/Header'
import { useDispatch, useSelector } from 'react-redux'

const adminmenudata = [
    {
        id: 1,
        url: '/admin-dashboard',
        icon: <IoHome />,
        name: "Dashboard"
    },
    {
        id: 2,
        url: '/salon/salonlist',
        icon: <RiUserSettingsLine />,
        name: "Salon"
    },
    {
        id: 3,
        url: '/barber/dashboard2',
        icon: < MdOutlineMessage />,
        name: "Barbers"
    },
    {
        id: 4,
        url: '/customer/dashboard3',
        icon: <IoIosAnalytics />,
        name: "Customers"
    },
    {
        id: 5,
        url: '/admin/reports',
        icon: <AiFillFile />,
        name: "Reports"
    },
    {
        id: 6,
        url: '/advertisement',
        icon: <BsCart2 />,
        name: "Advertisements"
    },
    {
        id: 7,
        url: '/queue',
        icon: <AiFillHeart />,
        name: "Queue"
    },
    {
        id: 8,
        url: '/appoinment',
        icon: <AiFillSetting />,
        name: "Appointments"
    }
]

const barbermenudata = [
    {
        id: 1,
        url: '/barber-dashboard',
        icon: <IoHome />,
        name: "Dashboard"
    },
    {
        id: 2,
        url: '/barber/reports',
        icon: <RiUserSettingsLine />,
        name: "Reports"
    },
    {
        id: 3,
        url: '/barber/queuelist',
        icon: < MdOutlineMessage />,
        name: "Queue"
    },
    {
        id: 4,
        url: '/barber/appoinment',
        icon: <AiFillSetting />,
        name: "Appointments"
    }
]


const Sidebar = ({ children, open, setOpen, title }) => {
    const location = useLocation()

    const userLoggedIn = localStorage.getItem('userLoggedIn')
    const barberLoggedIn = localStorage.getItem('barberLoggedIn')

    const menudata = (userLoggedIn && userLoggedIn == 'true') ? adminmenudata : ((barberLoggedIn && barberLoggedIn == 'true') && barbermenudata);

    const closeMenu = () => {
        setOpen(!open)
    }

    const openMenu = () => {
        setOpen(true)
    }

    const inputAnimation = {
        hidden: {
            width: 0,
            padding: 0,
            opacity: 0,
            transition: {
                duration: 0.2
            }
        },
        show: {
            width: "95%",
            padding: "0px 10px",
            opacity: 1,
            transition: {
                duration: 0.2
            }
        }
    }

    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5
            }
        },
        show: {
            width: "auto",
            opacity: 1,
            transition: {
                duration: 0.8
            }
        }
    }

    const [large, setLarge] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
                setLarge(true)
            }

        }

        window.addEventListener('resize', handleResize);
        handleResize(); // Initialize isMobile state
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])


    const animatewidth = large ? (open ? "280px" : "45px") : (open ? "300px" : "45px")

    const navigate = useCallback(useNavigate(), []);
    const dispatch = useDispatch();

    return (
        <div className="main-container">
            <motion.div
                animate={{ width: animatewidth }}
                className='sidebar'
            >
                <div>
                    {open && <h1>IQB Barber</h1>}
                    <div onClick={closeMenu}><FiMenu /></div>
                </div>

                <div className='search'>
                    <div><BiSearch /></div>
                    <AnimatePresence>
                        {open && <motion.input
                            type="text"
                            placeholder='Search'
                            variants={inputAnimation}
                            initial="show"
                            animate="show"
                            exit="hidden"
                        />}
                    </AnimatePresence>
                </div>


                <div className='sidebar-menu-content'>
                    {
                        menudata && menudata?.map((menu) => {
                            return (
                                <Link
                                    to={`${menu.url}`}
                                    key={menu.id}
                                >
                                    <div className={location.pathname === menu.url ? "active" : "navlink"}>
                                        <div>{menu.icon}</div>
                                        <AnimatePresence>
                                            {open && <motion.div
                                                variants={showAnimation}
                                                initial="show"
                                                animate="show"
                                                exit="hidden"
                                            >{menu.name}</motion.div>}
                                        </AnimatePresence>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>

            </motion.div>

            {/* Here is the main content of each and every page */}
            <div className='content' onClick={openMenu} >
                {
                    (userLoggedIn && userLoggedIn == 'true') ? <AdminHeader title={title} navigate={navigate} dispatch={dispatch} /> : (barberLoggedIn && barberLoggedIn == 'true') && <BarberHeader title={title} navigate={navigate} dispatch={dispatch} />
                }

                {children}
            </div>
        </div>
    )
}

export default Sidebar

