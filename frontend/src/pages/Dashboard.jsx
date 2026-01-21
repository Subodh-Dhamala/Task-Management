import { useContext } from "react";
import {AuthContext} from '../context/AuthContext';

const Dashboard =() =>{
  const {user,logout} = useContext(AuthContext);

  return(
    <>

    <p>HELLO WELCOME TO DASHBOARD!</p>
    </>
  )
}

export default Dashboard;