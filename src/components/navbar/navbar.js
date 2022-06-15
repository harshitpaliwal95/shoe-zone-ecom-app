import logo from "../../assets/nav-logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFilter } from "../../context/filterContext";
import { useAuth } from "../../context";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import "./navbar.css";

const Navbar = () => {
  const { dispatch } = useFilter();
  const {
    auth: { isAuth },
    setAuth,
  } = useAuth();

  const logOutHandler = () => {
    toast.success("Logout Succesfully");
    localStorage.removeItem("token");
    setAuth(() => ({
      token: "",
      isAuth: false,
    }));
  };

  const [dropDown, setDropDown] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setDropDown(false), [pathname, isAuth]);

  const navigate = useNavigate();
  return (
    <div>
      <header>
        <div className="user-ac"></div>
        <nav className="navbar">
          <div className="left-nav">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo img" />
              </Link>
            </div>
          </div>

          <ul className="nav-center">
            <li
              onClick={() => {
                navigate("/product");
                dispatch({ type: "FILTER", payload: "" });
              }}
            >
              Shop Now
            </li>
            <li
              onClick={() => {
                navigate("/product");
                dispatch({ type: "FILTER", payload: "man" });
              }}
            >
              Man
            </li>
            <li
              onClick={() => {
                navigate("/product");
                dispatch({ type: "FILTER", payload: "women" });
              }}
            >
              Women
            </li>
            <li
              onClick={() => {
                navigate("/product");
                dispatch({ type: "FILTER", payload: "kid" });
              }}
            >
              Kids
            </li>
          </ul>
          <div className="right-nav">
            <div className="search-navbar">
              <input
                type="text"
                placeholder="Search"
                onChange={(e) =>
                  dispatch({ type: "SEARCH", payload: e.target.value })
                }
              />
              <button className="btn-icon">
                <i className="bi bi-search"></i>
              </button>
            </div>

            <div>
              <button className="btn-icon">
                <Link to="/wishlist">
                  <i className="bi bi-heart"></i>
                </Link>
              </button>
              <button className="btn-icon">
                <Link to="/cart">
                  <i className="bi bi-cart"></i>
                </Link>
              </button>
              <button
                className="bi bi-person btn-icon"
                onClick={() => setDropDown((pre) => (pre ? false : true))}
              ></button>
              <div className={`drop-box ${dropDown ? "show-box" : ""}`}>
                {isAuth ? (
                  <p onClick={() => logOutHandler()}>Logout</p>
                ) : (
                  <>
                    <Link to="/login">
                      <p>Login</p>
                    </Link>
                    <Link to="/signup">
                      <p>SignUp</p>
                    </Link>
                  </>
                )}
              </div>
              <button className="btn-icon burger">
                <i className="bi bi-list"></i>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export { Navbar };
