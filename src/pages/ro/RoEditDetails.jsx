import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import add from "../../assets/images/add.svg";
import remove from "../../assets/images/remove.svg";
import google from "../../assets/images/google.png";
import facebook from "../../assets/images/facebook.png";
import { fetchRODataByID, editRecoveryOfficer } from "../../services/Ro/RO";
import { getAllActiveRTOMs } from "../../services/rtom/RtomService";

const RoEditDetails = () => {
  const [contactnumber, setContactNumber] = useState("");
  const [remark, setRemark] = useState("");
  const [loginmethod, setLoginMethod] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [checkboxStatus, setCheckboxStatus] = useState(true);
  const [services, setServices] = useState([]);
  const [selectedRTOM, setSelectedRTOM] = useState("");
  const [rtomAreas, setRtomAreas] = useState([]);
  const [initialCheckboxStatus, setInitialCheckboxStatus] = useState(true);
  const [dummyData, setDummyData] = useState({
    addeddate: "",
    recoveryofficername: "",
    nic: "",
    contactnumber: "",
    remark: "",
    loginmethod: "",
  });
  const { roId } = useParams();
  const navigate = useNavigate();
  const roidentity = parseInt(roId, 10);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchRODataByID(roidentity);
        const data = response.data;

        setDummyData({
          addeddate: new Date(data.createdAt).toLocaleDateString(),
          recoveryofficername: data.ro_name,
          nic: data.ro_nic,
          contactnumber: data.ro_contact_no,
          remark: data.remark[0]?.remark || "",
          loginmethod: data.login_type,
        });
        setContactNumber(data.ro_contact_no);
        setLoginMethod(data.login_type);
        setRemark("");
        setAccountDetails(data.login_user_id);
        setSelectedMethod(data.login_type);

        const lastStatus = data.ro_status[data.ro_status.length - 1];
        setInitialCheckboxStatus(lastStatus?.status === "Active");
        setCheckboxStatus(lastStatus?.status === "Active");

        setServices(
          data.rtoms_for_ro.map((item) => {
            const lastRTOMStatus =
              item.status && item.status.length > 0
                ? item.status[item.status.length - 1]
                : null;
            return {
              id: item.rtom_id,
              name: item.name,
              changeOn: lastRTOMStatus
                ? new Date(
                    lastRTOMStatus.rtoms_for_ro_status_date
                  ).toLocaleDateString()
                : "",
              enabled: lastRTOMStatus
                ? lastRTOMStatus.status === "Active"
                : false,
              initialEnabled: lastRTOMStatus
                ? lastRTOMStatus.status === "Active"
                : false,
              isNew: false,
            };
          }) || []
        );

        const rtomResponse = await getAllActiveRTOMs();
        setRtomAreas(
          rtomResponse.data.map((area) => ({
            rtom_id: area.rtom_id,
            rtom_name: area.area_name,
          }))
        );
      } catch (error) {
        console.error("Error fetching recovery officer details:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch recovery officer details.",
          confirmButtonColor: "#d33",
        });
      }
    };
    fetchDetails();
  }, [roidentity]);

  const toggleService = (id) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, enabled: !service.enabled } : service
      )
    );
  };

  const addService = () => {
    const selectedRTOMArea = rtomAreas.find(
      (area) => area.rtom_name === selectedRTOM
    );

    if (selectedRTOMArea) {
      const alreadyExists = services.some(
        (service) => service.id === selectedRTOMArea.rtom_id
      );

      if (alreadyExists) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "This RTOM area is already in the table.",
          confirmButtonColor: "#f1c40f",
        });
        return;
      }

      const newService = {
        id: selectedRTOMArea.rtom_id,
        name: selectedRTOMArea.rtom_name,
        changeOn: new Date().toLocaleDateString(),
        enabled: false,
        isNew: true,
      };
      setServices([...services, newService]);
      setSelectedRTOM("");
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid RTOM area selected.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const removeService = (id) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service.id !== id || !service.isNew)
    );
  };

  const handleSaveClick = async () => {
    if (!contactnumber || !loginmethod || !accountDetails || !remark) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please fill all required fields.",
        confirmButtonColor: "#f1c40f",
      });
      return;
    }

    if (contactnumber.length !== 10) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Contact number must be exactly 10 digits.",
        confirmButtonColor: "#f1c40f",
      });
      return;
    }

    try {
      const rtomsForRO = services
        .filter(
          (service) =>
            service.isNew || service.enabled !== service.initialEnabled
        )
        .map((service) => ({
          rtom_id: service.id,
          status: service.enabled ? "Active" : "Inactive",
        }));

      const roStatus =
        checkboxStatus !== initialCheckboxStatus
          ? {
              status: checkboxStatus ? "Active" : "Inactive",
              ro_status_edit_by: "Admin",
            }
          : null;

      const payload = {
        ro_id: roidentity,
        ro_contact_no: contactnumber,
        remark,
        remark_edit_by: "Admin",
        login_type: loginmethod,
        login_user_id: accountDetails,
        ...(roStatus && { ro_status: roStatus }),
        ...(rtomsForRO.length > 0 && { rtoms_for_ro: rtomsForRO }),
      };

      const response = await editRecoveryOfficer(payload);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message || "Data updated successfully!",
        confirmButtonColor: "#28a745",
      }).then(() => {
        navigate(`/config/ro-details/${roId}`); // Navigate to relevant page
      });
    } catch (error) {
      console.error("Error updating recovery officer profile:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save changes. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
    setLoginMethod(method);
    setAccountDetails("");
  };

  const handleCheckboxChange = () => {
    setCheckboxStatus(!checkboxStatus);
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className={`${GlobalStyle.headingLarge} mb-4`}>
        <span>RO Edit Details</span>
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
                onChange={handleCheckboxChange}
                checked={checkboxStatus}
              />
              <div
                className={`w-11 h-6 rounded-full peer ${
                  checkboxStatus
                    ? "bg-green-600 peer-focus:ring-green-300"
                    : "bg-red-600 peer-focus:ring-red-300"
                } peer-focus:ring-4`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 bg-white border-gray-300 border rounded-full h-5 w-5 transition-all ${
                    checkboxStatus
                      ? "translate-x-full peer-checked:border-white"
                      : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>

          <table className="mb-4 w-full">
            <tbody>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Added Date
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{dummyData.addeddate}</label>
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
                  <label>{dummyData.recoveryofficername}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>NIC</label>
                </td>
                <td> : </td>
                <td>
                  <label>{dummyData.nic}</label>
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
                  <input
                    type="text"
                    className={`${GlobalStyle.inputText}`}
                    value={contactnumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    maxLength="10"
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Remark
                  </label>
                </td>
                <td> : </td>
                <td>
                  <textarea
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    className={`${GlobalStyle.remark} w-64`}
                    rows="2"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Login Method
                  </label>
                </td>
                <td> : </td>
                <td className="flex gap-4 items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="loginMethod"
                      value="Google"
                      checked={selectedMethod === "Google"}
                      onChange={() => handleMethodChange("Google")}
                    />
                    <img src={google} alt="Google" className="w-6 h-6" />
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="loginMethod"
                      value="Facebook"
                      checked={selectedMethod === "Facebook"}
                      onChange={() => handleMethodChange("Facebook")}
                    />
                    <img src={facebook} alt="Facebook" className="w-6 h-6" />
                  </label>
                </td>
              </tr>
              {selectedMethod && (
                <tr>
                  <td>
                    <label className={`${GlobalStyle.headingMedium}`}>
                      Account Details
                    </label>
                  </td>
                  <td> : </td>
                  <td>
                    <input
                      type="text"
                      className={`${GlobalStyle.inputText}`}
                      value={accountDetails}
                      onChange={(e) => setAccountDetails(e.target.value)}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex flex-col mb-5">
            <span className={GlobalStyle.headingMedium}>RTOM Area:</span>
            <div className={GlobalStyle.tableContainer}>
              <table className={`${GlobalStyle.table} table-auto`}>
                <thead className={GlobalStyle.thead}>
                  <tr>
                    <th className={GlobalStyle.tableHeader}>RTOM Area</th>
                    <th className={GlobalStyle.tableHeader}>Change On</th>
                    <th className={GlobalStyle.tableHeader}>Status</th>
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
                      {/* RTOM Area */}
                      <td className={GlobalStyle.tableData}>{service?.name}</td>

                      {/* Change On */}
                      <td className={GlobalStyle.tableData}>
                        {service?.isNew
                          ? "N/A"
                          : service?.changeOn
                          ? new Date(service.changeOn).toLocaleDateString()
                          : "N/A"}
                      </td>

                      {/* Toggle Status */}
                      <td
                        className={`${GlobalStyle.tableData} flex justify-center gap-2`}
                      >
                        {service?.isNew ? (
                          <button onClick={() => removeService(service.id)}>
                            <img
                              src={remove}
                              title="Remove"
                              alt="Remove Service"
                              className="w-6 h-6"
                            />
                          </button>
                        ) : (
                          <div className="flex items-center justify-center">
                            <div
                              className={`w-11 h-6 rounded-full relative cursor-pointer ${
                                service?.enabled
                                  ? "bg-green-600"
                                  : "bg-gray-500"
                              }`}
                              onClick={() => toggleService(service.id)}
                            >
                              <div
                                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                                  service?.enabled ? "translate-x-full" : ""
                                }`}
                              ></div>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <table className="mb-8 w-full">
            <tbody>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Add RTOM Area
                  </label>
                </td>
                <td> : </td>
                <td>
                  <select
                    className={`${GlobalStyle.selectBox}`}
                    value={selectedRTOM}
                    onChange={(e) => setSelectedRTOM(e.target.value)}
                  >
                    <option value="">Select RTOM Area</option>
                    {rtomAreas.map((area) => (
                      <option key={area.rtom_id} value={area.rtom_name}>
                        {area.rtom_name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <div className="flex justify-end">
                    <button onClick={addService}>
                      <img src={add} title="Add" className="w-6 h-6" />
                    </button>
                  </div>
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
    </div>
  );
};

export default RoEditDetails;
