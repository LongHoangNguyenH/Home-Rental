const router = require("express").Router();
const multer = require("multer");
const jwt = require("jsonwebtoken");

const Listing = require("../model/Listing");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const listingPhotos = req.files;
    if (!listingPhotos) {
      return res.status(400).json({ message: "No photos uploaded" });
    }

    const listingPhotoPaths = listingPhotos.map((photo) => photo.path);

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    await newListing.save();
    res.status(201).json({ message: "Listing created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/* GET lISTINGS BY CATEGORY */
router.get("/", async (req, res) => {
  const qCategory = req.query.category;
  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate("creator");
    } else {
      listings = await Listing.find().populate("creator");
    }
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Failed to get listings", error: error.message });
    console.log(error);
  }
});

/* GET LISTINGS BY SEARCH */
router.get("/search/:search", async(req, res)=>{
  const { search } = req.params
  try{
    let listings = [];
    if(search=="All"){
      listings = await Listing.find().populate("creator")
    }else{
      listings = await Listing.find({
        $or: [
          { category: {$regex: search, $options: "i" } },
          { title: {$regex: search, $options: "i" } },
          { description: {$regex: search, $options: "i" } },
        ]
      }).populate("creator")
      res.status(200).json(listings)
    }
  }catch(err){
    console.log(err)
    res.status(404).json({message: "Failed to search listings", error: err.message})
  }
})

/* LISTING DETAILs  */
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params
    const listing = await Listing.findById(listingId).populate("creator")
    res.status(202).json(listing)
  } catch (err) {
    res.status(404).json({ message: "Listing can not found!", error: err.message })
  }
})

module.exports = router;
