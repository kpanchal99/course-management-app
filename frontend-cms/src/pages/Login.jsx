import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCookie } from "../utils/cookieUtils";

export const Login = ({ isAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Initialize the navigate function
  const handleSignIn = (e) => {
    e.preventDefault();

    // Payload for the POST request
    const payload = {
      email: email,
      password: password,
      isAdmin: isAdmin,
    };

    axios
      .post("http://localhost:9090/api/login", payload)
      .then((response) => {
        // Handle successful response
        console.log("Login successful:", response.data);
        setCookie("email", response.data.email);
        setCookie("userid", response.data.id);
        {
          response.data.isAdmin == true && navigate("/adminhome");
        }
        {
          response.data.isAdmin == false && navigate("/");
        }
        // store data in cookie
        // redirect to home page <App/> path=/
      })
      .catch((error) => {
        // Handle error
        console.error("Login error:", error.response.data);
        alert("Login Error, Check Credentials")
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
      <div className="col-4">
        <div className="card login-form border-0 p-4 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-center pb-3">
              Log In {isAdmin && "Admin"}
            </h3>
            <div className="card-text ">
              <form>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control my-2"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control my-3"
                    id="exampleInputPassword1"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
               <div className="d-flex justify-content-center my-2">
               <button
                  type="submit"
                  className="btn btn-dark btn-block"
                  onClick={handleSignIn}
                >
                  Log In
                </button>
               </div>
                <div className="sign-up text-muted text-center">
                  Don't have an account? <Link to="/Signup">Create One</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
