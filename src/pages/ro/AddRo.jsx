// import { useState } from "react";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import add from "../../assets/images/add.svg";
// import remove from "../../assets/images/remove.svg";
// import google from "../../assets/images/google.png";
// import facebook from "../../assets/images/facebook.png";

// const RecoveryOfficerForm = () => {
//   const [ROName, setROName] = useState("");
//   const [RONIC, setRONIC] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [loginmethod, setLoginMethod] = useState("");
//   const [selectedRTOM, setselectedRTOM] = useState("");
//   const [selectedMethod, setSelectedMethod] = useState("");
//   const [accountDetails, setAccountDetails] = useState("");

//   const [tableData, setTableData] = useState([
//     { rtomArea: "AD", enabled: false },
//     { rtomArea: "GM", enabled: false },
//     { rtomArea: "KU", enabled: false },
//   ]);

//   const rtomAreas = ["Area 1", "Area 2"];

//   const addrtomArea = () => {
//     if (selectedRTOM.trim()) {
//       setTableData([...tableData, { rtomArea: selectedRTOM, enabled: false }]);
//       setselectedRTOM("");
//     }
//   };

//   const handleRemove = (index) => {
//     setTableData(tableData.filter((_, i) => i !== index));
//   };

//   const handleSubmit = () => {
//     if (!ROName || !RONIC || !contactNumber) {
//       alert("Please fill in all required fields.");
//       return;
//     }
//     alert("Form submitted successfully!");
//   };

//   const handleMethodChange = (method) => {
//     setSelectedMethod(method);
//     setAccountDetails("");
//   };

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className={`${GlobalStyle.headingLarge} mb-8`}>
//         <span>Register New Recovery Officer</span>
//       </div>
//       <div className="flex justify-center">
//         <div className={`${GlobalStyle.cardContainer} p-4`}>
//           <table className="mb-8 w-full">
//             <tbody>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     Recovery Officer Name
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <input
//                     type="text"
//                     className={`${GlobalStyle.inputText}`}
//                     value={ROName}
//                     onChange={(e) => setROName(e.target.value)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td></td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     RO NIC
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <input
//                     type="text"
//                     className={`${GlobalStyle.inputText}`}
//                     value={RONIC}
//                     onChange={(e) => setRONIC(e.target.value)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td></td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     Contact Number
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <input
//                     type="text"
//                     className={`${GlobalStyle.inputText}`}
//                     value={contactNumber}
//                     onChange={(e) => setContactNumber(e.target.value)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td></td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     Login Method
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td className="flex gap-4 items-center">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="loginMethod"
//                       value="Google"
//                       checked={selectedMethod === "Google"}
//                       onChange={() => handleMethodChange("Google")}
//                     />
//                     <img src={google} alt="Google" className="w-6 h-6" />
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="loginMethod"
//                       value="Facebook"
//                       checked={selectedMethod === "Facebook"}
//                       onChange={() => handleMethodChange("Facebook")}
//                     />
//                     <img src={facebook} alt="Facebook" className="w-6 h-6" />
//                   </label>
//                 </td>
//               </tr>
//               {selectedMethod && (
//                 <tr>
//                   <td>
//                     <label className={`${GlobalStyle.headingMedium}`}>
//                       Account Details
//                     </label>
//                   </td>
//                   <td> : </td>
//                   <td>
//                     <input
//                       type="text"
//                       className={`${GlobalStyle.inputText}`}
//                       placeholder={`${selectedMethod}`}
//                       value={accountDetails}
//                       onChange={(e) => setAccountDetails(e.target.value)}
//                     />
//                   </td>
//                 </tr>
//               )}
//               <tr>
//                 <td></td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     RTOM Area
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <select
//                     className={`${GlobalStyle.selectBox}`}
//                     value={selectedRTOM}
//                     onChange={(e) => setselectedRTOM(e.target.value)}
//                   >
//                     <option value="">RTOM Area</option>
//                     {rtomAreas.map((service, index) => (
//                       <option key={index} value={service}>
//                         {service}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//                 <td >
//                   <button
//                     className={GlobalStyle.tableData}
//                     onClick={addrtomArea}
//                   >
//                     <img src={add} title="Add" className="w-6 h-6" />
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>

