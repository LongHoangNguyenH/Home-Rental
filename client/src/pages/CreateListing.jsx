import React, { useState } from "react";
import "../styles/CreateListing.scss";
import Navbar from "../components/Navbar";
import { categories, facilities, types } from "../data";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
const CreateListing = () => {
  const [photos, setPhotos] = useState([]);
  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((previousPhotos) => [...previousPhotos, ...newPhotos]);
  };

  const handleDragPhotos = (result) => {
    if (!result.destination) return;
    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((previousPhotos) =>
      previousPhotos.filter((_, index) => index !== indexToRemove)
    );
  };
  return (
    <>
      <Navbar />
      <div className="create-listing">
        <h1>Publish your Home Rental</h1>
        <form action="">
          <div className="create-listing_step1">
            <h2>Step1: Tell us about your place</h2>
            <br />
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {categories.map((category, index) => (
                <div className="category" key={index}>
                  <div className="category_icon">{category.icon}</div>
                  <p>{category.label}</p>
                </div>
              ))}
            </div>

            <h3>What type of place will guest have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div className="type" key={index}>
                  <div className="type_text">
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>
                  <div className="type_icon">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3>Where's your place located?</h3>
            <div className="full">
              <div className="location">
                <p>Street Address</p>
                <input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Apartment, suite, etc. (if applicable)</p>
                <input
                  type="text"
                  placeholder="Apt, Suite, etc"
                  name="aptSuite"
                  required
                />
              </div>

              <div className="location">
                <p>City</p>
                <input type="text" placeholder="City" name="city" required />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  required
                />
              </div>

              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  required
                />
              </div>
            </div>

            <h3>Share some basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <RemoveCircleOutline
                  sx={{
                    cursor: "pointer",
                    fontSize: "25px",
                    "&:hover": { color: variables.pinkred },
                  }}
                />
                <p>1</p>
                <AddCircleOutline
                  sx={{
                    cursor: "pointer",
                    fontSize: "25px",
                    "&:hover": { color: variables.pinkred },
                  }}
                />
              </div>

              <div className="basic">
                <p>Bedrooms</p>
                <RemoveCircleOutline
                  sx={{
                    cursor: "pointer",
                    fontSize: "25px",
                    "&:hover": { color: variables.pinkred },
                  }}
                />
                <p>1</p>
                <AddCircleOutline
                  sx={{
                    cursor: "pointer",
                    fontSize: "25px",
                    "&:hover": { color: variables.pinkred },
                  }}
                />
              </div>

              <div className="basic">
                <p>Beds</p>
                <RemoveCircleOutline
                  sx={{
                    cursor: "pointer",
                    fontSize: "25px",
                    "&:hover": { color: variables.pinkred },
                  }}
                />
                <p>1</p>
                <AddCircleOutline
                  sx={{
                    cursor: "pointer",
                    fontSize: "25px",
                    "&:hover": { color: variables.pinkred },
                  }}
                />
              </div>

              <div className="basic">
                <p>Bathrooms</p>
                <RemoveCircleOutline
                  sx={{
                    cursor: "pointer",
                    fontSize: "25px",
                    "&:hover": { color: variables.pinkred },
                  }}
                />
                <p>1</p>
                <AddCircleOutline
                  sx={{
                    cursor: "pointer",
                    fontSize: "25px",
                    "&:hover": { color: variables.pinkred },
                  }}
                />
              </div>
            </div>
          </div>

          <div className="create-listing_step2">
            <h2>Step 2: Make your place stand out</h2>
            <br />
            <h3>Tell guests about your place</h3>
            <div className="amenities">
              {facilities?.map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">{item.icon}</div>
                </div>
              ))}
            </div>
          </div>

          
        </form>
      </div>
    </>
  );
};

export default CreateListing;
