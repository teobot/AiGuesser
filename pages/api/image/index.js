import dbConnect from "../../../lib/dbConnect";
import ImageItem from "../../../models/ImageItem";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const images = await ImageItem.find({});
        res.status(200).json({ success: true, data: images });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const image = await ImageItem.create(req.body);
        res.status(201).json({ success: true, data: image });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
}
