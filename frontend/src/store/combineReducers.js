import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice"
import courseReducer from "../slices/courseSlice"
import profileReducer from "../slices/profileSlice"


const rootReducer = combineReducers( { 
    auth : authReducer, 
    profile : profileReducer, 
    course : courseReducer ,
})
export default rootReducer