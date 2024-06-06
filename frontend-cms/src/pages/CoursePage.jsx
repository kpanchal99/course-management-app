import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { getCookie } from "../utils/cookieUtils";
import courseCardImg1 from '../assets/c1.avif'
import courseCardImg2 from '../assets/c2.avif'
import courseCardImg3 from '../assets/c3.avif'
import courseCardImg4 from '../assets/c4.avif'
import courseCardImg5 from '../assets/c5.avif'
import { Footer } from "../components/Footer";

const images = [
  courseCardImg1,
  courseCardImg2,
  courseCardImg3,
  courseCardImg4,
  courseCardImg5
];

const getRandomImage = () => {
  return images[Math.floor(Math.random() * images.length)];
};

export const CoursePage = () => {
  //  id route parameter
  const [course, setCourse] = useState({});
  const [randomImage, setRandomImage] = useState(getRandomImage());
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
        alert("Enrolled Successfully")
        // notify();
        navigate("/");
      } else {
        console.log("enroll failed");
        alert("Enrolled Failed")
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
      <Header/>
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5" style={{height:'65vh'}}>
          <div className="py-5"></div>
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
            <img
                className="h-100 mb-5 mb-md-0 w-100 img-fluid rounded"
                src={randomImage}
                alt="Course"
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
              <p className="fs-5">{course.courseDescription}</p>
              <p className="fs-5">Tutor : {course.teacherName}</p>
              <p className="fs-5">Duration : {course.no_of_weeks} weeks</p>

              <div className="d-flex">
                <button
                  className="btn btn-dark flex-shrink-0 w-25"
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
      <div className="py-2"></div>
      <Footer/>
    </>
  );
};