//           <div className={`${GlobalStyle.tableContainer} mb-5`}>
//             <table className={`${GlobalStyle.table} w-full`}>
//               <thead className={GlobalStyle.thead}>
//                 <tr>
//                   <th className={`${GlobalStyle.tableHeader} text-left`}>
//                     RTOM Area
//                   </th>
//                   <th className={`${GlobalStyle.tableHeader}`}></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableData.map((item, index) => (
//                   <tr
//                     key={index}
//                     className={`${
//                       index % 2 === 0
//                         ? "bg-white bg-opacity-75"
//                         : "bg-gray-50 bg-opacity-50"
//                     } border-b`}
//                   >
//                     <td className={`${GlobalStyle.tableData} p-3`}>
//                       {item.rtomArea}
//                     </td>
//                     <td
//                       className={`${GlobalStyle.tableData} flex justify-center`}
//                     >
//                       <button onClick={() => handleRemove(index)}>
//                         <img src={remove} title="Remove" className="w-6 h-6" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="flex justify-end">
//             <button
//               className={`${GlobalStyle.buttonPrimary}`}
//               onClick={handleSubmit}
//             >
//               Add
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecoveryOfficerForm;



// import { useState } from "react";
// import { registerRecoveryOfficer } from "../../services/Ro/RO"; // Import the function
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import add from "../../assets/images/add.svg";
// import remove from "../../assets/images/remove.svg";
// import google from "../../assets/images/google.png";
// import facebook from "../../assets/images/facebook.png";

// const RecoveryOfficerForm = () => {
//   const [ROName, setROName] = useState("");
//   const [RONIC, setRONIC] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [loginMethod, setLoginMethod] = useState("");
//   const [accountDetails, setAccountDetails] = useState("");
//   const [selectedRTOM, setSelectedRTOM] = useState("");
//   const [tableData, setTableData] = useState([]);

//   const rtomAreas = [
//     { rtom_id: 2, rtom_name: "Matara" },
//     { rtom_id: 4, rtom_name: "Mannar" },
//   ];

//   const addrtomArea = () => {
//     const selected = rtomAreas.find((rtom) => rtom.rtom_name === selectedRTOM);
//     if (selected) {
//       setTableData([...tableData, { rtom_id: selected.rtom_id, rtomArea: selected.rtom_name }]);
//       setSelectedRTOM("");
//     } else {
//       alert("Invalid RTOM area selected.");
//     }
//   };

//   const handleRemove = (index) => {
//     setTableData(tableData.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async () => {
//     if (!ROName || !RONIC || !contactNumber || !loginMethod || !tableData.length) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     const requestData = {
//       ro_name: ROName,
//       ro_contact_no: contactNumber,
//       drc_id: 11, // This will be replace with login_id after the login is built. Because drc is the one who register ro, so login _id of that drc will be equal to the drc_id.
//       login_type: loginMethod,
//       login_user_id: accountDetails,
//       ro_nic: RONIC,
//       rtoms_for_ro: tableData.map((item) => ({ rtom_id: item.rtom_id })),
//       created_by: "Admin",
//     };

//     try {
//       const response = await registerRecoveryOfficer(requestData); // Call the service function
//       alert(response.message);
//     } catch (error) {
//       console.error("Error in handleSubmit:", error);
//       alert("An error occurred while registering the recovery officer.");
//     }
//   };

