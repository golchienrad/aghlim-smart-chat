import { combineReducers } from "@reduxjs/toolkit";
import allAdvertiseSlice from "../slices/allAdvertise/allAdvertiseSlice";


const rootReducer = combineReducers({
 allAdvertse:allAdvertiseSlice ,
});

export default rootReducer;
