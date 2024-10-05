import React, { useState } from "react";
import { updateStaff } from "../services/staffService";

const UpdateStaff = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [staffData, setStaffData] = useState({
    dateOfBirth: "",
    idPhoto: null,
  }); // idPhoto should be null to hold file
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setStaffData({ ...staffData, [e.target.name]: e.target.value });
  };

  // Handle image file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStaffData({ ...staffData, idPhoto: file });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    /* =======FormData Object to handle upload=========== */
    const formData = new FormData();
    formData.append("dateOfBirth", staffData.dateOfBirth);

    /* =======Appending the image if it exists=========== */
    if (staffData.idPhoto) {
      formData.append("idPhoto", staffData.idPhoto);
    }

    try {
      const response = await updateStaff(employeeNumber.trim(), formData); // Pass FormData to the backend
      setMessage("Staff updated successfully!");
    } catch (error) {
      setMessage("Failed to update staff.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Employee Number"
        value={employeeNumber}
        onChange={(e) => setEmployeeNumber(e.target.value)}
      />
      <input
        type="date"
        name="dateOfBirth"
        placeholder="Date of Birth"
        value={staffData.dateOfBirth}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="idPhoto"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button onClick={handleUpdate}>Update Staff</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateStaff;
