import { useState, useEffect } from "react";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { useParams, useNavigate } from "react-router-dom";
import { GetRODetailsByID, SuspendRO } from "../../services/Ro/RO";
import Swal from "sweetalert2";
import activeIcon from "../../assets/images/RO/RO/Active.png";
import deactiveIcon from "../../assets/images/RO/RO/Inactive.png";

const RoEnd = () => {
  const { roId } = useParams();
  const navigate = useNavigate();
  const [roDetails, setRoDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [remark, setRemark] = useState("");
  const [endDate, setEndDate] = useState("");
  const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchRODetails = async () => {
      try {
        const response = await GetRODetailsByID(roId);
        setRoDetails(response.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchRODetails();
  }, [roId]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleSaveClick = async () => {
    if (!endDate || !remark.trim()) {
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
      await SuspendRO(roId, remark);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "RO suspended successfully!",
        confirmButtonColor: "#28a745",
      }).then(() =>
         navigate("/config/ro-list"));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to suspend RO. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className={`${GlobalStyle.headingLarge} mb-4`}>
        <span>End RO</span>
      </div>
      <div className="flex justify-center">
        <div className={`${GlobalStyle.cardContainer} p-4 mb-8`}>
          <table className="mb-8 w-fit">
            <tbody>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Added Date
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{roDetails.createdAt.split("T")[0]}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Recovery Officer Name
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{roDetails.ro_name}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>NIC</label>
                </td>
                <td> : </td>
                <td>
                  <label>{roDetails.ro_nic}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Contact Number &nbsp;
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{roDetails.ro_contact_no}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Login Method
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{roDetails.login_type}</label>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-col mb-5">
            <span className={GlobalStyle.headingMedium}>RTOM Area:</span>
            <div className={GlobalStyle.tableContainer}>
              <table className={`${GlobalStyle.table} w-full`}>
                <thead className={GlobalStyle.thead}>
                  <tr>
                    <th className={`${GlobalStyle.tableHeader} text-left`}>
                      RTOM Area
                    </th>
                    <th className={`${GlobalStyle.tableHeader} text-left`}>
                      Change On
                    </th>
                    <th className={`${GlobalStyle.tableHeader}`}></th>
                  </tr>
                </thead>
                <tbody>
                  {roDetails.rtoms_for_ro.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0
                          ? "bg-white bg-opacity-75"
                          : "bg-gray-50 bg-opacity-50"
                      } border-b`}
                    >
                      <td className={`${GlobalStyle.tableData} p-3`}>
                        {item.name}
                      </td>
                      <td className={`${GlobalStyle.tableData} p-3`}>
                        {item.status[0].rtoms_for_ro_status_date.split("T")[0]}
                      </td>
                      <td className={GlobalStyle.tableData}>
                        <div className="flex items-center justify-center gap-2">
                          <img
                            src={
                              item.status[0].status === "Active"
                                ? activeIcon
                                : deactiveIcon
                            }
                            alt={item.status[0].status}
                            className="w-5 h-5"
                            title={
                              item.status[0].status === "Active"
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

      <div>
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
          <label className={GlobalStyle.remarkTopic}>Remark </label>
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className={`${GlobalStyle.remark}`}
            rows="5"
            maxLength="30"
          ></textarea>
        </div>

        {/* Save Button */}
        <div className="flex justify-end w-full mt-6">
          <button className={GlobalStyle.buttonPrimary} onClick={handleSaveClick}>
            End
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoEnd;
