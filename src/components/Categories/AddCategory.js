import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Header";
import Nav from "../Nav";
import "../../App.css";
import { db } from "../../FirebaseConfig";
import axios from "axios";
import firebase from "firebase/compat/app";

const AddCategory = () => {
  const [categoryImage, setCategoryImage] = useState(
    "https://brent-mccardle.org/img/placeholder-image.png"
  );

  let [progress, setProgress] = useState(0);

  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState({
    name: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((event) => {
      return {
        ...event,
        [name]: value,
      };
    });
  };

  const handleCategoryImage = async (e) => {
    setLoading(true);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "category");

    const config = {
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        let percent = Math.floor((loaded * 100) / total);
        setProgress(percent);
      },
    };

    axios
      .post(
        "https://api.cloudinary.com/v1_1/dzrg2j6mv/image/upload",
        data,
        config
      )
      .then((r) => {
        setLoading(false);
        setCategoryImage(r.data.secure_url);
        toast.success("Image Uploaded Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    category.img = categoryImage;

    // Translate the category name
    const translatedName = await translate(category.name);

    db.collection("categories")
      .doc(category.name) // Store with translated name
      .set({
        S_name: translatedName,
        img: category.img,
        name: category.name, // Add translated name field
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((res) => {
        toast.success("Category Added Successfully");
        setTimeout(() => {
          window.location.reload();
      }, 1000);
        window.location.href = "/Categories";
      })
      .catch((err) => {
        console.log(err);
      });
};

  // Translation function using Google Translate API
  const translate = async (text) => {
        const apiKey = "AIzaSyCbYHye0Yhs7nclncfItXxzfYfr-A0sPf8";
        const response = await axios.post(
            `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
            {
                q: text,
                target: "es", // Translate to Spanish
            }
        );
        return response.data.data.translations[0].translatedText;
    };

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Header />
          <div className="layout-page">
            <Nav />
            <div className="content-wrapper">
              {/* Content */}
              <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                  <span className="text-muted fw-light">{process.env.REACT_APP_NAME} /</span> Add
                  Category
                </h4>
                {/* Basic Layout & Basic with Icons */}
                <div className="row">
                  {/* Basic Layout */}
                  <div className="col-xxl">
                    <div className="card mb-4">
                      <div className="card-body">
                        <form>
                          <div className="row mb-3">
                            <label
                              className="col-sm-2 col-form-label"
                              htmlFor="basic-default-name"
                            >
                              Category Name
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                id="basic-default-name"
                                placeholder="John Doe"
                                name="name"
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label
                              className="col-sm-2 col-form-label"
                              htmlFor="basic-default-company"
                            >
                              Category Image / Icon
                            </label>

                            <div className="col-sm-10">
                              <input
                                type="file"
                                className="form-control"
                                id="inputGroupFile02"
                                accept=".jpg, .jpeg, .png"
                                onChange={handleCategoryImage}
                              />
                              <br />
                              {loading === true ? (
                                <h4>Uploading Image {progress} %</h4>
                              ) : (
                                <></>
                              )}
                              <img
                                src={categoryImage}
                                className="image"
                                alt="uploading_image"
                              />
                            </div>
                          </div>

                          <div className="row justify-content-end">
                            <div className="col-sm-12">
                              <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={onSubmit}
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-backdrop fade" />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default AddCategory;
