
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { getRTOMDetailsById, updateRTOMDetails } from "../../services/rtom/RtomService";

const RTomEditDetails = () => {
  const { rtomId } = useParams();
  const navigate = useNavigate();
  const [telephoneNo, setTelephoneNo] = useState("");
  const [faxNo, setFaxNo] = useState("");
  const [remark, setRemark] = useState("");
  const [checkboxStatus, setCheckboxStatus] = useState(true);
  const [rtomDetails, setRtomDetails] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRTOMDetailsById(rtomId);

        const formattedDetails = {
          areaName: data.area_name || "N/A",
          rtomAbbreviation: data.rtom_abbreviation || "N/A",
          addedDate: data.created_dtm || "N/A",
          telephoneNo: data.rtom_contact_number || "",
          faxNo: data.rtom_fax_number || "",
          status: data.rtom_status === "Active" ? "Enabled" : "Disabled",
        };

        setRtomDetails(formattedDetails);
        setTelephoneNo(formattedDetails.telephoneNo);
        setFaxNo(formattedDetails.faxNo);
        setCheckboxStatus(formattedDetails.status === "Enabled");
        setLoading(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch RTOM details. Please try again later." + error.message,
          confirmButtonColor: "#d33",
        });
        setError("Failed to fetch RTOM details.");
        setLoading(false);
      }
    };

    fetchData();
  }, [rtomId]);

  const handleSaveClick = async () => {
    if (!telephoneNo || !faxNo || !remark) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please fill in all required fields.",
        confirmButtonColor: "#f1c40f",
      });
      return;
    }

    if (telephoneNo.length > 10 || faxNo.length > 10) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Telephone and Fax numbers cannot exceed 10 digits.",
        confirmButtonColor: "#f1c40f",
      });
      return;
    }

    const rtom_status = checkboxStatus ? "Active" : "Inactive";
    const reason = remark;

    try {
      const response = await updateRTOMDetails(rtomId, rtom_status, telephoneNo, faxNo, reason);

      if (response.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "RTOM details updated successfully!",
          confirmButtonColor: "#28a745",
        }).then(() => {
          navigate(`/config/rtom-info/${rtomId}`); // Navigate back to the relevant page
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.message || "Failed to update RTOM details.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating RTOM details. Please try again later." + error.message,
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleCheckboxChange = () => {
    setCheckboxStatus(!checkboxStatus);
  };

  const handleTelephoneChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setTelephoneNo(value);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Telephone number cannot exceed 10 digits.",
        confirmButtonColor: "#f1c40f",
      });
    }
  };

  const handleFaxChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setFaxNo(value);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Fax number cannot exceed 10 digits.",
        confirmButtonColor: "#f1c40f",
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className={`${GlobalStyle.headingLarge} mb-4`}>
        <span> RTOM Edit Details - {rtomDetails.areaName} </span>
      </div>

      <div className="flex w-full justify-center">
        <div className={`${GlobalStyle.cardContainer} p-4`}>
          <div className="relative mb-10">
            <div className="mb-2 text-end">
              <span>{checkboxStatus ? "Enabled" : "Disabled"}</span>
            </div>
            <label className="absolute top-8 right-2 inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={checkboxStatus}
                onChange={handleCheckboxChange}
              />
              <div className="w-11 h-6 bg-red-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          <table className="mb-4 w-full">
            <tbody>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>Added Date</label>
                </td>
                <td> : </td>
                <td>
                  <label>{rtomDetails.addedDate}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>RTOM Name</label>
                </td>
                <td> : </td>
                <td>
                  <label>{rtomDetails.areaName}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>Abbreviation</label>
                </td>
                <td> : </td>
                <td>
                  <label>{rtomDetails.rtomAbbreviation}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>Telephone No</label>
                </td>
                <td> : </td>
                <td>
                  <input
                    type="text"
                    className={`${GlobalStyle.inputText}`}
                    value={telephoneNo}
                    onChange={handleTelephoneChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>Fax No</label>
                </td>
                <td> : </td>
                <td>
                  <input
                    type="text"
                    className={`${GlobalStyle.inputText}`}
                    value={faxNo}
                    onChange={handleFaxChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>Remark</label>
                </td>
                <td> : </td>
                <td>
                  <textarea
                    type="text"
                    className={`${GlobalStyle.inputText}`}
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end items-center">
            <button
              className={`${GlobalStyle.buttonPrimary} ml-auto`}
              onClick={handleSaveClick}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Back Button */} 
      <div className="flex justify-start mb-5">
      <Link to={`/config/rtom-info/${rtomId}`}>
          <button className={`${GlobalStyle.buttonPrimary}`}>
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RTomEditDetails;

