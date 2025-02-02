import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import {
  getDrcDetailsWithServicesById,
  getRemarkDetailsByDRCId,
} from "../../services/drc/DRCService";
import activeIcon from "../../assets/images/DRC/Status_DRC list/Active.png";
import deactiveIcon from "../../assets/images/DRC/Status_DRC list/Inactive.png";
import edit_info from "../../assets/images/edit-info.svg";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const DrcInfo = () => {
  const { drcId } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [drcDetails, setDrcDetails] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [remarkDetails, setRemarkDetails] = useState([]);
  const rowsPerPage = 7;
  const [setError] = useState(null);

  // Filter and paginate remark data for the log history
  const filteredLogHistory = remarkDetails.filter((row) =>
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

  // Fetch DRC details and services
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

    fetchInitialData();
  }, [drcId]);

  // Fetch remark details when popup is triggered
  useEffect(() => {
    const fetchRemarks = async () => {
      try {
        const remarks = await getRemarkDetailsByDRCId(drcId);
        setRemarkDetails(remarks || []);
      } catch (error) {
        console.error("Error fetching remark details:", error.message);
        setError("Failed to load remark details.");
      }
    };

    if (showPopup) fetchRemarks(); // Fetch remarks only when popup is triggered
  }, [drcId, showPopup]);

  const handleNavigation = (path) => {
    if (drcDetails.drc_status === "Ended") {
      alert("Permission denied: DRC status is 'Ended'.");
    } else {
      navigate(path);
    }
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
      <h1 className={GlobalStyle.headingLarge}>
        More Info {drcDetails?.drc_name || "Loading..."}
      </h1>

      <div className="flex w-full justify-center">
        <div className={`${GlobalStyle.cardContainer} p-4`}>
          <div className="flex justify-end">
            <button
              onClick={() =>
                handleNavigation(`/config/drc-edit-details/${drcId}`)
              }
            >
              <img src={edit_info} title="Edit" className="w-6 h-6" />
            </button>
          </div>
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
                  <label>{drcDetails?.teli_no || "N/A"}</label>
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

      {/* End Button */}
      <div className="flex justify-end ">
        <button
          className={`${GlobalStyle.buttonPrimary}`}
          onClick={() => handleNavigation(`/config/drc-end/${drcId}`)}
        >
          End
        </button>
      </div>
      {/* Log History Button */}
      <div className="flex justify-start">
        <button
          className={`${GlobalStyle.buttonPrimary}`}
          onClick={() => setShowPopup(true)}
        >
          Log History
        </button>
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
                    {paginatedLogHistory.length > 0 ? (
                      paginatedLogHistory.map((remark, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0
                              ? "bg-white bg-opacity-75"
                              : "bg-gray-50 bg-opacity-50"
                          } border-b`}
                        >
                          <td className={GlobalStyle.tableData}>
                            {remark?.remark_Dtm
                              ? new Date(remark.remark_Dtm).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td className={GlobalStyle.tableData}>
                            {remark?.remark}
                          </td>
                          <td className={GlobalStyle.tableData}>
                            {remark?.remark_edit_by}
                          </td>
                        </tr>
                      ))
                    ) : (
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
      {/* Back Button */}
      <div className="flex justify-start mt-4">
        <Link to={`/config/drc-list`}>
          <button className={`${GlobalStyle.buttonPrimary}`}>Back</button>
        </Link>
      </div>
    </div>
  );
};

export default DrcInfo;
