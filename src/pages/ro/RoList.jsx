import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import { fetchRODetails, fetchRODataByDRC } from "../../services/Ro/RO";
import activeIcon from "../../assets/images/RO/RO/Active.png";
import deactiveIcon from "../../assets/images/RO/RO/Inactive.png";
import terminatedIcon from "../../assets/images/RO/RO/Terminated.png";
import more_info from "../../assets/images/more-info.svg";
import user_add from "../../assets/images/user-add.svg";
import { fetchActiveDRCDetails } from "../../services/drc/DRCService";

const ROList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [status, setStatus] = useState("");
  const [selectedDRC, setSelectedDRC] = useState(""); // This holds the name of the selected DRC
  const [appliedFilters, setAppliedFilters] = useState({ status: "", drc: "" });
  const [roData, setRoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [requestDrcId, setRequestDrcId] = useState(null); // Default to fetch all recovery officers
  const [drcArray, setDrcData] = useState([]); // Dynamically fetched DRC data

  const rowsPerPage = 7;

  useEffect(() => {
    const fetchDrcData = async () => {
      try {
        const data = await fetchActiveDRCDetails(); // Fetch DRC details
        setDrcData(data); // Update DRC data
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDrcData();
  }, []); // Fetch DRC details once on component mount

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        if (requestDrcId) {
          const data = await fetchRODataByDRC(requestDrcId); // Fetch data for specific DRC
          setRoData(data);
        } else {
          const data = await fetchRODetails(); // Fetch all RO details
          setRoData(data);
        }
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [requestDrcId]); // Refetch when DRC ID changes

  const getLastStatus = (statusArray) => {
    if (Array.isArray(statusArray) && statusArray.length > 0) {
      return statusArray[statusArray.length - 1].status;
    }
    return "Unknown";
  };

  const filteredData = roData.filter((row) => {
    const matchesSearchQuery = Object.values(row)
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      status === "" ||
      getLastStatus(row.ro_status).toLowerCase() === status.toLowerCase();

    return matchesSearchQuery && matchesStatus;
  });

  const handleFilter = () => {
    setAppliedFilters({ status, selectedDRC });
    setCurrentPage(0);
  };

  const pages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < pages - 1) setCurrentPage(currentPage + 1);
  };

  const handleStatusChange = (status) => {
    setStatus(status || "");
    setCurrentPage(0);
  };

  const handleDRCChange = (e) => {
    const selected = e.target.value;
    setSelectedDRC(selected);
    
    if (selected === "") {
      // If "Select DRC" is chosen, reset to fetch all recovery officers
      setRequestDrcId(null);
    } else {
      // Find the selected DRC by name and set its ID
      const selectedDrc = drcArray.find((drc) => drc.name === selected);
      if (selectedDrc) {
        setRequestDrcId(selectedDrc.id);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className="flex justify-between items-center mb-8">
        <h1 className={GlobalStyle.headingLarge}>RO List</h1>
        <Link to="/config/add-ro">
          <button>
            <img src={user_add} title="Add RO" className="w-8 h-8" />
          </button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col mb-10">
        <div className="flex gap-4 justify-end">
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={GlobalStyle.selectBox}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Terminate">Inactive</option>
          </select>

          <select
          className={GlobalStyle.selectBox}
          value={selectedDRC}
          onChange={handleDRCChange}
        >
          <option value="">Select DRC</option>
          {drcArray.map((drc) => (
            <option key={drc.id} value={drc.name}>
              {drc.name}
            </option>
          ))}
        </select>

          <button
            onClick={handleFilter}
            className={`${GlobalStyle.buttonPrimary} flex items-center gap-2`}
          >
            Filter
          </button>
        </div>
      </div>

      {/* Search Bar */}
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

      {/* Table */}
      <div className={GlobalStyle.tableContainer}>
        <table className={GlobalStyle.table}>
          <thead className={GlobalStyle.thead}>
            <tr>
              <th scope="col" className={GlobalStyle.tableHeader}>RO ID</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Status</th>
              <th scope="col" className={GlobalStyle.tableHeader}>DRC Name</th>
              <th scope="col" className={GlobalStyle.tableHeader}>RO Name</th>
              <th scope="col" className={GlobalStyle.tableHeader}>Contact No.</th>
              <th scope="col" className={GlobalStyle.tableHeader}>RTOM Area count</th>
              <th scope="col" className={GlobalStyle.tableHeader}></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((ro, index) => (
              <tr key={ro.ro_id} 
              className={`${
                index % 2 === 0
                  ? "bg-white bg-opacity-75"
                  : "bg-gray-50 bg-opacity-50"
              } border-b`}
            >
                <td className={GlobalStyle.tableData}>{ro.ro_id}</td>
                <td className={GlobalStyle.tableData}>
                  <div className="flex items-center justify-center gap-2">
                    <img
                      src={getLastStatus(ro.ro_status) === "Active" ? activeIcon : (ro.ro_status) === "Inactive" ?deactiveIcon : terminatedIcon}
                      alt={getLastStatus(ro.ro_status)}
                      className="w-5 h-5"
                      title={getLastStatus(ro.ro_status)}
                    />
                  </div>
                </td>
                <td className={GlobalStyle.tableData}>{ro.drc_name}</td>
                <td className={GlobalStyle.tableData}>{ro.ro_name}</td>
                <td className={GlobalStyle.tableData}>{ro.ro_contact_no}</td>
                <td className={GlobalStyle.tableData}>{ro.rtoms_for_ro?.length || 0}</td>
                <td className={GlobalStyle.tableData}>
                  <div className="flex gap-4">
                    <Link to={`/config/ro-details/${ro.ro_id}`}>
                      <img src={more_info} alt="More Info" className="w-6 h-6" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {paginatedData.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredData.length > rowsPerPage && (
        <div className={GlobalStyle.navButtonContainer}>
          <button className={GlobalStyle.navButton} onClick={handlePrevPage} disabled={currentPage === 0}>
            <FaArrowLeft />
          </button>
          <span>
            Page {currentPage + 1} of {pages}
          </span>
          <button className={GlobalStyle.navButton} onClick={handleNextPage} disabled={currentPage === pages - 1}>
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default ROList;



