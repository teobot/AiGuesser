import { useState } from "react";
import { useRouter } from "next/router";

import dbConnect from "../../../lib/dbConnect";

import CollectionItem from "../../../components/CollectionItem";

import Collection from "../../../models/Collection";
import ImageItem from "../../../models/ImageItem";

/* Allows you to view pet card info and delete pet card*/
const CollectionPage = ({ collection }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    const collectionID = router.query.id;

    try {
      await fetch(`/api/collections/${collectionID}`, {
        method: "Delete",
      });
      router.push("/");
    } catch (error) {
      setMessage("Failed to delete the collection.");
    }
  };

  return (
    <>
      <CollectionItem collection={collection} />
      <div
        style={{
          backgroundColor: "#f5f5f5",
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          overflowX: "auto",
        }}
      >
        {collection.images.map((image, index) => (
          <img
            style={{ height: 200, width: 200, m: 3, padding: 3 }}
            key={image._id}
            src={image.url}
            alt={image.answer}
          />
        ))}
      </div>
      {message && <p>{message}</p>}
    </>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const collection = await Collection.findById(params.id)
    .populate({
      path: "images",
      model: ImageItem
    })
    .lean();

  collection._id = collection._id.toString();

  return { props: { collection: JSON.parse(JSON.stringify(collection)) } };
}

export default CollectionPage;
