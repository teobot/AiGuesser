import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
  name: String,
  images: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ImageItem",
    },
  ],
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  }
});

export default mongoose.models.Collection || mongoose.model("Collection", CollectionSchema);