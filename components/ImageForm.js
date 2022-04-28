import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";

export default function ImageForm({ formId, imageForm, forNewImage = true }) {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    question: imageForm.question,
    answer: imageForm.answer,
    url: imageForm.url,
    difficulty: imageForm.difficulty,
  });

  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/image/${id}`, {
        method: "PUT",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/image/${id}`, data, false); // Update the local data without a revalidation
      router.push("/");
    } catch (error) {
      setMessage("Failed to update image");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch("/api/image", {
        method: "POST",
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/");
    } catch (error) {
      setMessage("Failed to add image");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();
    if (Object.keys(errs).length === 0) {
      forNewImage ? postData(form) : putData(form);
    } else {
      setErrors({ errs });
    }
  };

  /* Makes sure pet info is filled for pet name, owner name, species, and image url*/
  const formValidate = () => {
    let err = {};
    if (!form.question) err.question = "Question is required";
    if (!form.answer) err.answer = "Answer is required";
    if (!form.url) err.url = "Image URL is required";
    if (!form.difficulty) err.difficulty = "Difficulty is required";
    return err;
  };

  return (
    <>
      <form id={formId} onSubmit={handleSubmit}>
        <label htmlFor="question">Question</label>
        <input
          type="text"
          maxLength="20"
          name="question"
          value={form.question}
          onChange={handleChange}
          required
        />
        <label htmlFor="answer">Answer</label>
        <input
          type="text"
          maxLength="20"
          name="answer"
          value={form.answer}
          onChange={handleChange}
          required
        />
        <label htmlFor="url">Image URL</label>
        <input
          type="text"
          name="url"
          value={form.url}
          onChange={handleChange}
          required
        />
        <label htmlFor="difficulty">Difficulty</label>
        <input
          type="text"
          maxLength="20"
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn">
          Submit
        </button>
      </form>
      <p>{message}</p>
      <div>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </div>
    </>
  );
}
