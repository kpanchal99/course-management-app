import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "../utils/cookieUtils";

export const OffCanvas = () => {
  // State to store the courses data
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch user ID from the cookie
    const userId = getCookie("userid");

    const fetchData = async () => {
      try {
        // Fetch courses data by user ID
        const response = await axios.get(
          `http://localhost:9090/api/coursesByUserId?userId=${userId}`
        );
        setCourses(response.data); // Set fetched courses data to the state
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    if (userId) {
      fetchData();
    }
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
          Enrolled Courses List
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
                <td>{course.courseName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
