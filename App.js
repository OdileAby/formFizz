import React, { useState } from "react";
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({
        ...formData,
        file: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("firstName", formData.firstName);
    formPayload.append("lastName", formData.lastName);
    formPayload.append("phone", formData.phone);
    formPayload.append("email", formData.email);
    if (formData.file) {
      formPayload.append("file", formData.file);
    }

    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        body: formPayload,
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          file: null,
        });
      } else {
        alert("Error submitting form");
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("Error submitting form");
    }
  };

  return (
    <div className="App">
      <div className="welcome-header">
        <h1>WELCOME TO FORMFIZZ!</h1>
      </div>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Upload File (Image, Video, Document)</label>
          <input
            type="file"
            name="file"
            accept="image/*,video/*,.pdf,.doc,.docx,.ppt,.pptx,.txt"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
