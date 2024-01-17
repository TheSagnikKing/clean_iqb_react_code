import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoggedInMiddlewareAction, LoggedOutMiddlewareAction } from '../Redux/Actions/Admin/AuthAction'

const Auth = ({ children }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(LoggedOutMiddlewareAction(navigate))
    }, [])

    useEffect(() => {
        dispatch(LoggedInMiddlewareAction())
    })

    // useEffect(() => {
    //     console.log("yes Auth is working")
    // },[])

    return (
        <div>{children}</div>
    )
}

export default Auth