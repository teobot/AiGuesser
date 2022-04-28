import dbConnect from "../../../lib/dbConnect";
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
        const image = await ImageItem.findById(id);
        if (!collection) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: image });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const image = await ImageItem.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!collection) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: image });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedImage = await ImageItem.deleteOne({ _id: id });
        if (!deletedImage) {
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
