import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCookie, setCookie } from "../utils/cookieUtils";

export const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);

  const isAdmin = getCookie("isadmin");
  // Check login status on component mount
  useEffect(() => {
    const userId = getCookie("userid");
    if (userId) {
      setIsLogin(true);
    }
  }, [isLogin]);

  // handle logout
  function handleLogout() {
    setCookie("email", "");
    setCookie("userid", "");
    setIsLogin(false);
    // navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark text-white py-3">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold text-white" to="/">
            E-Learning
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link fw-bold px-3 active text-white"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link fw-bold px-3 text-white"
                  to="/adminlogin"
                >
                  Create a Course
                </Link>
              </li>
              <li className="nav-item">
                <form className="d-flex" method="post" action="index.php">
                  <input
                    className="form-control mx-2 border border-1 border-dark"
                    type="text"
                    placeholder="Search by Name"
                    aria-label="Search"
                    name="search"
                  />
                  {/* <button
                    className="btn btn-info mx-2 btn-dark"
                    type="search"
                    value="search"
                    name="action"
                  >
                    Search
                  </button> */}
                </form>
              </li>
              {/* {isLogin ? ( */}
              {/* //handle logout functionality */}
              {
                /**when user is not admin show my learnings */
                !isAdmin && (
                  <li>
                    <button
                      className="btn btn-outline-light me-2"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasExample"
                      aria-controls="offcanvasExample"
                    >
                      My Learnings
                    </button>
                  </li>
                )
              }
              {isLogin && (
                <li className="nav-item">
                  <Link to="/login">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      Logout
                    </button>
                  </Link>
                </li>
              )}
              {!isLogin && (
                <li className="nav-item">
                  <Link
                    to="/login"
                    type="button"
                    id="login-user-btn"
                    className="btn btn-light"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
