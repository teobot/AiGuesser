import dbConnect from "../lib/dbConnect";

import Collection from "../models/Collection";
import ImageItem from "../models/ImageItem";

import CollectionItem from "../components/CollectionItem";

const Index = ({ collections }) => {
  return (
    <>
      {/* Create a card for each pet */}
      {collections.map((collection) => (
        <CollectionItem key={collection._id} collection={collection} />
      ))}
    </>
  );
};

export async function getServerSideProps() {
  await dbConnect();

  /* find all the data in our database */
  const collections = await Collection.find({}).populate({
    path: "images",
    model: ImageItem,
  });

  return { props: { collections: JSON.parse(JSON.stringify(collections)) } };
}

export default Index;
