import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { AdminForgetPasswordReducer, AdminLoginReducer, AdminLogoutReducer, AdminRegisterReducer, AdminResetPasswordReducer, LoggedInMiddlewareReducer, LoggedOutMiddlewareReducer } from "./Reducers/Admin/AuthReducer";
import { BarberLoggedInMiddlewareReducer, BarberLoggedOutMiddlewareReducer, BarberGoogleLoginReducer, BarberLoginReducer, BarberRegisterReducer, BarberLogoutReducer } from "./Reducers/Barber/BarberReducer";


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
    BarberLogin:BarberLoginReducer,
    BarberRegister:BarberRegisterReducer,
    BarberLogout:BarberLogoutReducer,
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