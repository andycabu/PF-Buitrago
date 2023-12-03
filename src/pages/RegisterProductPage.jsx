import Form from "../components/Form";
import useInputState from "../hooks/useInputState";
import { storage, database } from "../../db/firebase";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ref as databaseRef, push } from "firebase/database";
import { useState } from "react";
import ProgressBar from "../components/ProgressBar";

function RegisterProductPage() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const initialState = {
    category: "",
    title: "",
    description: "",
    price: 0,
    rating: {
      count: 0,
      rate: 0,
    },
  };
  const [newProduct, handleChange, setNewProduct] = useInputState(initialState);

  const onInputImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  function writeData(downloadURL) {
    push(databaseRef(database, `/products`), {
      ...newProduct,
      image: downloadURL,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const imageRef = storageRef(storage, `/${image.name}`);
    const uploadTask = uploadBytesResumable(imageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error durante la carga: ", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setNewProduct((prevNewProduct) => ({
            ...prevNewProduct,
            image: downloadURL,
          }));
          writeData(downloadURL);
        });
      }
    );
  };

  const contentForm = [
    {
      id: 1,
      labelText: "Product category",
      name: "category",
      placeholder: "Write the product category",
      typeInput: "text",
      onChange: handleChange,
      textButton: "Save",
    },
    {
      id: 2,
      labelText: "Product title",
      name: "title",
      placeholder: "Write the porduct title",
      typeInput: "text",
      onChange: handleChange,
    },
    {
      id: 3,
      labelText: "Product description",
      name: "description",
      placeholder: "Write the porduct description",
      typeInput: "text",
      onChange: handleChange,
    },
    {
      id: 4,
      labelText: "Product price",
      name: "price",
      placeholder: "Write the porduct price",
      typeInput: "number",
      onChange: handleChange,
      img: {
        labelText: "Upload image",
        onChange: onInputImageChange,
        src: previewUrl,
      },
    },
  ];

  return (
    <>
      <div className="max-w-4xl p-6 mx-auto bg-[var(--card-background-color)] rounded-md shadow-md  ">
        <h1>Create your product</h1>
        <Form
          style="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 text-[var(--text-color)]"
          onSubmit={handleSubmit}
          contentForm={contentForm}
        />
        <div className="pt-4">
          <ProgressBar progress={uploadProgress} />
        </div>
      </div>
    </>
  );
}

export default RegisterProductPage;
