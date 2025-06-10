
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

 

const store = configureStore({
  reducer: rootReducer, 
  name:"name"
});

export default store;
