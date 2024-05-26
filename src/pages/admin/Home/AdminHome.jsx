import React, { useEffect, useState } from "react";
import Navbar from "../../../components/NavBar/NavBar";
import axiosInstance from "../../../utils/axiosInstances";
import AdminCourseList from "../../../components/List/AdminCourseList";

function AdminHome() {
  const [adminInfo, setAdminInfo] = useState("");
  const [courses, setCourses] = useState([]);

  //fetching user details
  const getAdminInfo = async () => {
    try {
      const response = await axiosInstance.get("/admin/get-admin");
      console.log(response, "rsponse");
      if (response && response.data && response.data.user) {
        setAdminInfo(response.data.user);
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
        const response = await axiosInstance.get("/admin/allCourses");
        if (response && response.data) {
          setCourses(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
  

  useEffect(() => {
    return () => {
      getAdminInfo();
    };
  }, []);
  useEffect(() => {
    getCourses();
  }, []);
  if (!adminInfo) {
    return null;
  }
  console.log(courses, "courses");
  return (
    <div>
      <Navbar userInfo={adminInfo} />
      <div className="container w-full mx-auto mt-3">
        <AdminCourseList  courses={courses} setCourses={setCourses} />
      </div>
    </div>
  );
}

export default AdminHome;
