import React, { useState } from "react";
import { MdCreate, MdClose } from "react-icons/md"; // Import the MdClose icon
import Modal from "react-modal";
import axiosInstance from "../../utils/axiosInstances";

Modal.setAppElement("#root"); // Ensure this line is included for accessibility

function CourseCard({
  title,
  description,
  instructor,
  status,
  fee,
  enrollId,
  enrolledCourses,
  setEnrolledCourses,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
console.log(enrolledCourses,"enrolledCourses in courseCard")
  // Define a function to get the appropriate color class based on the status
  const getStatusColor = (status) => {
    switch (status) {
      case "enrolled":
        return "text-green-600";
      case "dropped":
        return "text-red-600";
      case "completed":
        return "text-blue-600"; // Assuming blue for completed
      default:
        return "text-gray-600"; // Default color for other statuses
    }
  };

  const handleDropCourse = async () => {
    try {
      const response = await axiosInstance.put(
        `/student/dropCourse/${enrollId}`
      );
      if (response.status === 200) {
        // Update the status in the enrolledCourses state
        const updatedEnrolledCourses = enrolledCourses.map((course) => {
          if (course._id === enrollId) {
            return {
              ...course,
              status: "dropped",
            };
          }
          return course;
        });
        setEnrolledCourses(updatedEnrolledCourses);
        console.log(enrolledCourses," enrolledCourses after the enroll api call")
      }
    } catch (error) {
      console.error("Error dropping course:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="border rounded p-4 hover:shadow-xl transition-all ease-in-out relative">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
        </div>
        <MdCreate
          className="icon-btn hover:text-green-600 cursor-pointer"
          onClick={() => setIsModalOpen(true)} // Open modal on MdCreate click
        />
      </div>
      <p className="text-xs mt-2  mb-2">{description}</p>
      <p className="text-xs mt-1 font-medium mb-5">Instructor: {instructor}</p>
      <div className="absolute bottom-0 w-full mb-2 mt-2 ">
        <div className="flex justify-around">
          <p className={`text-xs mt-1 font-medium ${getStatusColor(status)}`}>
            <span className="text-black">Status: </span>
            {status}
          </p>
          <p>Fee : Rs {fee} </p>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="modal absolute top-0 left-0 right-0 mx-auto mt-4 w-80 p-4 bg-white rounded shadow-lg"
        overlayClassName="overlay"
      >
        {status === "dropped" ? (
          <>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium">Course Already Dropped</h2>
              <MdClose
                className="text-gray-500 hover:text-gray-800 cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-medium">
              Do you want to drop the {title} course?
            </h2>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded"
                onClick={handleDropCourse}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-600 text-white rounded"
                onClick={() => setIsModalOpen(false)}
              >
                No
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}

export default CourseCard;
