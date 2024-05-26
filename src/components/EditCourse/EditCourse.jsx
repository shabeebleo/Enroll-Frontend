import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utils/axiosInstances";

function EditCourse({ onClose, editCourseData, setCourses, courses }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const [fee, setFee] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editCourseData) {
      setTitle(editCourseData.title || "");
      setDescription(editCourseData.description || "");
      setInstructor(editCourseData.instructor || "");
      setFee(editCourseData.fee || "");
    }
  }, [editCourseData]);

  const handleSave = async () => {
    if (!title || !description || !instructor || !fee) {
      setError("All fields are required");
      return;
    }

    try {
      const response = editCourseData?._id
        ? await axiosInstance.put(
            `/admin/update-course/${editCourseData._id}`,
            {
              title,
              description,
              instructor,
              fee,
            }
          )
        : await axiosInstance.post("/admin/create-course", {
            title,
            description,
            instructor,
            fee,
          });

      if (response.status === 201) {
        const updatedCourse = response.data.newCourse;
        const updatedCourses = editCourseData?._id
          ? courses.map((course) =>
              course._id === editCourseData._id ? updatedCourse : course
            )
          : [...courses, updatedCourse];
        setCourses(updatedCourses);
        onClose();
      } else {
        setError("Failed to update the course");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      setError("An error occurred while updating the course");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3"
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label text-gray-600">TITLE</label>
        <input
          type="text"
          className="text-xl text-gray-950 outline-none"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label text-gray-600">DESCRIPTION</label>
        <textarea
          rows={5}
          className="text-sm text-slate-950 outline-none bg-slate-50 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label text-gray-600">INSTRUCTOR</label>
        <input
          type="text"
          className="text-xl text-gray-950 outline-none"
          placeholder="Instructor Name"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label text-gray-600">FEE</label>
        <input
          type="number"
          className="text-xl text-gray-950 outline-none"
          placeholder="Fee"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
        />
      </div>
      {error && <p className="text-red-600 pt-1 text-sm">{error}</p>}
      <div className="flex justify-end mt-5">
        <button
          className="btn-primary font-medium mr-5 p-3 max-w-40"
          onClick={handleSave}
        >
          Save Changes
        </button>
        <button
          className="btn-cancel  max-w-20 font-medium p-3"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditCourse;
