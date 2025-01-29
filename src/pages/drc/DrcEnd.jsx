import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { getDrcDetailsWithServicesById, endDRC } from "../../services/drc/DRCService";
import activeIcon from "../../assets/images/DRC/Status_DRC list/Active.png";
import deactiveIcon from "../../assets/images/DRC/Status_DRC list/Inactive.png";
import Swal from "sweetalert2";

const DrcEnd = () => {
  const { drcId } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [drcDetails, setDrcDetails] = useState({});
  const [ setError] = useState(""); 
  const [endDate, setEndDate] = useState(""); 
  const [remark, setRemark] = useState("");
  const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const drcData = await getDrcDetailsWithServicesById(drcId);
        setDrcDetails(drcData);
        setServices(drcData.services_of_drc || []);
      } catch (error) {
        console.error("Error initializing data:", error.message);
        setError("Failed to load data. Please try again.");
      }
    };

    if (drcId) {
      fetchInitialData();
    }
  });

  const handleSaveClick = async () => {
    if (!endDate || !remark) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please provide the end date and remark.",
        confirmButtonColor: "#f1c40f",
      });
      return;
    }
  
    if (remark.length > 30) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Remark must not exceed 30 characters.",
        confirmButtonColor: "#f1c40f",
      });
      return;
    }
  
    try {
      console.log("Sending request to endDRC:", { drcId, endDate, remark });
      const updatedDrc = await endDRC(drcId, endDate, remark);
      console.log("Response from endDRC:", updatedDrc);
  
      if (updatedDrc.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "DRC suspended successfully!",
          confirmButtonColor: "#28a745",
        }).then(() => {
          console.log("Swal success closed, navigating...");
          navigate("/config/ro-list");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: updatedDrc.message || "Failed to suspend DRC.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error ending DRC details:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "An error occurred. Please try again later.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
      <h1 className={GlobalStyle.headingLarge}>End DRC</h1>

      <div className="flex w-full justify-center">
        <div className={`${GlobalStyle.cardContainer} p-4`}>
          <table className="mb-8 w-full">
            <tbody>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Added Date
                  </label>
                </td>
                <td> : </td>
                <td>
                  <span>
                    {drcDetails.create_dtm
                      ? new Date(drcDetails.create_dtm).toLocaleDateString()
                      : "N/A"}
                  </span>
                </td>
              </tr>

              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Contact Number
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>0712453645</label>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex flex-col mb-5">
            <span className={GlobalStyle.headingMedium}>Service Types:</span>
            <div className={GlobalStyle.tableContainer}>
              <table className={`${GlobalStyle.table} table-auto`}>
                <thead className={GlobalStyle.thead}>
                  <tr>
                    <th className={GlobalStyle.tableHeader}>Service Type</th>
                    <th className={GlobalStyle.tableHeader}>Change On</th>
                    <th className={GlobalStyle.tableHeader}></th>
                  </tr>
                </thead>
                <tbody>
                  {services?.map((service, index) => (
                    <tr
                      key={service?.id}
                      className={`${
                        index % 2 === 0
                          ? "bg-white bg-opacity-75"
                          : "bg-gray-50 bg-opacity-50"
                      } border-b`}
                    >
                      <td className={GlobalStyle.tableData}>
                        {service?.service_type}
                      </td>
                      <td className={GlobalStyle.tableData}>1/1/2025</td>
                      <td
                        className={`${GlobalStyle.tableData} flex justify-center`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <img
                            src={
                              service?.drc_service_status === "Active"
                                ? activeIcon
                                : deactiveIcon
                            }
                            alt={service?.drc_service_status}
                            className="w-5 h-5"
                            title={
                              service?.drc_service_status === "Active"
                                ? "Active"
                                : "Deactive"
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* End Date */}
      <div className="flex gap-4 items-center mb-6 justify-center">
        <label className="block font-medium mb-2">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className={GlobalStyle.inputText}
          min={todayDate}
          max={todayDate}
        />
      </div>

      {/* Remark */}
      <div className="flex mb-6 justify-center gap-4">
        <label className={GlobalStyle.remarkTopic}>Remark</label>
        <textarea
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className={`${GlobalStyle.remark}`}
          rows="5"
        ></textarea>
      </div>

      {/* End Button */}
      <div className="flex justify-end w-full mt-6">
        <button className={GlobalStyle.buttonPrimary} onClick={handleSaveClick}>
          End
        </button>
      </div>

      {/* Back Button */} 
      <div className="flex justify-start mb-5">
          <Link to="/config/drc-list">
            <button className={`${GlobalStyle.buttonPrimary}`}>
              Back
            </button>
          </Link>
        </div>
    </div>
  );
};

export default DrcEnd;
