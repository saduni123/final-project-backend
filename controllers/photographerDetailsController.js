import PhotographerDetails from "../models/PhotographerDetails.js";

export const addPhotographerDetails = async (req, res) => {
  try {
    const { photographerId, name, email, contact, address, price } = req.body;

    let details = await PhotographerDetails.findOne({ photographerId });
    if (details) {
      details.contact = contact;
      details.address = address;
      details.price = price;
      await details.save();
    } else {
      details = new PhotographerDetails({ photographerId, name, email, contact, address, price });
      await details.save();
    }

    res.status(200).json(details);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPhotographerDetails = async (req, res) => {
  try {
    const details = await PhotographerDetails.findOne({ photographerId: req.params.photographerId });
    res.status(200).json(details);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
