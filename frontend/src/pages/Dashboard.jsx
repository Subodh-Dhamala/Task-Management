import { useContext } from "react";
import {AuthContext} from '../context/AuthContext';
import '../styles/dashboard.css';

const Dashboard =() =>{
  const {user,logout} = useContext(AuthContext);

  return(
    <div>
        <h1>Dashboard</h1>
      {user && <p>Welcome, {user.username}!</p>}
      <button onClick={logout}>Logout</button>
      <p>Bistarai Bistarai vai halxa ni bhai..hatar kina gareko!</p>
    </div>
  )
}

export default Dashboard;