import React, { memo, useEffect, useState } from 'react'
import "./Header.css"
import { useSelector } from 'react-redux'
import { Link} from 'react-router-dom'
import { AdminLogoutAction } from '../../Redux/Actions/Admin/AuthAction'
import { CiSearch } from 'react-icons/ci'
import { IoNotificationsOutline } from 'react-icons/io5'
import { FaCamera } from 'react-icons/fa'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { FiSettings } from 'react-icons/fi'
import { RiAccountCircleFill } from 'react-icons/ri'
import { BiLogOutCircle } from 'react-icons/bi'
import api from '../../Redux/api/Api'

const Header = memo(({ title,navigate,dispatch }) => {

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

            setChooseSalonId(Number(data?.response?.salonId))
        }

        getSalonfnc()
    }, [LoggedInMiddleware?.user])

    const applySalonData = {
        salonId: Number(chooseSalonId),
        adminEmail: LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].email
    }

    const applySalonHandler = async () => {
        if (Number(chooseSalonId) == 0 || Number(LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].salonId) == Number(chooseSalonId)) {

        } else {
            const confirm = window.confirm("Are you sure ?")
            if (confirm) {
                // dispatch(applySalonAction(applySalonData))
            }
        }

    }



const logoutHandler = async () => {
    dispatch(AdminLogoutAction(navigate))
}
return (
    <div className="navright">
    {console.log("Rendering admin header")}
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
                            backgroundColor: LoggedInMiddleware?.user && Number(LoggedInMiddleware?.user[0].salonId) === Number(s.salonId) ? "green" : "",
                            color: LoggedInMiddleware?.user && Number(LoggedInMiddleware?.user[0].salonId) === Number(s.salonId) ? "#fff" : "black"
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
                    <b>{LoggedInMiddleware?.user && LoggedInMiddleware?.user[0].name}</b>
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
)
})

export default Header



