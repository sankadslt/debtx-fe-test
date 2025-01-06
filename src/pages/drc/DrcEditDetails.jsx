import { useState,useEffect } from "react";
import {useParams } from "react-router-dom";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {getDrcDetailsWithServicesById} from "../../services/drc/DRCService";
import add from "../../assets/images/add.svg";
import remove from "../../assets/images/remove.svg";

const DrcEditDetails = () => {
  const { drcId } = useParams();
    const [showPopup, setShowPopup] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [drcDetails, setDrcDetails] = useState({});
    const [newServiceType, setNewServiceType] = useState("");
    const [contactnumber, setContactNumber] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [checkboxStatus, setCheckboxStatus] = useState(true);
    const [error, setError] = useState(null);
    const rowsPerPage = 7;
  
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
      }, [drcId]);
    const dummyData = {
      addeddate: "12/01/2024",
      contactnumber: "",
      remark: "",
    };
  
    const [services, setServices] = useState([
      { id: 1, name: "PEO TV", changeOn: "1/1/2025", enabled: true, isNew: false },
      { id: 2, name: "LET", changeOn: "1/1/2025", enabled: true, isNew: false },
      { id: 3, name: "FTTH", changeOn: "1/1/2025", enabled: false, isNew: false },
    ]);
  
    const logHistoryData = [
      { editOn: "mm/dd/yyyy", action: "Sensus BPO Services (Pvt) ltd...", editBy: "Damithri" },
      { editOn: "mm/dd/yyyy", action: "Central Management Services (Pvt) ltd...", editBy: "Saniru" },
    ];
  
    const filteredLogHistory = logHistoryData.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  
    const pages = Math.ceil(filteredLogHistory.length / rowsPerPage);
    const startIndex = currentPage * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedLogHistory = filteredLogHistory.slice(startIndex, endIndex);
  
    const handlePrevPage = () => {
      if (currentPage > 0) setCurrentPage(currentPage - 1);
    };
  
    const handleNextPage = () => {
      if (currentPage < pages - 1) setCurrentPage(currentPage + 1);
    };
  
    const toggleService = (id) => {
      setServices((prevServices) =>
        prevServices.map((service) =>
          service.id === id ? { ...service, enabled: !service.enabled } : service
        )
      );
    };
  
    const addService = () => {
      if (newServiceType) {
        const newService = {
          id: services.length + 1,
          name: newServiceType,
          enabled: false,
          isNew: true,
        };
        setServices([...services, newService]);
        setNewServiceType("");
      }
    };
  
    const removeService = (id) => {
      setServices((prevServices) =>
        prevServices.filter((service) => service.id !== id || !service.isNew)
      );
    };
  
    const handleSaveClick = () => {
      if (!contactnumber) {
        alert("Please fill in all required fields.");
        return;
      }
      alert("Form submitted successfully!");
      console.log("Data saved:", {
        contactnumber,
      });
    };
  
    const handleCheckboxChange = () => {
      setCheckboxStatus(!checkboxStatus);
    };
  
  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className={`${GlobalStyle.headingLarge} mb-4`}>
        <span>DRC Edit Details</span>
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
              />
              <div className="w-11 h-6 bg-green-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
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
                    Contact Number
                  </label>
                </td>
                <td> : </td>
                <td>
                  <input
                    type="text"
                    className={`${GlobalStyle.inputText}`}
                    value={ drcDetails?.teli_no }
                    onChange={(e) => setContactNumber(e.target.value)}
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
                  value=""
                  className={`${GlobalStyle.remark} w-64`}
                  rows="2"
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
    ? new Date(service.status_change_dtm).toLocaleDateString()
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
                    toggleServiceStatus(service.id, service.drc_service_status)
                  }
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
                    <option value="">Service Type</option>
                    <option value="AD">PEO TV</option>
                    <option value="GM">LET</option>
                    <option value="KU">FTTH</option>
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

      <div className="flex flex-col">
        {/* Log History Button */}
        <div className="flex justify-start">
          <button
            className={`${GlobalStyle.buttonPrimary}`}
            onClick={() => setShowPopup(true)}
          >
            Log History
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-3/4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Log History</h2>
              <button
                className="text-red-500 text-lg font-bold"
                onClick={() => setShowPopup(false)}
              >
                ×
              </button>
            </div>
            <div>
              <div className="mb-4 flex justify-start">
                <div className={GlobalStyle.searchBarContainer}>
                  <input
                    type="text"
                    placeholder=""
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={GlobalStyle.inputSearch}
                  />
                  <FaSearch className={GlobalStyle.searchBarIcon} />
                </div>
              </div>
              <div className={GlobalStyle.tableContainer}>
                <table className={GlobalStyle.table}>
                  <thead className={GlobalStyle.thead}>
                    <tr>
                      <th className={GlobalStyle.tableHeader}>Edit On</th>
                      <th className={GlobalStyle.tableHeader}>Action</th>
                      <th className={GlobalStyle.tableHeader}>Edit By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedLogHistory.map((row, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0
                            ? "bg-white bg-opacity-75"
                            : "bg-gray-50 bg-opacity-50"
                        } border-b`}
                      >
                        <td className={GlobalStyle.tableData}>{row.editOn}</td>
                        <td className={GlobalStyle.tableData}>{row.action}</td>
                        <td className={GlobalStyle.tableData}>{row.editBy}</td>
                      </tr>
                    ))}
                    {paginatedLogHistory.length === 0 && (
                      <tr>
                        <td colSpan="3" className="text-center py-4">
                          No results found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {filteredLogHistory.length > rowsPerPage && (
                <div className={GlobalStyle.navButtonContainer}>
                  <button
                    className={GlobalStyle.navButton}
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                  >
                    <FaArrowLeft />
                  </button>
                  <span>
                    Page {currentPage + 1} of {pages}
                  </span>
                  <button
                    className={GlobalStyle.navButton}
                    onClick={handleNextPage}
                    disabled={currentPage === pages - 1}
                  >
                    <FaArrowRight />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

export default DrcEditDetails