// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   ArcElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line, Doughnut } from "react-chartjs-2";
// import { FaTasks, FaCalendarCheck, FaUser, FaHome } from "react-icons/fa";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

// const Dashboard = () => {
//   const [date, setDate] = useState(new Date());
//   const [popupData, setPopupData] = useState(null);

//   const dummyData = {
//     Task: ["Task 1: Complete documentation", "Task 2: Update website", "Task 3: Fix bugs"],
//     "Do List": ["Do 1: Review report", "Do 2: Email client", "Do 3: Schedule meeting"],
//     Companies: ["Company A", "Company B", "Company C"],
//     "Recovery Officer": ["Officer A", "Officer B", "Officer C"],
//   };

//   const handleCardClick = (title) => {
//     setPopupData({ title, data: dummyData[title] });
//   };

//   const closePopup = () => {
//     setPopupData(null);
//   };

//   const lineChartData = {
//     labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//     datasets: [
//       {
//         label: "Sales",
//         data: [10, 15, 8, 12, 20, 15, 25],
//         borderColor: "#4CAF50",
//         backgroundColor: "rgba(76, 175, 80, 0.2)",
//         borderWidth: 2,
//         tension: 0.4,
//       },
//     ],
//   };

//   const doughnutChartData = {
//     labels: ["Online Sales", "In-Store Sales", "Mail Orders"],
//     datasets: [
//       {
//         label: "Sales Distribution",
//         data: [55, 25, 20],
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
//         hoverOffset: 4,
//       },
//     ],
//   };

//   return (
//     <div className="min-h-screen p-6">
//       <h1 className="text-3xl font-bold text-gray-700 mb-6">Dashboard</h1>

//       {/* Info Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         <div
//           className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white p-6 rounded-lg shadow-lg flex items-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:translate-y-1"
//           onClick={() => handleCardClick("Task")}
//         >
//           <FaTasks size={30} className="mr-4 animate-pulse" />
//           <div>
//             <h2 className="text-xl font-bold tracking-wider">Task</h2>
//             <p className="text-2xl font-semibold">50</p>
//           </div>
//         </div>
//         <div
//           className="bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 text-white p-6 rounded-lg shadow-lg flex items-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:translate-y-1"
//           onClick={() => handleCardClick("Do List")}
//         >
//           <FaCalendarCheck size={30} className="mr-4 animate-pulse" />
//           <div>
//             <h2 className="text-xl font-bold tracking-wider">Do List</h2>
//             <p className="text-2xl font-semibold">10</p>
//           </div>
//         </div>
//         <div
//           className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white p-6 rounded-lg shadow-lg flex items-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:translate-y-1"
//           onClick={() => handleCardClick("Companies")}
//         >
//           <FaHome size={30} className="mr-4 animate-pulse" />
//           <div>
//             <h2 className="text-xl font-bold tracking-wider">Companies</h2>
//             <p className="text-2xl font-semibold">10</p>
//           </div>
//         </div>
//         <div
//           className="bg-gradient-to-r from-red-500 via-pink-600 to-purple-600 text-white p-6 rounded-lg shadow-lg flex items-center cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:translate-y-1"
//           onClick={() => handleCardClick("Recovery Officer")}
//         >
//           <FaUser size={30} className="mr-4 animate-pulse" />
//           <div>
//             <h2 className="text-xl font-bold tracking-wider">Recovery Officer</h2>
//             <p className="text-2xl font-semibold">40</p>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">Sales Overview</h2>
//           <Line data={lineChartData} />
//         </div>

//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">Sales Distribution</h2>
//           <Doughnut data={doughnutChartData} />
//         </div>
//       </div>

//       {/* Calendar Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="bg-white rounded-lg shadow-lg p-6">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">Calendar</h2>
//           <Calendar value={date} onChange={setDate} />
//         </div>
//       </div>

