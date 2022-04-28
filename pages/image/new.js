import React from "react";
import ImageForm from "../../components/ImageForm";

export default function Index() {
  const imageForm = {
    name: "",
    images: [],
  };
  return <ImageForm formId="new-image-form" imageForm={imageForm} />;
}
