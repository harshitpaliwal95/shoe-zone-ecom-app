import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./auth.css";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { ScrollToTop } from "../../hook/scrollToTop";
export function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState("password");

  const { setAuth } = useAuth();

  useEffect(ScrollToTop, []);

  const navigate = useNavigate();

  const logInHandler = async (email, password) => {
    const body = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post("/api/auth/login", body);
      localStorage.setItem("token", response.data.encodedToken);
      if (response.data.encodedToken) {
        toast.success("login Succesfully");
        setAuth((pre) => ({
          ...pre,
          token: response.data.encodedToken,
          isAuth: true,
          userName: pre.userName ?? "harshit",
          userEmail: email,
        }));
        setTimeout(() => {
          navigate("/");
        }, 1800);
      } else {
        toast.error("Wrong email or password try again!");
      }
    } catch (error) {
      toast.error("Unable To Login Try Again Later");
    }
  };

  return (
    <div>
      <main>
        <div className="form-container">
          <div className="form-info">
            <p className="heading-x-lg text-center">Login</p>
            <div className="form-input">
              <div className="input-box">
                <label className="text-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="demo@yahoo.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input-box">
                <label className="text-medium">Password</label>
                <input
                  type={showPassword}
                  name="password"
                  value={password}
                  placeholder="*******"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="btn-icon"
                  onClick={() =>
                    setShowPassword(
                      showPassword === "password" ? "text" : "password"
                    )
                  }
                >
                  <i
                    className={`bi bi-eye${
                      showPassword === "password" ? "" : "-slash"
                    }`}
                  ></i>
                </button>
              </div>

              <div className="form-btn">
                <button
                  className="btn btn-outline"
                  onClick={() => logInHandler(email, password)}
                >
                  Log In
                </button>
                <button
                  className="btn btn-outline guest-btn"
                  onClick={() => {
                    setEmail("user@gmail.com");
                    setPassword("123456");
                    logInHandler("user@gmail.com", "123456");
                  }}
                >
                  Log In As Guest
                </button>
              </div>
              <div className="new-ac">
                <Link to="/signup">
                  <p className="text-center">
                    Create new account
                    <i className="bi bi-chevron-compact-right"></i>
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
