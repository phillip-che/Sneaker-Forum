import { Link } from "react-router-dom";
import { supabase } from '../client';
import { useEffect, useState } from "react";

const NavBar = () => {

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event)
      if(event ==="SIGNED_IN") {
        setAuth(true);
        // window.location = "/";
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
          <li>Home</li>
        </Link>
        <Link to={auth ? "/create" : "/login"} onClick={loginAlert}>
          <li>Create</li>
        </Link>
        {auth ? (
          <div>
            <li className="logout" onClick={logout} >Logout</li>
          </div>
        ) : (
          <Link to="/login">
            <li>Login</li>
          </Link>
        ) }
      </ul>
    </div>
  );
};

export default NavBar;
