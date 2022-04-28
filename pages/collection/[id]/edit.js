import { useRouter } from "next/router";
import useSWR from "swr";
import CollectionForm from "../../../components/CollectionForm";

import dbConnect from "../../../lib/dbConnect";
import ImageItem from "../../../models/ImageItem";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

export default function Edit({ availableImages }) {
  const router = useRouter();
  const { id } = router.query;
  
  const { data: collection, error } = useSWR(
    id ? `/api/collections/${id}` : null,
    fetcher
  );

  if (error) return <p>Failed to load</p>;
  if (!collection) return <p>Loading...</p>;

  const collectionForm = {
    name: collection.name,
    images: collection.images,
  };
  return (
    <CollectionForm
      formId="edit-collection-form"
      collectionForm={collectionForm}
      forNewCollection={false}
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
