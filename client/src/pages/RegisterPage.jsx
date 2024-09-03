import React, { useEffect, useState } from "react";
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom";


const RegisterPage = () => {
  const [formData, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const navigate = useNavigate();
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword ||
        formData.confirmPassword === ""
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const register_form = new FormData();
      for (var key in formData) {
        register_form.append(key, formData[key]);
      }
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form,
      });

      console.log(response);
      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.log("Registration failed", error.message);
    }
  };

  console.log(formData);
  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstName"
            onChange={handleOnChange}
            value={formData.firstName}
            required
          />
          <input
            placeholder="Last Name"
            name="lastName"
            onChange={handleOnChange}
            value={formData.lastName}
            required
          />
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleOnChange}
            value={formData.email}
            required
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleOnChange}
            value={formData.password}
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={handleOnChange}
            value={formData.confirmPassword}
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Password do not match</p>
          )}

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleOnChange}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add proifle photo" />
            <p>Upload your photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          )}

          <button type="submit">Register</button>
        </form>
        <a href="/login">Already have an account?</a>
      </div>
    </div>
  );
};

export default RegisterPage;
