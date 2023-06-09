import { Link } from "react-router-dom";
import { supabase } from '../client';
import { useEffect, useState } from "react";
import home from '../assets/home.png'
import create from '../assets/create.png'
import log_in from '../assets/login.png'
import log_out from '../assets/logout.png'
import logo from '../assets/logo.png'

const NavBar = () => {

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if(session) {
        setAuth(true);
      }
    })
  }, []);

  const logout = async () => {
    await supabase.auth
    .signOut()
    .then((error) => {
      setAuth(false);
      window.location = "/";
      window.location.reload();
    });
  }

  const loginAlert = () => {
    if(!auth) {
      window.alert("Must be logged in first!")
    }
  }

  return (
    <div className="nav-bar">
      <div className="header">
        <h3 className="">Sole Exchange</h3>
        <img className="logo" src={logo} />
      </div>    
      <ul id="nav">
        <Link to="/">
          <li>
            <img width="25px" src={home} />
          </li>
          Home
        </Link>
        <Link to={auth ? "/create" : "/login"} onClick={loginAlert}>
          <li><img width="25px" src={create} /></li>
          Create
        </Link>
        {auth ? (
          <div>
            <img width="25px" src={log_out} onClick={logout} />
            <li className="logout" onClick={logout} >Logout</li>
          </div>
        ) : (
          <Link to="/login">
            <img width="25px" src={log_in} />
            <li>Login</li>
          </Link>
        ) }
      </ul>
    </div>
  );
};

export default NavBar;
