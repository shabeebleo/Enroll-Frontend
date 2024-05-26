import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axiosInstance from "../../utils/axiosInstances"; // Import your axios instance

function CourseList({ courses, setEnrolledCourses, enrolledCourses }) {
  console.log(courses, ".....", enrolledCourses,".....");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const openModal = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  //enroll a new course
  const enrollCourse = async (courseId) => {
    console.log(courseId,"courseId")
    try {
      const response = await axiosInstance.post(`/student/enroll/${courseId}`);
      console.log(response, "response after enrolling a course");
      if (response.status === 200) {
        console.log("Enrollment successful");
        const updatedEnrolledCourses = [
          ...enrolledCourses,
          response.data.enrollment,
        ];
        console.log(updatedEnrolledCourses, "updatedEnrolledCourses");
        setEnrolledCourses(updatedEnrolledCourses);
        closeModal();
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  useEffect(() => {
    console.log(enrolledCourses, "enrolledCourses after state update");
  }, [enrolledCourses]);

  // Create a Set of active enrolled course IDs for O(1) lookup
  const activeEnrolledCourseIds = new Set(
    enrolledCourses
      .filter((enrollment) => enrollment.status !== "dropped")
      .map((enrollment) => enrollment.course._id)
  );

  // Filter out courses that are actively enrolled
  const filteredCourses = courses.filter(
    (course) => !activeEnrolledCourseIds.has(course._id)
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Course List</h2>
      <ul>
        {filteredCourses.map((course) => (
          <li key={course.id} className="border-b border-gray-200 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-gray-500">Fee: {course.fee}</p>
              </div>
              <button
                onClick={() => openModal(course)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Details
              </button>
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
            <button
              onClick={() => enrollCourse(selectedCourse._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Course
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CourseList;
