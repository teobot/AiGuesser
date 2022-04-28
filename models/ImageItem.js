import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  question: String,
  answer: String,
  url: String,
  difficulty: String
});

export default mongoose.models.ImageItem || mongoose.model("ImageItem", ImageSchema);