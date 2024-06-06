import axios from "axios";
import { useEffect } from "react";
import { getCookie } from "../utils/cookieUtils";

export const OffCanvas = () => {
  // Dummy data for courses
  const courses = [
    { id: 1, name: "Course 1" },
    { id: 2, name: "Course 2" },
    { id: 3, name: "Course 3" },
    { id: 4, name: "Course 4" },
    { id: 5, name: "Course 5" },
  ];

  useEffect(() => {
    // const userId = getCookie("userid");
    // const fetchData = async () => {
    //   try {
    //     const response = axios.get("http://localhost:9090/api/enrolledVourse");
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();
  }, []);

  return (
    <div
      className="offcanvas offcanvas-start"
      tabIndex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">
          Courses List
        </h5>
      </div>
      <div className="offcanvas-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Course Name</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course.id}>
                <td>{index + 1}</td>
                <td>{course.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="dropdown mt-3">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
          >
            Dropdown button
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
