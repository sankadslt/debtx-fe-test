import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { getDrcDetailsWithServicesById } from "../../services/drc/DRCService";
import { getActiveServiceDetails } from "../../services/serviceType/ServiceTypeService";
import { manageDrcDetails } from "../../services/drc_service/DRC_Service";

import add from "../../assets/images/add.svg";
import remove from "../../assets/images/remove.svg";
import Swal from "sweetalert2";

const DrcEditDetails = () => {
  const { drcId } = useParams();

  const [drcDetails, setDrcDetails] = useState({});
  const [newServiceType, setNewServiceType] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [remark, setRemark] = useState("");
  const [activeServices, setActiveServices] = useState([]);
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const drcData = await getDrcDetailsWithServicesById(drcId);

        setDrcDetails(drcData);
        setContactNumber(drcData.teli_no || "");
        setEmail(drcData.drc_email || "");
        setRemark(drcData.remark || "");
        setServices(drcData.services_of_drc || []);

        const activeServicesData = await getActiveServiceDetails();
        setActiveServices(activeServicesData);
      } catch (error) {
        console.error("Error initializing data:", error.message);
      }
    };

    if (drcId) {
      fetchInitialData();
    }
  }, [drcId]);

  const toggleDrcStatus = () => {
    const updatedStatus =
      drcDetails.drc_status === "Active" ? "Inactive" : "Active";
    setDrcDetails((prev) => ({ ...prev, drc_status: updatedStatus }));
  };

  const toggleServiceStatus = (serviceId) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.service_id === serviceId
          ? {
              ...service,
              drc_service_status:
                service.drc_service_status === "Active" ? "Inactive" : "Active",
            }
          : service
      )
    );
  };

  const addService = () => {
    if (!newServiceType) return;

    const serviceToAdd = activeServices.find(
      (service) => service.service_type === newServiceType
    );

    if (!serviceToAdd) {
      console.error("Selected service type not found in active services.");
      return;
    }

    const newService = {
      id: services.length + 1,
      service_id: serviceToAdd.service_id,
      service_type: serviceToAdd.service_type,
      drc_service_status: "Active",
      isNew: true,
    };

    setServices([...services, newService]);
  };

  const removeService = (id) => {
    setServices((prevServices) =>
      prevServices.filter((service) => service.id !== id || !service.isNew)
    );
  };

  const handleSaveClick = async () => {
    
    try {
      const servicesToAdd = services.filter((service) => service.isNew);

      const servicesToUpdate = services
        .filter((service) => !service.isNew)
        .map((service) => ({
          service_id: service.service_id,
          drc_service_status: service.drc_service_status,
        }));

      const payload = {
        drc_id: drcId,
        drc_status: drcDetails.drc_status,
        teli_no: contactnumber,
        drc_email: email,
        remark,
        services_to_add: servicesToAdd.map((service) => ({
          service_id: service.service_id,
          service_type: service.service_type,
        })),
        services_to_update: servicesToUpdate,
      };
      

      await manageDrcDetails(payload);

      setServices((prevServices) =>
        prevServices.map((service) => ({
          ...service,
          isNew: false,
        }))
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "All changes saved successfully!",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate(`/config/drc-info/${drcId}`); // Navigate back to the relevant page
      });
    } catch (error) {
      console.error("Failed to save changes:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save changes. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className={`${GlobalStyle.headingLarge} mb-4`}>
        <span>{drcDetails?.drc_name || "Loading..."} Edit Details</span>
      </div>

      <div className="flex w-full justify-center">
        <div className={`${GlobalStyle.cardContainer} p-4`}>
          {/* DRC Status Toggle */}
          <div className="relative mb-10">
            <label className="absolute top-8 right-2 inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={drcDetails.drc_status === "Active"}
                onChange={toggleDrcStatus}
              />
              <div
                className={`w-11 h-6 rounded-full ${
                  drcDetails.drc_status === "Active"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    drcDetails.drc_status === "Active" ? "translate-x-full" : ""
                  }`}
                ></div>
              </div>
            </label>
          </div>

          {/* Form Fields */}
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
                  <input
                    type="text"
                    className={`${GlobalStyle.inputText}`}
                    value={contactnumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Drc Email
                  </label>
                </td>
                <td> : </td>
                <td>
                  <input
                    type="text"
                    className={`${GlobalStyle.inputText}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    className={`${GlobalStyle.remark} w-64`}
                    rows="2"
                    onChange={(e) => setRemark(e.target.value)}
                  ></textarea>
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
                      <td className={GlobalStyle.tableData}>
                        {service?.status_change_dtm
                          ? new Date(
                              service.status_change_dtm
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td
                        className={`${GlobalStyle.tableData} flex justify-center gap-2`}
                      >
                        {/* Toggle Button */}
                        <div className="flex items-center justify-center">
                          <div
                            className={`w-11 h-6 rounded-full relative cursor-pointer ${
                              service?.drc_service_status === "Active"
                                ? "bg-green-600"
                                : "bg-gray-500"
                            }`}
                            onClick={() =>
                              toggleServiceStatus(service.service_id)
                            } // Pass `service.service_id`
                          >
                            <div
                              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                                service?.drc_service_status === "Active"
                                  ? "translate-x-full"
                                  : ""
                              }`}
                            ></div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        {service?.isNew && (
                          <button onClick={() => removeService(service.id)}>
                            <img
                              src={remove}
                              title="Remove"
                              alt="Remove Service"
                              className="w-6 h-6"
                            />
                          </button>
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
                    Service Type
                  </label>
                </td>
                <td> : </td>
                <td>
                  <select
                    className={`${GlobalStyle.selectBox}`}
                    value={newServiceType}
                    onChange={(e) => setNewServiceType(e.target.value)}
                  >
                    <option value="">Select Service Type</option>
                    {activeServices.map((service) => (
                      <option
                        key={service.service_id}
                        value={service.service_type}
                      >
                        {service.service_type}
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

          {/* Save Button */}
          <div className="flex justify-end items-center">
            <button
              className={`${GlobalStyle.buttonPrimary} ml-auto`}
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        </div>
     
      
      </div>
     
    </div>
  );
};

export default DrcEditDetails;
