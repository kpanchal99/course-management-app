import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { getCookie } from "../utils/cookieUtils";

export const CoursePage = () => {
  //  id route parameter
  const [course, setCourse] = useState({});

  const { id } = useParams(); // Use the
  const navigate = useNavigate();
  const handleEnrollCourse = async () => {
    const userId = getCookie("userid");
    try {
      const payload = {
        userId: userId,
        courseId: id,
      };
      console.log("payload", payload);
      const response = await axios.post(
        "http://localhost:9090/api/enroll",
        payload
      );

      if (response.data.status === "success") {
        console.log("enroll success");
        // notify();
        navigate("/");
      } else {
        console.log("enroll failed");
      }
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/api/getCourseById?courseId=" + id
        );
        console.log(response.data);
        setCourse(response.data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Header></Header>
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg"
                alt="..."
              />
            </div>
            <div className="col-md-6">
              {/* <div className="small mb-1">SKU: BST-498</div> */}
              <h1 className="display-5 fw-bolder">{course.courseName}</h1>
              <div className="fs-5 mb-5">
                <span className="text-decoration-line-through">
                  ₹{course.coursePrice * 100.0}
                </span>
                <span>₹{course.coursePrice}</span>
              </div>
              <p className="lead">{course.teacherName}</p>
              <p className="lead">{course.courseDescription}</p>
              <p className="lead">Duration : {course.no_of_weeks} weeks</p>

              <div className="d-flex">
                <button
                  className="btn btn-outline-dark flex-shrink-0"
                  type="button"
                  onClick={() => handleEnrollCourse()}
                >
                  Enroll
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
