import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstances";
import Navbar from "../../components/NavBar/NavBar";
import CourseCard from "../../components/Cards/CourseCard";
import CourseList from "../../components/List/CourseList";

function Home() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

 
  //fetching user details
  const getuserInfo = async () => {
    try {
      const response = await axiosInstance.get("/student/get-user");
      if (response && response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status === 404) {
        localStorage.clear("token");
        navigate("/login");
      }
    }
  };

  //fetching course details
  const getCourses = async () => {
    try {
      const response = await axiosInstance.get("/student/allCourses");
      if (response && response.data) {
        setCourses(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  //fetching enrolled course details
  const getEnrolledCourses = async () => {
    try {
      const response = await axiosInstance.get("/student/enrolled-Courses");
      if (response && response.data) {
        setEnrolledCourses(response.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  useEffect(() => {
    return () => {
      getuserInfo();
    };
  }, []);

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    getEnrolledCourses();
  }, []);
  console.log(userInfo, "userInfoooo");
  if (!userInfo) {
    return null;
  }
  console.log(courses, "courses");
  console.log(enrolledCourses, "enrolledCourses");

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto ">
        <div className="grid grid-cols-3 gap-3 mt-8">
          {enrolledCourses.map((enrolledCourse, index) => {
            return (
              <CourseCard
                key={index}
                enrollId={enrolledCourse?._id}
                title={enrolledCourse?.course.title}
                description={enrolledCourse?.course.description}
                instructor={enrolledCourse?.course.instructor}
                status={enrolledCourse?.status}
                setEnrolledCourses={setEnrolledCourses}
                enrolledCourses={enrolledCourses}
                fee={enrolledCourse?.course?.fee}
              />
            );
          })}
        </div>
      </div>
      <div className="container w-full mx-auto mt-3">
        <CourseList
       
          courses={courses}
          setEnrolledCourses={setEnrolledCourses}
          enrolledCourses={enrolledCourses}
        />
      </div>
    </>
  );
}

export default Home;
