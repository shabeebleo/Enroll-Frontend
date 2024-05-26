import React, { useEffect, useState } from "react";

import axiosInstance from "../../utils/axiosInstances.js";
import StudentCoursesModal from "../Modal/Admin/StudentCoursesModal.jsx";
import Navbar from "../NavBar/NavBar.jsx";

function AdminStudentList() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState("");
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

  useEffect(() => {
    return () => {
      getAdminInfo();
    };
  }, []);
  
  useEffect(() => {
    const getAllStudents = async () => {
      try {
        const response = await axiosInstance.get("/admin/all-students");
        setStudents(response.data.students);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("An error occurred while fetching the students.");
      }
    };

    getAllStudents();
  }, []);

  console.log(students, "studentsstudents");
  // Function to open the modal and set the selected student
  const openStudentModal = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(false);
  };
  if (!adminInfo) {
    return null;
  }
  return (
    <>
      <Navbar userInfo={adminInfo} />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
          Student List
        </h2>
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
          <ul>
            {students.map((student) => (
              <li
                key={student.id}
                className="border-b border-gray-200 py-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {student.username}
                  </h3>
                  <p className="text-gray-600">{student.email}</p>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => openStudentModal(student)}
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        </div>
        {isModalOpen && (
          <StudentCoursesModal student={selectedStudent} onClose={closeModal} />
        )}
      </div>
    </>
  );
}

export default AdminStudentList;
