import React from "react";

import CollectionForm from "../../components/CollectionForm";

import dbConnect from "../../lib/dbConnect";
import ImageItem from "../../models/ImageItem";

export default function Index({ availableImages }) {
  const collectionForm = {
    name: "",
    images: [],
  };
  return (
    <CollectionForm
      formId="new-collection-form"
      collectionForm={collectionForm}
      availableImages={availableImages}
    />
  );
}

export async function getServerSideProps({ params }) {
  await dbConnect();

  const availableImages = await ImageItem.find({});

  return {
    props: { availableImages: JSON.parse(JSON.stringify(availableImages)) },
  };
}
