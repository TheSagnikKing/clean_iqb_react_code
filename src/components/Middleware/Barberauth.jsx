import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BarberLoggedInMiddlewareAction, BarberLoggedOutMiddlewareAction } from '../Redux/Actions/Barber/AuthAction'


const Barberauth = ({ children }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(BarberLoggedOutMiddlewareAction(navigate))
    }, [])

    useEffect(() => {
        dispatch(BarberLoggedInMiddlewareAction())
    })

    return (
        <div>{children}</div>
    )
}

export default Barberauth