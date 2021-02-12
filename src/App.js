import React from "react";
import data from "./data"
import UserComponent from './userList'

class App extends React.Component  {  
   constructor () {
      super ()
      
   }

  render () {

  return (

    <React.Fragment>
     
      <UserComponent/>

    </React.Fragment>
      
    );
}
}
export default App;
