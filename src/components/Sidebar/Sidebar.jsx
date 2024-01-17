import React, { useEffect, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { BiSearch } from 'react-icons/bi'
import { IoHome } from 'react-icons/io5'
import { RiUserSettingsLine } from 'react-icons/ri'
import { MdOutlineMessage } from 'react-icons/md'
import { IoIosAnalytics } from 'react-icons/io'
import { BsCart2 } from 'react-icons/bs'
import { AiFillHeart, AiFillSetting, AiFillFile } from 'react-icons/ai'
import "./sidebar.css"
import { useLocation,Link} from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import AdminHeader from '../Admin/Header/Header'
import BarberHeader from '../Barber/Header/Header'

const adminmenudata = [
    {
        id: 1,
        url: '/',
        icon: <IoHome />,
        name: "Dashboard"
    },
    {
        id: 2,
        url: '/users',
        icon: <RiUserSettingsLine />,
        name: "Users"
    },
    {
        id: 3,
        url: '/messages',
        icon: < MdOutlineMessage />,
        name: "Messages"
    },
    {
        id: 4,
        url: '/analytics',
        icon: <IoIosAnalytics />,
        name: "Analytics"
    },
    {
        id: 5,
        url: '/filemanager',
        icon: <AiFillFile />,
        name: "File Manager"
    },
    {
        id: 6,
        url: '/order',
        icon: <BsCart2 />,
        name: "Orders"
    },
    {
        id: 7,
        url: '/saved',
        icon: <AiFillHeart />,
        name: "Saved"
    },
    {
        id: 8,
        url: '/settings',
        icon: <AiFillSetting />,
        name: "Settings"
    }
]

const barbermenudata = [
    {
        id: 1,
        url: '/',
        icon: <IoHome />,
        name: "Dashboard"
    },
    {
        id: 2,
        url: '/users',
        icon: <RiUserSettingsLine />,
        name: "Users"
    },
    {
        id: 3,
        url: '/messages',
        icon: < MdOutlineMessage />,
        name: "Messages"
    },

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


    return (
        <div className="main-container">
            <motion.div
                animate={{ width: animatewidth }}
                className='sidebar'
            >
                <div>
                    {open && <h1>netflix</h1>}
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
            (userLoggedIn && userLoggedIn == 'true') ? <AdminHeader title={title} /> : (barberLoggedIn && barberLoggedIn == 'true') && <BarberHeader title={title}/>
                    }
                {children}
            </div>
        </div>
    )
}

export default Sidebar


// import { FiMenu, FiSettings } from 'react-icons/fi'
// import { BiLogOutCircle, BiSearch } from 'react-icons/bi'
// import { IoHome, IoNotificationsOutline } from 'react-icons/io5'
// import { RiAccountCircleFill, RiUserSettingsLine } from 'react-icons/ri'
// import { MdKeyboardArrowDown, MdOutlineMessage } from 'react-icons/md'
// import { IoIosAnalytics } from 'react-icons/io'
// import { BsCart2 } from 'react-icons/bs'
// import { AiFillHeart, AiFillSetting, AiFillFile } from 'react-icons/ai'
// import { CiSearch } from "react-icons/ci"
// import "./sidebar.css"
// import { useLocation,Link,useNavigate } from 'react-router-dom'
// import { FaCamera, FaUserCircle } from "react-icons/fa"

// import { AnimatePresence, motion } from 'framer-motion'
// import { useDispatch, useSelector } from 'react-redux'
// import api from '../Redux/api/Api'
// import { AdminLogoutAction } from '../Redux/Actions/Admin/AuthAction'

// const adminmenudata = [
//     {
//         id: 1,
//         url: '/',
//         icon: <IoHome />,
//         name: "Dashboard"
//     },
//     {
//         id: 2,
//         url: '/users',
//         icon: <RiUserSettingsLine />,
//         name: "Users"
//     },
//     {
//         id: 3,
//         url: '/messages',
//         icon: < MdOutlineMessage />,
//         name: "Messages"
//     },
//     {
//         id: 4,
//         url: '/analytics',
//         icon: <IoIosAnalytics />,
//         name: "Analytics"
//     },
//     {
//         id: 5,
//         url: '/filemanager',
//         icon: <AiFillFile />,
//         name: "File Manager"
//     },
//     {
//         id: 6,
//         url: '/order',
//         icon: <BsCart2 />,
//         name: "Orders"
//     },
//     {
//         id: 7,
//         url: '/saved',
//         icon: <AiFillHeart />,
//         name: "Saved"
//     },
//     {
//         id: 8,
//         url: '/settings',
//         icon: <AiFillSetting />,
//         name: "Settings"
//     }
// ]

