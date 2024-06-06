import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/api/getCourseList"
        );
        console.log(response.data);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  function handleApplyJob(courseId) {
    console.log(`Applying for course with id: ${courseId}`);
    navigate("/course/" + courseId);
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 py-2">
            <div className="bg-light rounded">
              <div className="row p-md-5">
                <h3>All Courses</h3>

                {courses.map((course, i) => (
                  <div
                    key={i}
                    className="col-md-4 py-2 d-flex flex-row justify-content-center"
                  >
                    <div className="card border-1 border-dark">
                      <div className="card-body h-150">
                        <h5 className="card-title text-decoration-underline">
                          {course.courseName}
                        </h5>
                        <p className="card-text h-10">
                          <b>Description: </b>
                          {course.description}
                        </p>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <b>Teacher Name: </b>
                          {course.teacherName}
                        </li>
                        <li className="list-group-item">
                          <b>Skills Required: </b>
                          {course.skills}
                        </li>
                        <li className="list-group-item">
                          <b>Price: </b>
                          {course.price}
                        </li>
                        <li className="list-group-item">
                          <b>isActive: </b>
                          {course.isActive ? "Yes" : "No"}
                        </li>
                        <li className="list-group-item">
                          <b>Online: </b>
                          {course.online ? "Yes" : "No"}
                        </li>
                      </ul>
                      <div className="card-body">
                        <button
                          className="card-link btn btn-outline-dark"
                          onClick={() => handleApplyJob(course.courseId)}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* not important */}
          <div className="col-lg-12 py-2">
            <div className="bg-light rounded">
              <div className="row p-md-5">
                <h3>Recommended Courses</h3>
                <div className="col-12 py-2">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">job_title</h5>
                      <p className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the cards content.
                      </p>
                      <a href="#" className="btn btn-outline-dark">
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
