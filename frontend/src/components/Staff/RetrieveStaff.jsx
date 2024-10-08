import React, { useState } from "react";
import { retrieveStaff } from "../../services/staffService";

const RetrieveStaff = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [staff, setStaff] = useState(null);
  const [error, setError] = useState("");

  const handleRetrieve = async () => {
    try {
      const response = await retrieveStaff(employeeNumber.trim());
      setStaff(response);
      setError("");
    } catch (err) {
      console.log(err);
      setError("There was an error retrieving staff");
      setStaff(null);
    }
  };

  return (
    <div className="container retrieve">
      <h1>Retrieve Staff</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Employee Number (optional)"
          value={employeeNumber}
          onChange={(e) => setEmployeeNumber(e.target.value)}
        />
        <button onClick={handleRetrieve}>Retrieve Staff</button>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {staff && (
          <div>
            {Array.isArray(staff) ? (
              staff.map((s) => (
                <div key={s.employeeNumber} className="staff-detail">
                  <div>
                    {s.idPhoto && (
                      <img
                        src={`data:image/jpeg;base64,${s.idPhoto}`}
                        alt="Staff ID"
                      />
                    )}
                  </div>
                  <div className="text">
                    <p>
                      <b>Full Name:</b>{" "}
                      <i>
                        {s.surname} {s.otherNames}
                      </i>
                    </p>
                    <p>
                      <b>Employee Number:</b> <i>{s.employeeNumber}</i>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="staff-detail">
                <div>
                  {staff.idPhoto && (
                    <img
                      src={`data:image/jpeg;base64,${staff.idPhoto}`}
                      alt="Staff ID"
                      style={{ width: "150px", height: "150px" }}
                    />
                  )}
                </div>
                <div className="text">
                  <p>
                    <b>Full Name: </b>{" "}
                    <i>
                      {staff.surname} {staff.otherNames}
                    </i>
                  </p>
                  <p>
                    {" "}
                    <b>Employee Number: </b> <i>{staff.employeeNumber}</i>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RetrieveStaff;