//   const handleMethodChange = (method) => {
//     setLoginMethod(method);
//     setAccountDetails("");
//   };

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className={`${GlobalStyle.headingLarge} mb-8`}>
//         <span>Register New Recovery Officer</span>
//       </div>
//       <div className="flex justify-center">
//         <div className={`${GlobalStyle.cardContainer} p-4`}>
//           <table className="mb-8 w-full">
//             <tbody>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>Recovery Officer Name</label>
//                 </td>
//                 <td>:</td>
//                 <td>
//                   <input
//                     type="text"
//                     className={`${GlobalStyle.inputText}`}
//                     value={ROName}
//                     onChange={(e) => setROName(e.target.value)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>RO NIC</label>
//                 </td>
//                 <td>:</td>
//                 <td>
//                   <input
//                     type="text"
//                     className={`${GlobalStyle.inputText}`}
//                     value={RONIC}
//                     onChange={(e) => setRONIC(e.target.value)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>Contact Number</label>
//                 </td>
//                 <td>:</td>
//                 <td>
//                   <input
//                     type="text"
//                     className={`${GlobalStyle.inputText}`}
//                     value={contactNumber}
//                     onChange={(e) => setContactNumber(e.target.value)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>Login Method</label>
//                 </td>
//                 <td>:</td>
//                 <td className="flex gap-4 items-center">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="loginMethod"
//                       value="Google"
//                       checked={loginMethod === "Google"}
//                       onChange={() => handleMethodChange("Google")}
//                     />
//                     <img src={google} alt="Google" className="w-6 h-6" />
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="loginMethod"
//                       value="Facebook"
//                       checked={loginMethod === "Facebook"}
//                       onChange={() => handleMethodChange("Facebook")}
//                     />
//                     <img src={facebook} alt="Facebook" className="w-6 h-6" />
//                   </label>
//                 </td>
//               </tr>
//               {loginMethod && (
//                 <tr>
//                   <td>
//                     <label className={`${GlobalStyle.headingMedium}`}>Account Details</label>
//                   </td>
//                   <td>:</td>
//                   <td>
//                     <input
//                       type="text"
//                       className={`${GlobalStyle.inputText}`}
//                       placeholder={loginMethod}
//                       value={accountDetails}
//                       onChange={(e) => setAccountDetails(e.target.value)}
//                     />
//                   </td>
//                 </tr>
//               )}
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>RTOM Area</label>
//                 </td>
//                 <td>:</td>
//                 <td>
//                   <select
//                     className={`${GlobalStyle.selectBox}`}
//                     value={selectedRTOM}
//                     onChange={(e) => setSelectedRTOM(e.target.value)}
//                   >
//                     <option value="">Select RTOM Area</option>
//                     {rtomAreas.map((rtom) => (
//                       <option key={rtom.rtom_id} value={rtom.rtom_name}>
//                         {rtom.rtom_name}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//                 <td>
//                   <button className={GlobalStyle.tableData} onClick={addrtomArea}>
//                     <img src={add} title="Add" className="w-6 h-6" />
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <div className={`${GlobalStyle.tableContainer} mb-5`}>
//             <table className={`${GlobalStyle.table} w-full`}>
//               <thead className={GlobalStyle.thead}>
//                 <tr>
//                   <th className={`${GlobalStyle.tableHeader} text-left`}>RTOM Area</th>
//                   <th className={`${GlobalStyle.tableHeader}`}></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableData.map((item, index) => (
//                   <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                     <td className={`${GlobalStyle.tableData} p-3`}>{item.rtomArea}</td>
//                     <td className={`${GlobalStyle.tableData} flex justify-center`}>
//                       <button onClick={() => handleRemove(index)}>
//                         <img src={remove} title="Remove" className="w-6 h-6" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="flex justify-end">
//             <button className={`${GlobalStyle.buttonPrimary}`} onClick={handleSubmit}>
//               Add
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecoveryOfficerForm;



// import { useState } from "react";
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import add from "../../assets/images/add.svg";
// import remove from "../../assets/images/remove.svg";
// import google from "../../assets/images/google.png";
// import facebook from "../../assets/images/facebook.png";

// const RecoveryOfficerForm = () => {
//   const [ROName, setROName] = useState("");
//   const [RONIC, setRONIC] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [loginmethod, setLoginMethod] = useState("");
//   const [selectedRTOM, setselectedRTOM] = useState("");
//   const [selectedMethod, setSelectedMethod] = useState("");
//   const [accountDetails, setAccountDetails] = useState("");

//   const [tableData, setTableData] = useState([
//     { rtomArea: "AD", enabled: false },
//     { rtomArea: "GM", enabled: false },
//     { rtomArea: "KU", enabled: false },
//   ]);

//   const rtomAreas = ["Area 1", "Area 2"];

//   const addrtomArea = () => {
//     if (selectedRTOM.trim()) {
//       setTableData([...tableData, { rtomArea: selectedRTOM, enabled: false }]);
//       setselectedRTOM("");
//     }
//   };

//   const handleRemove = (index) => {
//     setTableData(tableData.filter((_, i) => i !== index));
//   };

//   const handleSubmit = () => {
//     if (!ROName || !RONIC || !contactNumber) {
//       alert("Please fill in all required fields.");
//       return;
//     }
//     alert("Form submitted successfully!");
//   };

