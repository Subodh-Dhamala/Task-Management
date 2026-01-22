import { useContext } from "react";
import {AuthContext} from '../context/AuthContext';

const Dashboard =() =>{
  const {user,logout} = useContext(AuthContext);

  return(
    <>
        <h1>Dashboard</h1>
      {user && <p>Welcome, {user.username}!</p>}
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default Dashboard;