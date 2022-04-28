import dbConnect from "../../../lib/dbConnect";

import Collection from "../../../models/Collection";
import ImageItem from "../../../models/ImageItem";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const collection = await Collection.findById(id)
          .populate({
            path: "images",
            model: ImageItem
          })
          .lean();
        if (!collection) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: collection });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        req.body.images = req.body.images.map((image) => image.value);
        const collection = await Collection.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!collection) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: collection });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedCollection = await Collection.deleteOne({ _id: id });
        if (!deletedCollection) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
