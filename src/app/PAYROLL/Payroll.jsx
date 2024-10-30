import React, { useState } from "react";
import "./payroll.css"; // Import the CSS file
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function EmployeeForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthday: "",
    contactNo: "",
    address: "",
    rate: 0,
    position: "",
    hoursWorked: 0,
    pagibig: 0,
    philhealth: 0,
    sss: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const calculateDeductions = () => {
    return (
      Number(formData.pagibig) +
      Number(formData.philhealth) +
      Number(formData.sss)
    );
  };

  const calculateTotalSalary = () => {
    const grossSalary = formData.rate * formData.hoursWorked;
    return grossSalary - calculateDeductions();
  };

  const downloadPDF = () => {
    const input = document.getElementById("form-content"); // Get the form content

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190; // Width of A4 page
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("EmployeeForm.pdf"); // Download the PDF
    });
  };

  return (
    <div id="form-content" className="container">
      {" "}
      {/* Added ID for PDF capture */}
      <h2 className="title">Employee Information</h2>
      <form>
        <label className="form-label">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
          />
        </label>

        <label className="form-label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input-field"
          />
        </label>

        <label className="form-label">
          Birthday:
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="input-field"
          />
        </label>

        <label className="form-label">
          Contact No:
          <input
            type="tel"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            className="input-field"
          />
        </label>

        <label className="form-label">
          Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input-field"
          />
        </label>

        <label className="form-label">
          Rate (per hour):
          <input
            type="number"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            className="input-field"
          />
        </label>

        <label className="form-label">
          Position:
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="input-field"
          />
        </label>

        <label className="form-label">
          Hours Worked:
          <input
            type="number"
            name="hoursWorked"
            value={formData.hoursWorked}
            onChange={handleChange}
            className="input-field"
          />
        </label>

        <label className="form-label">
          PAG-IBIG Deduction:
          <input
            type="number"
            name="pagibig"
            value={formData.pagibig}
            onChange={handleChange}
            className="input-field"
          />
        </label>

        <label className="form-label">
          PhilHealth Deduction:
          <input
            type="number"
            name="philhealth"
            value={formData.philhealth}
            onChange={handleChange}
            className="input-field"
          />
        </label>

        <label className="form-label">
          SSS Deduction:
          <input
            type="number"
            name="sss"
            value={formData.sss}
            onChange={handleChange}
            className="input-field"
          />
        </label>

        <div className="section">
          <p>
            Total Deduction: <strong>{calculateDeductions()}</strong>
          </p>
          <p>
            Total Salary: <strong>{calculateTotalSalary()}</strong>
          </p>
        </div>

        {/* Button to download PDF */}
        <button type="button" onClick={downloadPDF} className="download-btn">
          Download as PDF
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;
