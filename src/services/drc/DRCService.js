import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL;
const URL = `${BASE_URL}/DRC`;


export const registerDRC = async (drcData) => {
  try {
    const response = await axios.post(`${URL}/Register_DRC`, drcData);
    return response.data;
  } catch (error) {
    console.error("Error registering DRC:", error);
    throw error;
  }
};  

export const getDRCDetailsWithServices = async () => {
    try {
        const response = await axios.get(`${URL}/DRC_with_Services`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
};
  
 
 

export const getDrcDetailsWithServicesById = async (drcId) => {
  try {
    const response = await axios.post(`${URL}/DRC_with_Services_By_DRC_ID`, {
      DRC_ID: drcId,
    });
    if (response.data.status === "success") {
      return response.data.data.mongoData[0]; 
    } else {
      console.error(response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error fetching DRC details:", error.message);
    throw error;
  }
};




export const changeDRCStatus = async (drcId, drcStatus) => {
  try {
    const response = await axios.patch(`${URL}/Change_DRC_Status`, {
      drc_id: drcId,
      drc_status: drcStatus,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating DRC status:", error.response?.data || error.message);
    throw error;
  }
};


export const fetchActiveDRCDetails = async () => {
  const apiUrl = `${URL}/Active_DRC_Details`; 
  try {
    const response = await axios.get(apiUrl); 
    const result = response.data;

    if (result.status === "success" && Array.isArray(result.data.mongoData)) {
      return result.data.mongoData.map((item) => ({
        id: item.drc_id,
        name: item.drc_name,
      }));
    } else {
      throw new Error("Invalid API response format.");
    }
  } catch (error) {
    throw new Error(`Failed to fetch DRC details: ${error.response?.data?.message || error.message}`);
  }
};



export const endDRC = async ({ drc_id, drc_end_dat, remark, remark_edit_by }) => {
  const apiUrl = `${URL}/End_DRC`;

  try {
    const response = await axios.patch(apiUrl, {
      drc_id,
      drc_end_dat,
      remark,
      remark_edit_by,
    }); // Make PATCH request with payload

    const result = response.data;

    if (result.status === "success" && result.data) {
      // Return updated DRC details
      return result.data;
    } else {
      throw new Error("Invalid API response format.");
    }
  } catch (error) {
    // Throw meaningful error if the request fails
    throw new Error(
      `Failed to end DRC: ${error.response?.data?.message || error.message}`
    );
  }
};

export const getRemarkDetailsByDRCId = async (drcId) => {
  try {
    const response = await axios.post(`${URL}/DRC_Remark_Details_By_ID`, {
      drc_id: drcId,
    });

    if (response.data.status === "success") {
      return response.data.data; 
    } else {
      console.error(response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error fetching remark details:", error.message);
    throw error;
  }
};


