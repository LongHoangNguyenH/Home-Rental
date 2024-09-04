import React, { useState } from "react";
import "../styles/CreateListing.scss";
import Navbar from "../components/Navbar";
import { categories, facilities, types } from "../data";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoIosImages } from "react-icons/io";
import { BiTrash } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CreateListing = () => {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  /* Location */
  const [formLocation, setFormLocation] = useState({
    streetAddress: "",
    aptSuite: "",
    city: "",
    province: "",
    country: "",
  });

  const handleChangeLocation = (e) => {
    const { name, value } = e.target;
    setFormLocation({
      ...formLocation,
      [name]: value,
    });
  };
  /* Basic Count */
  const [guestCount, SetguestCount] = useState(1);
  const [bedroomCount, SetbedroomCount] = useState(1);
  const [bedCount, SetbedCount] = useState(1);
  const [bathroomCount, SetbathroomCount] = useState(1);

  /* Amenities */
  const [amenities, setAmenities] = useState([]);
  const handleSelectAmenities = (facility) => {
    if (amenities.includes(facility)) {
      setAmenities(amenities.filter((option) => option !== facility));
    } else {
      setAmenities((prev) => [...amenities, facility]);
    }
  };

  /* DESCRIPTION */
  const [formDescription, setFormDescription] = useState({
    title: "",
    description: "",
    highlight: "",
    highlightDesc: "",
    price: 0,
  });
  const handleChangeDescription = (e) => {
    const { name, value } = e.target;
    setFormDescription({
      ...formDescription,
      [name]: value,
    });
  };

  /* UPLOAD, DRAG & DROP, REMOVE PHOTOS */
  const [photos, setPhotos] = useState([]);

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  const handleDragPhoto = (result) => {
    if (!result.destination) return;

    const items = Array.from(photos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPhotos(items);
  };

  const handleRemovePhoto = (indexToRemove) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((_, index) => index !== indexToRemove)
    );
  };
  const navigate = useNavigate();
  const creatorId = useSelector((state) => state.user._id);
  console.log(creatorId, amenities);
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      /* Create a new FormData onject to handle file uploads */
      const listingForm = new FormData();
      listingForm.append("creator", creatorId);
      listingForm.append("category", category);
      listingForm.append("type", type);
      listingForm.append("streetAddress", formLocation.streetAddress);
      listingForm.append("aptSuite", formLocation.aptSuite);
      listingForm.append("city", formLocation.city);
      listingForm.append("province", formLocation.province);
      listingForm.append("country", formLocation.country);
      listingForm.append("guestCount", guestCount);
      listingForm.append("bedroomCount", bedroomCount);
      listingForm.append("bedCount", bedCount);
      listingForm.append("bathroomCount", bathroomCount);
      listingForm.append("amenities", amenities);
      listingForm.append("title", formDescription.title);
      listingForm.append("description", formDescription.description);
      listingForm.append("highlight", formDescription.highlight);
      listingForm.append("highlightDesc", formDescription.highlightDesc);
      listingForm.append("price", formDescription.price);

      /* Append each selected photos to the FormData object */
      photos.forEach((photo) => {
        listingForm.append("listingPhotos", photo);
      });
      /* Send a POST request to server */
      const response = await fetch("http://localhost:3001/properties/create", {
        method: "POST",
        body: listingForm,
      });

      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
      console.log("Publish Listing failed", error.message);
    }
  };
  return (
    <>
      <Navbar />
      <div className="create-listing">
        <h1>Publish your Home Rental</h1>
        <form onSubmit={handlePost}>
          <div className="create-listing_step1">
            <h2>Step1: Tell us about your place</h2>
            <br />
            <h3>Which of these categories best describes your place?</h3>
            <div className="category-list">
              {categories.map((item, index) => (
                <div
                  className={`category ${
                    category === item.label ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => setCategory(item.label)}
                >
                  <div className="category_icon">{item.icon}</div>
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <h3>What type of place will guest have?</h3>
            <div className="type-list">
              {types?.map((item, index) => (
                <div
                  className={`type ${type === item.name ? "selected" : ""}`}
                  key={index}
                  onClick={() => setType(item.name)}
                >
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
                  value={formLocation.streetAddress}
                  onChange={handleChangeLocation}
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
                  value={formLocation.aptSuite}
                  onChange={handleChangeLocation}
                  required
                />
              </div>

              <div className="location">
                <p>City</p>
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  value={formLocation.city}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <div className="half">
              <div className="location">
                <p>Province</p>
                <input
                  type="text"
                  placeholder="Province"
                  name="province"
                  value={formLocation.province}
                  onChange={handleChangeLocation}
                  required
                />
              </div>

              <div className="location">
                <p>Country</p>
                <input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={formLocation.country}
                  onChange={handleChangeLocation}
                  required
                />
              </div>
            </div>

            <h3>Share some basics about your place</h3>
            <div className="basics">
              <div className="basic">
                <p>Guests</p>
                <RemoveCircleOutline
                  onClick={() => {
                    guestCount > 1 && SetguestCount(guestCount - 1);
                  }}
                  sx={{
                    cursor: "pointer",
                    fontSize: "25px",
                    "&:hover": { color: variables.pinkred },
                  }}
                />
                <p>{guestCount}</p>
                <AddCircleOutline
                  onClick={() => {
                    SetguestCount(guestCount + 1);
                  }}
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
                  onClick={() => {
                    bedroomCount > 1 && SetbedroomCount(bedroomCount - 1);
                  }}
                  sx={{
                    cursor: "pointer",
                    fontSize: "25px",
                    "&:hover": { color: variables.pinkred },
                  }}
                />
                <p>{bedroomCount}</p>
                <AddCircleOutline
                  onClick={() => {
                    SetbedroomCount(bedroomCount + 1);
                  }}
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
                  onClick={() => {
                    bedCount > 1 && SetbedCount(bedCount - 1);
                  }}
                  sx={{
                    cursor: "pointer",
                    fontSize: "25px",
                    "&:hover": { color: variables.pinkred },
                  }}
                />
                <p>{bedCount}</p>
                <AddCircleOutline
                  onClick={() => {
                    SetbedCount(bedCount + 1);
                  }}
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
                  onClick={() => {
                    bathroomCount > 1 && SetbathroomCount(bathroomCount - 1);
                  }}
                  sx={{
                    cursor: "pointer",
                    fontSize: "25px",
                    "&:hover": { color: variables.pinkred },
                  }}
                />
                <p>{bathroomCount}</p>
                <AddCircleOutline
                  onClick={() => {
                    SetbathroomCount(bathroomCount + 1);
                  }}
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
                <div
                  className={`facility ${
                    amenities.includes(item.name) ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => handleSelectAmenities(item.name)}
                >
                  <div className="facility_icon">{item.icon}</div>
                </div>
              ))}
            </div>

            <h3>Add some photos of your place</h3>
            <DragDropContext onDragEnd={handleDragPhoto}>
              <Droppable droppableId="photos" direction="horizontal">
                {(provided) => (
                  <div
                    className="photos"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {photos.length < 1 && (
                      <>
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="alone">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}

                    {photos.length >= 1 && (
                      <>
                        {photos.map((photo, index) => {
                          return (
                            <Draggable
                              key={index}
                              draggableId={index.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="photo"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <img
                                    src={URL.createObjectURL(photo)}
                                    alt="place"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePhoto(index)}
                                  >
                                    <BiTrash />
                                  </button>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        <input
                          id="image"
                          type="file"
                          style={{ display: "none" }}
                          accept="image/*"
                          onChange={handleUploadPhotos}
                          multiple
                        />
                        <label htmlFor="image" className="together">
                          <div className="icon">
                            <IoIosImages />
                          </div>
                          <p>Upload from your device</p>
                        </label>
                      </>
                    )}
                  </div>
                )}
              </Droppable>
            </DragDropContext>

            <h3>What make your place attractive and exciting?</h3>
            <div className="description">
              <p>Title</p>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formDescription.title}
                onChange={handleChangeDescription}
                required
              />

              <p>Description</p>
              <input
                type="text"
                placeholder="Description"
                name="description"
                value={formDescription.description}
                onChange={handleChangeDescription}
                required
              />

              <p>Hightlight</p>
              <input
                type="text"
                placeholder="Hightlight"
                name="highlight"
                value={formDescription.highlight}
                onChange={handleChangeDescription}
                required
              />

              <p>Hightlight details</p>
              <textarea
                type="text"
                placeholder="Hightlight details"
                name="highlightDesc"
                value={formDescription.highlightDesc}
                onChange={handleChangeDescription}
                required
              />

              <p>Now, Set your Price</p>
              <span>$</span>
              <input
                type="number"
                placeholder="100"
                name="price"
                className="price"
                value={formDescription.price}
                onChange={handleChangeDescription}
                required
              />
            </div>
          </div>

          <button className="submit_btn" type="submit">
            CREATE YOUR LISTING
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateListing;