//       {/* Popup */}
//       {popupData && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-500 opacity-100">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 transform transition-all duration-500 scale-100">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">{popupData.title}</h2>
//             <ul className="list-disc pl-6 text-gray-600">
//               {popupData.data.map((item, index) => (
//                 <li key={index}>{item}</li>
//               ))}
//             </ul>
//             <button
//               onClick={closePopup}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transform transition-all duration-300 hover:scale-105"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;



import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
// import { useState } from "react";
// import { FiCheckCircle, FiXCircle, FiBell, FiList } from "react-icons/fi";
import { FaDollarSign, FaChartLine, FaEye, FaShoppingCart } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, ArcElement, BarElement);

const Dashboard = () => {
  // const [todoItems, setTodoItems] = useState([
  //   { id: 1, text: "Finish financial report", inProgress: false, completed: false },
  //   { id: 2, text: "Review project deadlines", inProgress: false, completed: false },
  //   { id: 3, text: "Respond to client emails", inProgress: false, completed: false },
  //   { id: 4, text: "Prepare presentation for meeting", inProgress: false, completed: false },
  //   { id: 5, text: "Organize team building event", inProgress: false, completed: false },
  //   { id: 6, text: "Draft new marketing strategy", inProgress: false, completed: false },
  // ]);
  // const [doItems, setDoItems] = useState([
  //   { id: 7, text: "Update website content", inProgress: true, completed: false },
  //   { id: 8, text: "Analyze monthly sales data", inProgress: true, completed: false },
  // ]);
  // const [doneItems, setDoneItems] = useState([
  //   { id: 9, text: "Submit quarterly budget report", inProgress: false, completed: true },
  //   { id: 10, text: "Approve project proposals", inProgress: false, completed: true },
  // ]);

  // const [showModal, setShowModal] = useState(false);
  // const [selectedList, setSelectedList] = useState([]);
  // const [actionHandler, setActionHandler] = useState(() => () => {});
  // const [buttonText, setButtonText] = useState("");

  // Move task from To-Do to Do List
  // const moveToDoList = (id) => {
  //   const task = todoItems.find((item) => item.id === id);
  //   if (task) {
  //     setDoItems((prevDo) => [...prevDo, { ...task, inProgress: true }]);
  //     setTodoItems((prevTodo) => prevTodo.filter((item) => item.id !== id));
  //   }
  // };

  // Move task from Do List to Done List
  // const markAsCompleted = (id) => {
  //   const task = doItems.find((item) => item.id === id);
  //   if (task) {
  //     setDoneItems((prevDone) => [...prevDone, { ...task, completed: true }]);
  //     setDoItems((prevDo) => prevDo.filter((item) => item.id !== id));
  //   }
  // };

  // const renderList = (items, actionHandler, actionLabel, isCompleted = false) =>
  //   items.map((item) => (
  //     <li
  //       key={item.id}
  //       className="flex items-center justify-between py-2 px-3 bg-gray-800 rounded-md mb-2"
  //     >
  //       <span className={`text-sm ${isCompleted ? "line-through text-gray-500" : "text-white"}`}>
  //         {item.text}
  //       </span>
  //       {!isCompleted && (
  //         <button
  //           onClick={() => actionHandler(item.id)}
  //           className="bg-indigo-700 hover:bg-indigo-600 text-white py-1 px-3 rounded-md text-xs"
  //         >
  //           {actionLabel}
  //         </button>
  //       )}
  //     </li>
  //   ));

  // const handleModalOpen = (listType, handler, buttonLabel) => {
  //   setSelectedList(listType);
  //   setActionHandler(() => handler); // Set the appropriate handler for the modal
  //   setButtonText(buttonLabel); // Set the appropriate button label
  //   setShowModal(true);
  // };

  // const handleModalClose = () => {
  //   setShowModal(false);
  // };

  // Get tasks that are not yet moved
  // const getRemainingTasks = (list) => {
  //   const allTasks = {
  //     todo: todoItems,
  //     do: doItems,
  //     done: doneItems,
  //   };

  //   if (list === 'todo') {
  //     return allTasks.todo.slice(4); // Show remaining tasks in To-Do list
  //   } else if (list === 'do') {
  //     return allTasks.do.slice(4); // Show remaining tasks in Do list
  //   } else if (list === 'done') {
  //     return allTasks.done.slice(4); // Show remaining tasks in Done list
  //   }
  //   return [];
  // };

  // Line Chart Data
  const lineChartData = {
    labels: ["Mar 2023", "Jun 2023", "Sep 2023", "Dec 2023", "Mar 2024", "Jun 2024", "Sep 2024", "Dec 2024"],
    datasets: [
      {
        label: "Revenue",
        data: [15000, 18000, 21000, 19000, 22000, 24000, 28000, 30000],
        borderColor: "#4F46E5",
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 5,
        fill: true,
        backgroundColor: "rgba(79, 70, 229, 0.1)",
      },
      {
        label: "Target",
        data: [10000, 12000, 14000, 16000, 18000, 20000, 22000, 24000],
        borderColor: "#F43F5E",
        borderWidth: 3,
        tension: 0.4,
        borderDash: [5, 5],
        pointRadius: 5,
      },
    ],
  };

  // Pie Chart Data
  const pieChartData = {
    labels: ["E-commerce", "Retail", "Wholesale", "Other"],
    datasets: [
      {
        data: [300, 200, 150, 100],
        backgroundColor: ["#4F46E5", "#F43F5E", "#10B981", "#FBBF24"],
        borderWidth: 1,
      },
    ],
  };

  // Bar Chart Data
  const barChartData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Sales",
        data: [5000, 7000, 8000, 6000],
        backgroundColor: "#4F46E5",
        borderColor: "#4F46E5",
        borderWidth: 2,
      },
      {
        label: "Expenses",
        data: [3000, 4000, 4500, 3500],
        backgroundColor: "#F43F5E",
        borderColor: "#F43F5E",
        borderWidth: 2,
      },
    ],
  };

  // Stats Data
  const stats = [
    { title: "Total Income", value: "$32,499.93", percentage: "+12.95%", positive: true, icon: <FaDollarSign className="text-2xl" /> },
    { title: "Profit", value: "$10,499.93", percentage: "-0.33%", positive: false, icon: <FaChartLine className="text-2xl" /> },
    { title: "Total Views", value: "5,211,832", percentage: "+0.32%", positive: true, icon: <FaEye className="text-2xl" /> },
    { title: "Conversion Rate", value: "4.83%", percentage: "+8.05%", positive: true, icon: <FaShoppingCart className="text-2xl" /> },
  ];
  
  return (
    <div className="text-white min-h-screen py-8 px-4">


      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-md rounded-lg p-4 text-center transition-all hover:scale-105"
          >
            <div className="flex justify-center items-center mb-2">{stat.icon}</div>
            <h3 className="text-sm font-medium">{stat.title}</h3>
            <p className="text-xl font-bold">{stat.value}</p>
            <p className={`text-xs ${stat.positive ? "text-green-400" : "text-red-400"}`}>
              {stat.percentage} Compared to last month
            </p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {/* Revenue Over Time */}
        <div className="bg-white shadow-md rounded-lg p-4 transition-all transform hover:scale-105">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Revenue Over Time</h3>
          <div className="h-56">
            <Line data={lineChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Sales by Category */}
        <div className="bg-white shadow-md rounded-lg p-4 transition-all transform hover:scale-105">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Sales by Category</h3>
          <div className="h-56">
            <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-8 transition-all transform hover:scale-105">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Sales vs Expenses</h3>
        <div className="h-56">
          <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
      
      {/* Modal for more tasks */}
      {/* {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <h3 className="text-lg font-semibold mb-4">More Tasks</h3>
            <ul>
              {renderList(
                getRemainingTasks(selectedList),
                actionHandler,
                buttonText
              )}
            </ul>
            <button
              onClick={handleModalClose}
              className="bg-red-600 text-white py-1 px-3 rounded-full mt-4"
            >
              <FiXCircle /> 
            </button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Dashboard;