//   const handleMethodChange = (method) => {
//     setSelectedMethod(method);
//     setAccountDetails("");
//   };

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className={`${GlobalStyle.headingLarge} mb-8`}>
//         <span>Register New Recovery Officer</span>
//       </div>
//       <div className="flex justify-center">
//         <div className={`${GlobalStyle.cardContainer} p-4`}>
//           <table className="mb-8 w-full">
//             <tbody>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     Recovery Officer Name
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <input
//                     type="text"
//                     className={`${GlobalStyle.inputText}`}
//                     value={ROName}
//                     onChange={(e) => setROName(e.target.value)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td></td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     RO NIC
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <input
//                     type="text"
//                     className={`${GlobalStyle.inputText}`}
//                     value={RONIC}
//                     onChange={(e) => setRONIC(e.target.value)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td></td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     Contact Number
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <input
//                     type="text"
//                     className={`${GlobalStyle.inputText}`}
//                     value={contactNumber}
//                     onChange={(e) => setContactNumber(e.target.value)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td></td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     Login Method
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td className="flex gap-4 items-center">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="loginMethod"
//                       value="Google"
//                       checked={selectedMethod === "Google"}
//                       onChange={() => handleMethodChange("Google")}
//                     />
//                     <img src={google} alt="Google" className="w-6 h-6" />
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="loginMethod"
//                       value="Facebook"
//                       checked={selectedMethod === "Facebook"}
//                       onChange={() => handleMethodChange("Facebook")}
//                     />
//                     <img src={facebook} alt="Facebook" className="w-6 h-6" />
//                   </label>
//                 </td>
//               </tr>
//               {selectedMethod && (
//                 <tr>
//                   <td>
//                     <label className={`${GlobalStyle.headingMedium}`}>
//                       Account Details
//                     </label>
//                   </td>
//                   <td> : </td>
//                   <td>
//                     <input
//                       type="text"
//                       className={`${GlobalStyle.inputText}`}
//                       placeholder={`${selectedMethod}`}
//                       value={accountDetails}
//                       onChange={(e) => setAccountDetails(e.target.value)}
//                     />
//                   </td>
//                 </tr>
//               )}
//               <tr>
//                 <td></td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>
//                     RTOM Area
//                   </label>
//                 </td>
//                 <td> : </td>
//                 <td>
//                   <select
//                     className={`${GlobalStyle.selectBox}`}
//                     value={selectedRTOM}
//                     onChange={(e) => setselectedRTOM(e.target.value)}
//                   >
//                     <option value="">RTOM Area</option>
//                     {rtomAreas.map((service, index) => (
//                       <option key={index} value={service}>
//                         {service}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//                 <td >
//                   <button
//                     className={GlobalStyle.tableData}
//                     onClick={addrtomArea}
//                   >
//                     <img src={add} title="Add" className="w-6 h-6" />
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>

//           <div className={`${GlobalStyle.tableContainer} mb-5`}>
//             <table className={`${GlobalStyle.table} w-full`}>
//               <thead className={GlobalStyle.thead}>
//                 <tr>
//                   <th className={`${GlobalStyle.tableHeader} text-left`}>
//                     RTOM Area
//                   </th>
//                   <th className={`${GlobalStyle.tableHeader}`}></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableData.map((item, index) => (
//                   <tr
//                     key={index}
//                     className={`${
//                       index % 2 === 0
//                         ? "bg-white bg-opacity-75"
//                         : "bg-gray-50 bg-opacity-50"
//                     } border-b`}
//                   >
//                     <td className={`${GlobalStyle.tableData} p-3`}>
//                       {item.rtomArea}
//                     </td>
//                     <td
//                       className={`${GlobalStyle.tableData} flex justify-center`}
//                     >
//                       <button onClick={() => handleRemove(index)}>
//                         <img src={remove} title="Remove" className="w-6 h-6" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <div className="flex justify-end">
//             <button
//               className={`${GlobalStyle.buttonPrimary}`}
//               onClick={handleSubmit}
//             >
//               Add
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecoveryOfficerForm;



// import { useState } from "react";
// import { registerRecoveryOfficer } from "../../services/Ro/RO"; // Import the function
// import GlobalStyle from "../../assets/prototype/GlobalStyle";
// import add from "../../assets/images/add.svg";
// import remove from "../../assets/images/remove.svg";
// import google from "../../assets/images/google.png";
// import facebook from "../../assets/images/facebook.png";

