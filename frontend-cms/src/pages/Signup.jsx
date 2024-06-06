import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Signup = ({ isAdmin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

        // store data in cookie
        // redirect to home page <App/> path=/
      })
      .catch((error) => {
        // Handle error
        console.error("Signup error:", error.response.data);
      });
  };

  return (
    <div className="container d-flex justify-content-center">
      <div className="w-50 ">
        <div className="card login-form border-1 ">
          <div className="card-body">
            <h3 className="card-title text-center">Sign Up to Codepen</h3>
            <div className="card-text">
              <form>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-sm"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-sm"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-sm"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  onClick={handleSignUp}
                >
                  Sign up
                </button>
                <div className="sign-up">
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
