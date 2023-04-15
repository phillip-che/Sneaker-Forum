import { Link } from "react-router-dom";
import { supabase } from '../client';
import { useEffect, useState } from "react";
import home from '../assets/home.png'
import create from '../assets/create.png'
import log_in from '../assets/login.png'
import log_out from '../assets/logout.png'

const NavBar = () => {

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(session)
      if(session) {
        setAuth(true);
        console.log(event)
        // if(event ==="SIGNED_IN") {
        //   window.location = "/";
        // }
      }
    })
  }, []);

  const logout = async () => {
    await supabase.auth
    .signOut()
    .then((error) => {
      setAuth(false);
      window.location = "/";
    });
  }

  const loginAlert = () => {
    if(!auth) {
      window.alert("Must be logged in first!")
    }
  }

  return (
    <div className="nav-bar">
      <h3 className="">Sole Exchange</h3>
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