// const RecoveryOfficerForm = () => {
//   const [ROName, setROName] = useState("");
//   const [RONIC, setRONIC] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [loginMethod, setLoginMethod] = useState("");
//   const [accountDetails, setAccountDetails] = useState("");
//   const [selectedRTOM, setSelectedRTOM] = useState("");
//   const [tableData, setTableData] = useState([]);

//   const rtomAreas = [
//     { rtom_id: 2, rtom_name: "Matara" },
//     { rtom_id: 4, rtom_name: "Mannar" },
//   ];

//   const addrtomArea = () => {
//     const selected = rtomAreas.find((rtom) => rtom.rtom_name === selectedRTOM);
//     if (selected) {
//       setTableData([...tableData, { rtom_id: selected.rtom_id, rtomArea: selected.rtom_name }]);
//       setSelectedRTOM("");
//     } else {
//       alert("Invalid RTOM area selected.");
//     }
//   };

//   const handleRemove = (index) => {
//     setTableData(tableData.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async () => {
//     if (!ROName || !RONIC || !contactNumber || !loginMethod || !tableData.length) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     const requestData = {
//       ro_name: ROName,
//       ro_contact_no: contactNumber,
//       drc_id: 11, // This will be replace with login_id after the login is built. Because drc is the one who register ro, so login _id of that drc will be equal to the drc_id.
//       login_type: loginMethod,
//       login_user_id: accountDetails,
//       ro_nic: RONIC,
//       rtoms_for_ro: tableData.map((item) => ({ rtom_id: item.rtom_id })),
//       created_by: "Admin",
//     };

//     try {
//       const response = await registerRecoveryOfficer(requestData); // Call the service function
//       alert(response.message);
//     } catch (error) {
//       console.error("Error in handleSubmit:", error);
//       alert("An error occurred while registering the recovery officer.");
//     }
//   };

//   const handleMethodChange = (method) => {
//     setLoginMethod(method);
//     setAccountDetails("");
//   };

//   return (
//     <div className={GlobalStyle.fontPoppins}>
//       <div className={`${GlobalStyle.headingLarge} mb-8`}>
//         <span>Register New Recovery Officer</span>
//       </div>
//       <div className="flex justify-center">
//         <div className={`${GlobalStyle.cardContainer} p-4`}>
//           <table className="mb-8 w-full">
//             <tbody>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>Recovery Officer Name</label>
//                 </td>
//                 <td>:</td>
//                 <td>
//                   <input
//                     type="text"
//                     className={`${GlobalStyle.inputText}`}
//                     value={ROName}
//                     onChange={(e) => setROName(e.target.value)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>RO NIC</label>
//                 </td>
//                 <td>:</td>
//                 <td>
//                   <input
//                     type="text"
//                     className={`${GlobalStyle.inputText}`}
//                     value={RONIC}
//                     onChange={(e) => setRONIC(e.target.value)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>Contact Number</label>
//                 </td>
//                 <td>:</td>
//                 <td>
//                   <input
//                     type="text"
//                     className={`${GlobalStyle.inputText}`}
//                     value={contactNumber}
//                     onChange={(e) => setContactNumber(e.target.value)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>Login Method</label>
//                 </td>
//                 <td>:</td>
//                 <td className="flex gap-4 items-center">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="loginMethod"
//                       value="Google"
//                       checked={loginMethod === "Google"}
//                       onChange={() => handleMethodChange("Google")}
//                     />
//                     <img src={google} alt="Google" className="w-6 h-6" />
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="radio"
//                       name="loginMethod"
//                       value="Facebook"
//                       checked={loginMethod === "Facebook"}
//                       onChange={() => handleMethodChange("Facebook")}
//                     />
//                     <img src={facebook} alt="Facebook" className="w-6 h-6" />
//                   </label>
//                 </td>
//               </tr>
//               {loginMethod && (
//                 <tr>
//                   <td>
//                     <label className={`${GlobalStyle.headingMedium}`}>Account Details</label>
//                   </td>
//                   <td>:</td>
//                   <td>
//                     <input
//                       type="text"
//                       className={`${GlobalStyle.inputText}`}
//                       placeholder={loginMethod}
//                       value={accountDetails}
//                       onChange={(e) => setAccountDetails(e.target.value)}
//                     />
//                   </td>
//                 </tr>
//               )}
//               <tr>
//                 <td>
//                   <label className={`${GlobalStyle.headingMedium}`}>RTOM Area</label>
//                 </td>
//                 <td>:</td>
//                 <td>
//                   <select
//                     className={`${GlobalStyle.selectBox}`}
//                     value={selectedRTOM}
//                     onChange={(e) => setSelectedRTOM(e.target.value)}
//                   >
//                     <option value="">Select RTOM Area</option>
//                     {rtomAreas.map((rtom) => (
//                       <option key={rtom.rtom_id} value={rtom.rtom_name}>
//                         {rtom.rtom_name}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//                 <td>
//                   <button className={GlobalStyle.tableData} onClick={addrtomArea}>
//                     <img src={add} title="Add" className="w-6 h-6" />
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <div className={`${GlobalStyle.tableContainer} mb-5`}>
//             <table className={`${GlobalStyle.table} w-full`}>
//               <thead className={GlobalStyle.thead}>
//                 <tr>
//                   <th className={`${GlobalStyle.tableHeader} text-left`}>RTOM Area</th>
//                   <th className={`${GlobalStyle.tableHeader}`}></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableData.map((item, index) => (
//                   <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                     <td className={`${GlobalStyle.tableData} p-3`}>{item.rtomArea}</td>
//                     <td className={`${GlobalStyle.tableData} flex justify-center`}>
//                       <button onClick={() => handleRemove(index)}>
//                         <img src={remove} title="Remove" className="w-6 h-6" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="flex justify-end">
//             <button className={`${GlobalStyle.buttonPrimary}`} onClick={handleSubmit}>
//               Add
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecoveryOfficerForm;



