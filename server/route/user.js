const router = require("express").Router();
const Booking = require("../model/Booking");
const User = require("../model/User");
const Listing = require("../model/Listing");
/* Get trip list */
router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params;
    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(202).json(trips);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: "cannot find trips", error: error.message });
  }
});

/* ADD LISTING TO WISH LIST*/
router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator");

    const favoriteList = user.wishList.find(
      (item) => item._id.toString() === listingId
    );

    if (favoriteList) {
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      await user.save();
      res.status(200).json({
        message: "listing removed from wish list",
        wishList: user.wishList,
      });
    } else {
      user.wishList.push(listing);
      await user.save();
      res.status(200).json({
        message: "listing added from wish list",
        wishList: user.wishList,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "cannot add listing to wish list",
      error: error.message,
    });
  }
});

/* GET PROPERTY LIST */
router.get("/:userId/properties", async (req, res) => {
  try {
    const { userId } = req.params;
    const properties = await Listing.find({ creator: userId }).populate(
      "creator"
    );
    res.status(200).json(properties);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ message: "cannot find properties", error: error.message });
  }
});

module.exports = router;
