import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";




function Header() {
  const { isLoggedIn, setAuth } = useContext(AuthContext);
  const history = useHistory();

   const logout = () => {
    setAuth(null);
    history.push("/login");
  };


  return (
    <div>
      <div className="loginFormHeaderDiv">
        <div>
          <h1>FRIENDS DATABASE</h1>
        </div>
        <div className="loginFormHeaderButtonDiv">
         {!isLoggedIn() ? (
          <button onClick={() => history.push("/login")}>LOGIN</button>
        ) : (
          <div>
            <button  onClick={() => history.push("/")}>FRIENDS LIST</button>
            <button  onClick={() => history.push("/friends/add")}>ADD FRIEND</button>
            <button  onClick={logout}>LOGOUT</button>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default Header;
