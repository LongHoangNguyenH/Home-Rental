import React, { useState } from "react";
import "../styles/Register.scss";

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
    const {name, value, files} = e.target;
    setFormdata({
        ...formData,
        [name]: value,
        [name]: name === 'profileImage' ? files[0] : value
    })
  }
  console.log(formData);
  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form">
          <input placeholder="First Name" name="firstName" onChange={handleOnChange} required />
          <input placeholder="Last Name" name="lastName" onChange={handleOnChange} required />
          <input placeholder="Email" name="email" type="email" onChange={handleOnChange} required />
          <input
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleOnChange}
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            type="password"
            onChange={handleOnChange}
            required
          />
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
