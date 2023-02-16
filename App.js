import React, { useState } from "react";
import MainStack from "./navigation/MainStack";
import { store } from './redux/store';
import { Provider } from "react-redux";

export default function App() {

  return (  
       <> 
        <Provider store={store}>
            <MainStack />
        </Provider>
       </> 
  );
}



