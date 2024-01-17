import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { AdminForgetPasswordReducer, AdminLoginReducer, AdminLogoutReducer, AdminRegisterReducer, AdminResetPasswordReducer, LoggedInMiddlewareReducer, LoggedOutMiddlewareReducer } from "./Reducers/Admin/AuthReducer";
import { barberLoginReducer, barberLogoutReducer, barberRegisterReducer,BarberLoggedInMiddlewareReducer, BarberLoggedOutMiddlewareReducer, BarberGoogleLoginReducer } from "./Reducers/Barber/BarberReducer";


const rootReducer = combineReducers({
    //ADMIN REDUCERS
    AdminLogin:AdminLoginReducer,
    AdminRegister:AdminRegisterReducer,
    AdminForgetPassword:AdminForgetPasswordReducer,
    AdminResetPassword:AdminResetPasswordReducer,
    AdminLogout:AdminLogoutReducer,
    LoggedInMiddleware:LoggedInMiddlewareReducer,
    LoggedOutMiddleware:LoggedOutMiddlewareReducer,


    //BARBER REDUCERS
    barberLogin:barberLoginReducer,
    barberRegister:barberRegisterReducer,
    barberLogout:barberLogoutReducer,
    BarberLoggedInMiddleware:BarberLoggedInMiddlewareReducer,
    BarberLoggedOutMiddleware:BarberLoggedOutMiddlewareReducer,
    BarberGoogleLogin:BarberGoogleLoginReducer
});

const initialState = {};

const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer, 
  preloadedState: initialState,
  middleware: [...middleware],
});

export default store;