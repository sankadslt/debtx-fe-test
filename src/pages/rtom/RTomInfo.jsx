import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import edit_info from "../../assets/images/edit-info.svg";
import { getRTOMDetailsById } from "../../services/rtom/RtomService";

const RTomInfo = () => {
  const { rtomId } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [negotiation, setNegotiation] = useState("");
  const [endDate, setEndDate] = useState(""); 
  const [remark, setRemark] = useState("");
  const [isEndButtonVisible, setIsEndButtonVisible] = useState(true);
  const [isTerminated, setIsTerminated] = useState(false);  
  const [rtomDetails, setRtomDetails] = useState(null);
  const [logHistory, setLogHistory] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  
  const rowsPerPage = 7;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRTOMDetailsById(rtomId);

        const formattedDetails = {
          areaName: data.area_name || "N/A",
          rtomAbbreviation: data.rtom_abbreviation || "N/A",
          contactNumber: data.rtom_contact_number || "N/A",
          faxNumber: data.rtom_fax_number || "N/A",
          addedDate: data.created_dtm || "N/A",
          rtomStatus: data.rtom_status || "N/A", // RTOM status field
        };

        const formattedLogHistory = data.updated_rtom.map((item) => ({
          editOn: item.updated_date || "N/A",
          action: item.action || "N/A",
          editBy: item.updated_by || "N/A",
        }));

        setRtomDetails(formattedDetails);
        setLogHistory(formattedLogHistory);
        setIsTerminated(formattedDetails.rtomStatus === "Terminate");  // Update the termination status based on rtom_status
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch RTOM details. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, [rtomId]);

  const filteredLogHistory = logHistory.filter((row) =>
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

  const handleSaveClick = () => {
    if (negotiation && (!endDate || !remark)) {
      alert("Please provide the end date and remarks.");
      return;
    }
    alert("Form submitted successfully!");
    console.log("Data saved:", {
      endDate: negotiation ? endDate : null,
      remark,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className={`${GlobalStyle.headingLarge} mb-8`}>
        <span>RTOM Details - {rtomDetails.areaName}</span>
      </div>

      <div className="flex justify-center">
        {/* Card Container */}
        <div className={`${GlobalStyle.cardContainer} p-4`}>
          <div className="flex mb-4 justify-end">
          {!isTerminated && (
            <Link to={`/config/rtom-edit-details/${rtomId}`}>
              <button>
                <img src={edit_info} title="Edit" className="w-6 h-6" />
              </button>
            </Link>
          )}
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
                  <label>{rtomDetails.addedDate}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    RTOM Name
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{rtomDetails.areaName}</label>
                </td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Abbreviation
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{rtomDetails.rtomAbbreviation}</label>
                </td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Telephone No
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{rtomDetails.contactNumber}</label>
                </td>
              </tr>
              <tr>
                <td></td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>
                    Fax No
                  </label>
                </td>
                <td> : </td>
                <td>
                  <label>{rtomDetails.faxNumber}</label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col">
        {/* Hide End Button if RTOM is terminated */}
        {!isTerminated && (
          <div className="flex justify-end mb-4">
            <Link to={`/config/rtom-end/${rtomId}`}>
              <button
                className={`${GlobalStyle.buttonPrimary}`}
                onClick={() => {
                  setNegotiation("end");
                  setIsEndButtonVisible(false);
                }}
              >
                End
              </button>
            </Link>
          </div>
        )}

        {negotiation && (
          <div>
            {/* End Date */}
            <div className="flex gap-4 items-center mb-6 justify-center">
              <label className="block font-medium mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={GlobalStyle.inputText}
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

            {/* Save Button */}
            <div className="flex justify-end w-full mt-6">
              <button className={GlobalStyle.buttonPrimary} onClick={handleSaveClick}>
                Save
              </button>
            </div>
          </div>
        )}

          {/* Log History button */}
          <div className="flex justify-start mb-4">
            <button
              className={`${GlobalStyle.buttonPrimary}`}
              onClick={() => setShowPopup(true)}
            >
              Log History
            </button>
          </div>
      </div>

      {/* Log History Popup */}
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

      {/* Back Button */} 
      <div className="flex justify-start mb-5">
      <Link to={`/config/rtom-list`}>
          <button className={`${GlobalStyle.buttonPrimary}`}>
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RTomInfo;
