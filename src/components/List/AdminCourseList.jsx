import React, { useState } from "react";
import Modal from "react-modal";
import axiosInstance from "../../utils/axiosInstances"; // Import your axios instance
import EditCourse from "../EditCourse/EditCourse";
import { useNavigate } from "react-router-dom";

function AdminCourseList({ courses, setCourses }) {
    const navigate=useNavigate()
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isLatestVersion, setIsLatestVersion] = useState(false);
  const [editCourseData, setEditCourseData] = useState(null);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
  });

  const onClose = () => {
    setOpenAddEditModal({
      isShown: false,
    });
  };

  const openModal = (course) => {
    setSelectedCourse(course);
    setIsLatestVersion(
      latestCourses[course.title]._id === course._id && course.active
    );
  };

  const openEditModal = (course) => {
    if(course){
        console.log(course, "course for editing");
        setEditCourseData(course);
        setOpenAddEditModal({
          isShown: true,
        });
    }else{
        console.log(course, "course for editing");
        setEditCourseData();
        setOpenAddEditModal({
          isShown: true,
        });
    }
   
  };
  const closeModal = () => {
    setSelectedCourse(null);
  };

  const deleteCourse = async (courseId) => {
    try {
      const response = await axiosInstance.delete(
        `/admin/delete-course/${courseId}`
      );
      if (response.status === 200) {
        // Update the active field of the deleted course to false
        const updatedCourses = courses.map((course) => {
          if (course._id === courseId) {
            return { ...course, active: false };
          }
          return course;
        });
        setCourses(updatedCourses);
        closeModal();
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };


  // Get the latest version for each course title
  const latestCourses = courses.reduce((acc, course) => {
    if (!acc[course.title] || acc[course.title].version < course.version) {
      acc[course.title] = course;
    }
    return acc;
  }, {});

  const handleStudentListClick = () => {
    console.log("")
    navigate('/admin/student-list');
  };
  return (
    <div className="p-4">
      <div className="flex items-center justify-around">
        <div>
          <h2 className="text-xl font-semibold mb-4">Admin Course List</h2>
        </div>
        <div>
          <button  onClick={() => openEditModal()}className="btn-primary max-w-15">
            create course
          </button>
        </div>
        <div>
          <button onClick={handleStudentListClick} className="btn-primary max-w-15">
            Student list
          </button>
        </div>
      </div>

      <ul>
        {courses.map((course) => (
          <li key={course._id} className="border-b border-gray-200 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-gray-500">Fee: {course.fee}</p>
                <p className="text-gray-500">Version: {course.version}</p>
                <p className="text-gray-500">
                  Active:{" "}
                  {course.active ? (
                    <span className="text-green-500">Yes</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </p>
              </div>

              <div>
                <button
                  onClick={() => openModal(course)}
                  className={`px-4 py-2 rounded mr-2 ${
                    course.active
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-gray-500 text-white"
                  }`}
                >
                  Details
                </button>

                <button
                  onClick={() => openEditModal(course)}
                  className="bg-blue-500 text-white px-4 py-2 mr-2 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedCourse && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          className="modal course-modal"
          overlayClassName="modal-overlay course-modal-overlay"
        >
          <h2 className="text-xl font-semibold mb-4">Course Details</h2>
          <h3 className="text-lg font-semibold">{selectedCourse.title}</h3>
          <p className="text-gray-500">Fee: {selectedCourse.fee}</p>
          <p className="text-gray-500">Version: {selectedCourse.version}</p>
          <p className="text-gray-500">
            Active: {selectedCourse.active ? "Yes" : "No"}
          </p>
          <p className="text-gray-500">
            Description: {selectedCourse.description}
          </p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={closeModal}
              className="mr-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Close
            </button>
            {isLatestVersion && (
              <button
                onClick={() => deleteCourse(selectedCourse._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            )}
          </div>
        </Modal>
      )}

      {openAddEditModal.isShown && (
        <Modal
          isOpen={openAddEditModal.isShown}
          onRequestClose={onClose}
          style={{
            overlay: {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          }}
          contentLabel="Edit Course"
          className="w-[40%] mx-auto overflow-auto max-h-3/4 bg-white mt-14 p-5"
        >
          <EditCourse
            editCourseData={editCourseData}
            onClose={onClose}
            courses={courses}
            setCourses={setCourses}
          />
        </Modal>
      )}
    </div>
  );
}

export default AdminCourseList;
