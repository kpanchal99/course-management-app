import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Signup = ({ isAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error("Passwords do not match!");
      // Display an error message to the user
      return;
    }

    // Payload for the POST request
    const payload = {
      email: email,
      password: password,
      isAdmin: isAdmin,
    };

    axios
      .post("http://localhost:9090/api/register", payload)
      .then((response) => {
        // Handle successful response
        console.log("Signup successful:", response.data);
        // 
        // store data in cookie
        // redirect to home page <App/> path=/
        setCookie("email", response.data.email);
        setCookie("userid", response.data.id);
        navigate("/")
      })
      .catch((error) => {
        // Handle error
        console.error("Signup error:", error.response.data);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
      <div className="col-4">
        <div className="card login-form border-0 p-4 shadow-lg">
          <div className="card-body">
            <h3 className="card-title text-center pb-3">Sign Up</h3>
            <div className="card-text">
              <form>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control my-2"
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
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control my-3"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-center my-2">
                <button
                  type="submit"
                  className="btn btn-dark btn-block"
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
                </div>
                <div className="sign-up text-center text-muted">
                  Already have an account? <Link to="/login">Log In</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
