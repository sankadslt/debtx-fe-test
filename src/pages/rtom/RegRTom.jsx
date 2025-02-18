  import { useState } from "react";
  import { Link } from "react-router-dom";
  import GlobalStyle from "../../assets/prototype/GlobalStyle";
  import { registerRTOM } from "../../services/rtom/RtomService";
  import Swal from "sweetalert2";

  const RegRTom = () => {
    const [formData, setFormData] = useState({
      area_name: "",
      rtom_abbreviation: "",
      rtom_contact_number: "",
      rtom_fax_number: "",
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;

      if (
        (name === "rtom_contact_number" || name === "rtom_fax_number") &&
        value.length > 10
      ) {
        return; 
      }

      let updatedValue = value.replace(/[^0-9]/g, '');
      if (updatedValue.length > 10) return;
 

      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.area_name || !formData.rtom_abbreviation || !formData.rtom_contact_number || !formData.rtom_fax_number) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please fill in all required fields.",
          confirmButtonColor: "#d33",
        });
        return;
      }

      if (formData.rtom_contact_number.length !== 10) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Contact number must be exactly 10 digits.",
          confirmButtonColor: "#f1c40f",
        });
        return;
      }

      if (formData.rtom_fax_number.length !== 10) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Fax number must be exactly 10 digits.",
          confirmButtonColor: "#f1c40f",
        });
        return;
      }

      try {
        const response = await registerRTOM(formData);

        if (response.status === "success") {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "RTOM registered successfully!",
            confirmButtonColor: "#28a745",
          });
          
          // Clear the form
          setFormData({
            area_name: "",
            rtom_abbreviation: "",
            rtom_contact_number: "",
            rtom_fax_number: "",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: response.message || 
              "Failed to register RTOM.",
            confirmButtonColor: "#d33",
          });
        }
      } catch (error) {
        console.error("Error while registering RTOM:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    };

    return (
      <div className={GlobalStyle.fontPoppins}>
        <div className={`${GlobalStyle.headingLarge} mb-8`}>
          <span>Register new RTOM Area</span>
        </div>
        <div className="flex justify-center">
          <div className={`${GlobalStyle.cardContainer} p-4`}>
            <form onSubmit={handleSubmit}>
              <table className="mb-8 w-full">
                <tbody>
                  <tr>
                    <td>
                      <label className={`${GlobalStyle.headingMedium}`}>
                        RTOM Name
                      </label>
                    </td>
                    <td>:</td>
                    <td>
                      <input
                        type="text"
                        name="area_name"
                        value={formData.area_name}
                        onChange={handleInputChange}
                        className={`${GlobalStyle.inputText}`}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className={`${GlobalStyle.headingMedium}`}>
                        Abbreviation
                      </label>
                    </td>
                    <td>:</td>
                    <td>
                      <input
                        type="text"
                        name="rtom_abbreviation"
                        value={formData.rtom_abbreviation}
                        onChange={handleInputChange}
                        className={`${GlobalStyle.inputText}`}
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className={`${GlobalStyle.headingMedium}`}>
                        Telephone Number
                      </label>
                    </td>
                    <td>:</td>
                    <td>
                      <input
                        type="text"
                        name="rtom_contact_number"
                        value={formData.rtom_contact_number}
                        onChange={handleInputChange}
                        className={`${GlobalStyle.inputText}`}
                        maxLength="10"
                        required
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className={`${GlobalStyle.headingMedium}`}>
                        Fax No
                      </label>
                    </td>
                    <td>:</td>
                    <td>
                      <input
                        type="text"
                        name="rtom_fax_number"
                        value={formData.rtom_fax_number}
                        onChange={handleInputChange}
                        className={`${GlobalStyle.inputText}`}
                        maxLength="10"
                        required
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-end">
                <button type="submit" className={`${GlobalStyle.buttonPrimary}`}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

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

  export default RegRTom;