import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { registerRecoveryOfficer } from "../../services/Ro/RO";
import GlobalStyle from "../../assets/prototype/GlobalStyle";
import add from "../../assets/images/add.svg";
import remove from "../../assets/images/remove.svg";
import google from "../../assets/images/google.png";
import facebook from "../../assets/images/facebook.png";
import { getAllActiveRTOMs } from "../../services/rtom/RtomService";
import Swal from 'sweetalert2';

const RecoveryOfficerForm = () => {
  const [ROName, setROName] = useState("");
  const [RONIC, setRONIC] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [loginMethod, setLoginMethod] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [selectedRTOM, setSelectedRTOM] = useState("");
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleContactNumberChange = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    setContactNumber(numericValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllActiveRTOMs();
        const { data: activeRTOMs } = response;

        const formattedData = activeRTOMs.map((item) => ({
          rtom_id: item.rtom_id,
          rtom_name: item.area_name,
        }));

        setData(formattedData);
        setLoading(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch RTOM details. Please try again later.",
          confirmButtonColor: "#d33",
        });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addrtomArea = () => {
    if (!selectedRTOM.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please select an RTOM area to add.",
        confirmButtonColor: "#f1c40f",
      });
      return;
    }

    if (tableData.some((item) => item.rtomArea === selectedRTOM)) {
      Swal.fire({
        icon: "info",
        title: "Info",
        text: "RTOM area already added.",
        confirmButtonColor: "#3498db",
      });
      return;
    }

    const selected = data.find((rtom) => rtom.rtom_name === selectedRTOM);
    if (!selected) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid RTOM area selected.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    setTableData([...tableData, { rtom_id: selected.rtom_id, rtomArea: selected.rtom_name }]);
    setSelectedRTOM("");
  };

  const handleRemove = (index) => {
    setTableData(tableData.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!ROName || !RONIC || !contactNumber || !loginMethod || !tableData.length) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Please fill in all required fields.",
        confirmButtonColor: "#f1c40f",
      });
      return;
    }

    if (contactNumber.length !== 10) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text: "Contact number must be exactly 10 digits.",
        confirmButtonColor: "#f1c40f",
      });
      return;
    }

    const requestData = {
      ro_name: ROName,
      ro_contact_no: contactNumber,
      drc_id: 1, 
      login_type: loginMethod,
      login_user_id: accountDetails,
      ro_nic: RONIC,
      rtoms_for_ro: tableData.map((item) => ({ rtom_id: item.rtom_id })),
      created_by: "Admin",
    };

    try {
      const response = await registerRecoveryOfficer(requestData);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Recovery officer registered successfully!",
        confirmButtonColor: "#28a745",
      });

      // Clear the form
      setROName("");
      setRONIC("");
      setContactNumber("");
      setLoginMethod("");
      setAccountDetails("");
      setTableData([]);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        "Failed to register the recovery officer. Please try again.";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMsg,
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleMethodChange = (method) => {
    setLoginMethod(method);
    setAccountDetails("");
  };

  return (
    <div className={GlobalStyle.fontPoppins}>
      <div className={`${GlobalStyle.headingLarge} mb-8`}>
        <span>Register New Recovery Officer</span>
      </div>
      <div className="flex justify-center">
        <div className={`${GlobalStyle.cardContainer} p-4`}>
          <table className="mb-8 w-full">
            <tbody>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>Recovery Officer Name</label>
                </td>
                <td>:</td>
                <td>
                  <input
                    type="text"
                    className={`${GlobalStyle.inputText}`}
                    value={ROName}
                    onChange={(e) => setROName(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>RO NIC</label>
                </td>
                <td>:</td>
                <td>
                  <input
                    type="text"
                    className={`${GlobalStyle.inputText}`}
                    value={RONIC}
                    onChange={(e) => setRONIC(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>Contact Number</label>
                </td>
                <td>:</td>
                <td>
                  <input
                    type="text"
                    className={`${GlobalStyle.inputText}`}
                    value={contactNumber}
                    onChange={(e) => handleContactNumberChange(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>Login Method</label>
                </td>
                <td>:</td>
                <td className="flex gap-4 items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="loginMethod"
                      value="Google"
                      checked={loginMethod === "Google"}
                      onChange={() => handleMethodChange("Google")}
                    />
                    <img src={google} alt="Google" className="w-6 h-6" />
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="loginMethod"
                      value="Facebook"
                      checked={loginMethod === "Facebook"}
                      onChange={() => handleMethodChange("Facebook")}
                    />
                    <img src={facebook} alt="Facebook" className="w-6 h-6" />
                  </label>
                </td>
              </tr>
              {loginMethod && (
                <tr>
                  <td>
                    <label className={`${GlobalStyle.headingMedium}`}>Account Details</label>
                  </td>
                  <td>:</td>
                  <td>
                    <input
                      type="text"
                      className={`${GlobalStyle.inputText}`}
                      placeholder={loginMethod}
                      value={accountDetails}
                      onChange={(e) => setAccountDetails(e.target.value)}
                      required
                    />
                  </td>
                </tr>
              )}
              <tr>
                <td>
                  <label className={`${GlobalStyle.headingMedium}`}>RTOM Area</label>
                </td>
                <td>:</td>
                <td>
                  <select
                    className={`${GlobalStyle.selectBox}`}
                    value={selectedRTOM}
                    onChange={(e) => setSelectedRTOM(e.target.value)}
                  >
                    <option value="">Select RTOM Area</option>
                    {data.map((rtom) => (
                      <option key={rtom.rtom_id} value={rtom.rtom_name}>
                        {rtom.rtom_name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button className={GlobalStyle.tableData} onClick={addrtomArea}>
                    <img src={add} title="Add" className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className={`${GlobalStyle.tableContainer} mb-5`}>
            <table className={`${GlobalStyle.table} w-full`}>
              <thead className={GlobalStyle.thead}>
                <tr>
                  <th className={`${GlobalStyle.tableHeader} text-left`}>RTOM Area</th>
                  <th className={`${GlobalStyle.tableHeader}`}></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className={`${GlobalStyle.tableData} p-3`}>{item.rtomArea}</td>
                    <td className={`${GlobalStyle.tableData} flex justify-center`}>
                      <button onClick={() => handleRemove(index)}>
                        <img src={remove} title="Remove" className="w-6 h-6" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end">
            <button className={`${GlobalStyle.buttonPrimary}`} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Back Button */} 
      <div className="flex justify-start mb-5">
        <Link to="/config/ro-list">
          <button className={`${GlobalStyle.buttonPrimary}`}>
            Back
          </button>
        </Link>
      </div>
    </div>
  );
};

export default RecoveryOfficerForm;
