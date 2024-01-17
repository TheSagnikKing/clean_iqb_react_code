import React, { useEffect, useState } from 'react'
import { FiMenu, FiSettings } from 'react-icons/fi'
import { BiLogOutCircle, BiSearch } from 'react-icons/bi'
import { IoHome, IoNotificationsOutline } from 'react-icons/io5'
import { RiAccountCircleFill, RiUserSettingsLine } from 'react-icons/ri'
import { MdKeyboardArrowDown, MdOutlineMessage } from 'react-icons/md'
import { IoIosAnalytics } from 'react-icons/io'
import { BsCart2 } from 'react-icons/bs'
import { AiFillHeart, AiFillSetting, AiFillFile } from 'react-icons/ai'
import { CiSearch } from "react-icons/ci"
import "./sidebar.css"
import { useLocation,Link,useNavigate } from 'react-router-dom'
import { FaCamera, FaUserCircle } from "react-icons/fa"

import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import api from '../Redux/api/Api'
import { AdminLogoutAction } from '../Redux/Actions/Admin/AuthAction'

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

    // console.log(menudata)


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

    const LoggedInMiddleware = useSelector(state => state.LoggedInMiddleware)

    const [dropdown, setDropdown] = useState(false)

    const [salonList, setSalonList] = useState([])

    useEffect(() => {
        const getSalonfnc = async () => {
            const { data } = await api.post("/api/admin/getAllSalonsByAdmin", {
                adminEmail: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email
            })
            setSalonList(data?.salons)
        }

        getSalonfnc()
    }, [LoggedInMiddleware?.user])

    const [chooseSalonId, setChooseSalonId] = useState("");

    useEffect(() => {
        const getSalonfnc = async () => {
            const { data } = await api.post("/api/admin/getDefaultSalonByAdmin", {
                adminEmail: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email
            })

            setChooseSalonId(data?.response?.salonId)
        }

        getSalonfnc()
    }, [LoggedInMiddleware?.user])

    const applySalonData = {
        salonId: Number(chooseSalonId),
        adminEmail: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email
    }

    const applySalonHandler = async () => {
        if (Number(chooseSalonId) == 0 || LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId == Number(chooseSalonId)) {

        } else {
            const confirm = window.confirm("Are you sure ?")
            if (confirm) {
                // dispatch(applySalonAction(applySalonData))
            }
        }

    }

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logoutHandler = async () => {
        dispatch(AdminLogoutAction(navigate))
    }

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
                <div className="navright">
                    <div className="navright_left_div">
                        <b style={{ color: "rgba(0,0,0,0.6)" }}>{title}</b>
                    </div>

                    <div className="navright_right_div">

                        <div style={{
                            display: "flex",
                            gap: "10px"
                        }}>
                            <label htmlFor="cars">Choose Salon</label>

                            <select
                                name="cars"
                                id="cars"
                                value={chooseSalonId}
                                onChange={(e) => setChooseSalonId(e.target.value)}
                            >
                                {salonList && salonList.map((s, i) => (
                                    <option value={s.salonId} key={i} style={{
                                        backgroundColor: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId === s.salonId ? "green" : "",
                                        color: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId === s.salonId ? "#fff" : "black"
                                    }}>
                                        {s.salonName}
                                    </option>
                                ))}
                            </select>

                            <button onClick={applySalonHandler}>Apply</button>
                        </div>

                        <div className="navsearch_box">
                            <div>
                                <CiSearch />
                            </div>

                            <input type="text" placeholder='Search...' />
                        </div>

                        <div className="navnotification">
                            <IoNotificationsOutline />
                        </div>

                        {/* profile_div */}
                        <div className="navprofile">
                            <div className="navimage">
                                {/* <FaUserCircle />dsvdsv */}
                                <div className='ad-profile-image'>
                                    {/* <img src={
                                        setprofilepic
                                            ? setprofilepic
                                            : LoggedInMiddleware?.user &&
                                                LoggedInMiddleware.user[0]?.profile &&
                                                LoggedInMiddleware.user[0].profile[0]?.url
                                                ? LoggedInMiddleware.user[0].profile[0].url
                                                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                    } alt="" /> */}
                                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                                </div>

                                <div className='ad-profile-image-camera'>
                                    {/* <button onClick={() => imgDeleteHandler()}><MdDelete /></button> */}
                                    <button onClick={() => handleEditButtonClick()}><FaCamera /></button>
                                    <input
                                        type="file"
                                        // ref={fileInputRef}
                                        style={{ display: 'none' }}
                                    // onChange={handleFileInputChange}
                                    />
                                </div>
                            </div>

                            <div className="navprofile_detail">
                                <b>Sagnik</b>
                                <p>Admin</p>
                            </div>

                            <div style={{ cursor: "pointer" }} className="navright_dropdown"
                            onClick={() => setDropdown(!dropdown)}>
                            
                                <MdKeyboardArrowDown />
                            </div>

                            {
                                dropdown && <div className="navright_dropdown_box">
                                    <div>
                                        <div><FiSettings /></div>
                                        <p>Settings</p>
                                    </div>

                                    <div>
                                        <div><RiAccountCircleFill /></div>
                                        <Link to="/admin/updateprofile">My Account</Link>
                                    </div>

                                    <div onClick={logoutHandler}>
                                        <div><BiLogOutCircle /></div>
                                        <p>Logout</p>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>

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