// const barbermenudata = [
//     {
//         id: 1,
//         url: '/',
//         icon: <IoHome />,
//         name: "Dashboard"
//     },
//     {
//         id: 2,
//         url: '/users',
//         icon: <RiUserSettingsLine />,
//         name: "Users"
//     },
//     {
//         id: 3,
//         url: '/messages',
//         icon: < MdOutlineMessage />,
//         name: "Messages"
//     },

// ]


// const Sidebar = ({ children, open, setOpen, title }) => {
//     const location = useLocation()

//     const userLoggedIn = localStorage.getItem('userLoggedIn')
//     const barberLoggedIn = localStorage.getItem('barberLoggedIn')

//     const menudata = (userLoggedIn && userLoggedIn == 'true') ? adminmenudata : ((barberLoggedIn && barberLoggedIn == 'true') && barbermenudata);

//     console.log(menudata)


//     const closeMenu = () => {
//         setOpen(!open)
//     }

//     const openMenu = () => {
//         setOpen(true)
//     }

//     const inputAnimation = {
//         hidden: {
//             width: 0,
//             padding: 0,
//             opacity: 0,
//             transition: {
//                 duration: 0.2
//             }
//         },
//         show: {
//             width: "95%",
//             padding: "0px 10px",
//             opacity: 1,
//             transition: {
//                 duration: 0.2
//             }
//         }
//     }

//     const showAnimation = {
//         hidden: {
//             width: 0,
//             opacity: 0,
//             transition: {
//                 duration: 0.5
//             }
//         },
//         show: {
//             width: "auto",
//             opacity: 1,
//             transition: {
//                 duration: 0.8
//             }
//         }
//     }

//     const [large, setLarge] = useState(false)

//     useEffect(() => {
//         const handleResize = () => {
//             if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
//                 setLarge(true)
//             }

//         }

//         window.addEventListener('resize', handleResize);
//         handleResize(); // Initialize isMobile state
//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, [])

    
//     const animatewidth = large ? (open ? "280px" : "45px") : (open ? "300px" : "45px")

//     const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

//     const [dropdown, setDropdown] = useState(false)

//     const [salonList, setSalonList] = useState([])

//     useEffect(() => {
//         const getSalonfnc = async () => {
//             const { data } = await api.post("/api/admin/getAllSalonsByAdmin", {
//                 adminEmail: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email
//             })
//             setSalonList(data?.salons)
//         }

//         getSalonfnc()
//     }, [LoggedInMiddleware?.user])

//     const [chooseSalonId, setChooseSalonId] = useState("");

//     useEffect(() => {
//         const getSalonfnc = async () => {
//             const { data } = await api.post("/api/admin/getDefaultSalonByAdmin", {
//                 adminEmail: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email
//             })

//             setChooseSalonId(data?.response?.salonId)
//         }

//         getSalonfnc()
//     }, [LoggedInMiddleware?.user])

//     const applySalonData = {
//         salonId: Number(chooseSalonId),
//         adminEmail: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email
//     }

//     const applySalonHandler = async () => {
//         if (Number(chooseSalonId) == 0 || LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId == Number(chooseSalonId)) {

//         } else {
//             const confirm = window.confirm("Are you sure ?")
//             if (confirm) {
//                 // dispatch(applySalonAction(applySalonData))
//             }
//         }

//     }

//     const navigate = useNavigate()
//     const dispatch = useDispatch()

//     const logoutHandler = async () => {
//         dispatch(AdminLogoutAction(navigate))
//     }

//     return (
//         <div className="main-container">
           

//             <h1>Dashboard</h1>
//             <button onClick={logoutHandler}>logout</button>
//         </div>
//     )
// }

// export default Sidebar




