import dbConnect from "../../../lib/dbConnect";
import Collection from "../../../models/Collection";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const collections = await Collection.find({});
        res.status(200).json({ success: true, data: collections });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        req.body.images = req.body.images.map((image) => image.value);
        const collection = await Collection.create(req.body);
        res.status(201).json({ success: true, data: collection });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
  }
}
