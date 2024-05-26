import React, { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstances";

function StudentCoursesModal({ student, onClose }) {
  console.log(student, "studentstudent");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStudentCourses = async () => {
      try {
        const response = await axiosInstance.get(
          `/admin/student-courses/${student._id}`
        );
        console.log(response.data, "responsess");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching student courses:", error);
        setError("An error occurred while fetching the courses.");
      } finally {
        setLoading(false);
      }
    };

    getStudentCourses();
  }, [student]);

  //to change the status of a enrolled student into complete
  const handleApprove = async (courseId) => {
    try {
      const response = await axiosInstance.post(
        `admin/course-completion/${student._id}/${courseId}`
      );
      // Handle successful response if needed
      console.log("Course completion approval successful:", response.data);
      setCourses((courses) => {
        return courses.map((course) => {
          if (course.course._id === response.data.enrollment.course) {
            // Update the status of the matching course
            return {
              ...course,
              status: "completed",
            };
          } else {
            return course; // Return unchanged if not matching
          }
        });
      });
    } catch (error) {
      // Handle error if the request fails
      console.error("Error approving course completion:", error);
    }
  };
  console.log("courses : ", courses);
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Courses of {student.username}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        {loading ? (
          <p className="text-gray-600 text-center">Loading...</p>
        ) : error ? (
          <p className="text-red-600 text-center">{error}</p>
        ) : courses?.length === 0 ? (
          <p className="text-gray-600 text-center">
            No courses found for this student.
          </p>
        ) : (
          <ul>
            {courses.map((course) => (
              <li
                key={course.id}
                className="border-b border-gray-200 py-2 flex justify-between"
              >
                <div>
                  <p className="text-gray-800">{course.course.title}</p>

                  <p>Status: {course.status}</p>
                </div>
                {course.status === "enrolled" && (
                  <button
                    onClick={() => handleApprove(course.course._id)}
                    className="btn-primary max-w-20 p-1"
                  >
                    Approve
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StudentCoursesModal;
