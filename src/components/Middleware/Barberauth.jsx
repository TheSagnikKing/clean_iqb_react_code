import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BarberLoggedInMiddlewareAction, BarberLoggedOutMiddlewareAction } from '../Redux/Actions/Barber/AuthAction'


const Barberauth = ({ children }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(BarberLoggedOutMiddlewareAction(navigate))
    }, [dispatch])

    useEffect(() => {
        dispatch(BarberLoggedInMiddlewareAction(navigate))
    },[dispatch])

    return (
        <div>{children}</div>
    )
}

export default Barberauth