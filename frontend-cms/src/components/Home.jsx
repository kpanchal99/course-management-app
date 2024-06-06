import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseImg from '../assets/recommendedCourses.avif'
import CourseImg2 from '../assets/course2.avif'
import courseCardImg1 from '../assets/c1.avif'
import courseCardImg2 from '../assets/c2.avif'
import courseCardImg3 from '../assets/c3.avif'
import courseCardImg4 from '../assets/c4.avif'
import courseCardImg5 from '../assets/c5.avif'

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
                    className="col-md-3 py-2 d-flex flex-row justify-content-center"
                  >
                    <div className="card border-1 w-100">
                      <img src={getRandomImage()} className="img-fluid h-50 card-img-top" alt="Course" />
                      <div className="card-body">

                        <h4 className="card-title fw-bold">
                          {course.courseName}
                        </h4>
                        <div className="h-25">
                          <p className="card-text mb-2">
                            {course.courseDescription}
                          </p>
                        </div>
                        <div className="">
                          <p className="card-text">
                            <span className="fw-semibold">Tutor : </span>{course.teacherName}
                          </p>
                            <p className="card-text">
                            <span className="fw-semibold">Price : </span>₹{course.coursePrice} 
                            </p>
                            <p className="card-text">
                            <span className="fw-semibold">Duration : </span>{course.no_of_weeks} weeks
                            </p>
                          
                        </div>
                      </div>

                      {/* <ul className="list-group ">
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
                        </ul> */}
                      <div className="p-3">
                        <button
                          className="card-link btn btn-outline-dark w-100"
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
                <div className="col-md-6 py-2">
                  <div class="card mb-3">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src={CourseImg} class="img-fluid rounded-start h-100" alt="..." />
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">Introduction to Java</h5>
                          <p class="card-text">This beginner-friendly course covers the fundamentals of Java, including syntax, object-oriented programming, and basic algorithms. Through hands-on exercises and real-world projects, you'll learn to develop robust Java applications and build a solid foundation in programming.</p>
                          <a href="#" className="btn btn-dark">
                            Read More
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 py-2">
                  <div class="card mb-3">
                    <div class="row g-0">
                      <div class="col-md-4">
                        <img src={CourseImg2} class="img-fluid rounded-start h-100" alt="..." />
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">Full Stack Web Development</h5>
                          <p class="card-text">Learn to build dynamic, responsive websites and powerful web applications in our Full Stack Web Development course. Master front-end and back-end technologies, including HTML, CSS, JavaScript, Node.js, and databases like MongoDB.</p>
                          <a href="#" className="btn btn-dark">
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

        </div>
      </div>
    </>
  );
};
