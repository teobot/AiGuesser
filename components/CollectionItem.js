import React from "react";
import Link from "next/link";

export default function CollectionItem({ collection }) {
  const handleDelete = async () => {
    const collectionID = collection._id;
    try {
      await fetch(`/api/collections/${collectionID}`, {
        method: "DELETE",
      });
      // send the user back to the collections page
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={collection._id}>
      <div className="card">
        <img
          src={
            collection.images.length > 0
              ? collection.images[0].url
              : "https://github.com/teobot/AiGuesser-bucket/blob/main/animals/ai_gen_zebra_5.png?raw=true"
          }
        />
        <h5 className="pet-name">{collection.name}</h5>
        <div className="main-content">
          <p className="pet-name">{collection.name}</p>
          {/* <p className="owner">Owner: {pet.owner_name}</p> */}

          {/* Extra Pet Info: Likes and Dislikes */}
          <div className="likes info">
            <p className="label">Likes {collection.likes}</p>
          </div>
          <div className="dislikes info">
            <p className="label">Dislikes</p>
          </div>

          <div className="btn-container">
            <Link
              href="/collection/[id]/edit"
              as={`/collection/${collection._id}/edit`}
            >
              <button className="btn edit">Edit</button>
            </Link>
            <Link href="/collection/[id]" as={`/collection/${collection._id}`}>
              <button className="btn view">View</button>
            </Link>
            <button className="btn delete" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
