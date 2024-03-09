import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import firebase from "firebase/compat/app";
import Nav from "../Nav";
import { useParams } from "react-router-dom";
import getAllDocumentNames from "../../helpers/name";
import axios from "axios";

const Days = [
  "Day 1",
  "Day 2",
  "Day 3",
  "Day 4",
  "Day 5",
  "Day 6",
  "Day 7"
];

const EditTip = () => {

  const { id } = useParams();

  const [weeks, setWeeks] = useState([]);

  const [progress, setProgress] = useState(0);

  const [imageLoading, setImageLoading] = useState(false);

  const [imageURL, setImageURL] = useState("https://brent-mccardle.org/img/placeholder-image.png");

  const [tip, setTip] = useState({
    category: "",
    sub_category: "",
    title: "",
    description: "",
    week: "",
    imageURL: "",
    day: "",
  });

  useEffect(() => {
    db.collection('tips').doc(id).get().then((data) => {
      setTip(data.data());
      setImageURL(data.data().imageURL ?? "https://brent-mccardle.org/img/placeholder-image.png");
    })
  }, [id])


  useEffect(() => {
    const fetchDocumentNames = async () => {
      const collectionName = 'weeks';
      const names = await getAllDocumentNames(collectionName);
      setWeeks(names);
    };

    fetchDocumentNames();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTip((event) => {
      return {
        ...event,
        [name]: value,
      };
    });
  };

  const handleTipImage = async (e) => {
    setImageLoading(true);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "postss");

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
        setImageLoading(false);
        setImageURL(r.data.secure_url);
        toast.success("Post Image Uploaded Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // const translateText = async (text) => {
  //   const apiKey = "AIzaSyCbYHye0Yhs7nclncfItXxzfYfr-A0sPf8";
  //   try {
  //     const response = await axios.post(
  //       `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
  //       {
  //         q: text,
  //         target: "es", // Translate to Spanish
  //       }
  //     );
  //     return response.data.data.translations[0].translatedText;
  //   } catch (error) {
  //     console.error("Translation Error:", error);
  //     return text; // Return the original text in case of error
  //   }
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    tip.created = firebase.firestore.FieldValue.serverTimestamp();

    // Translate each field before updating the tip
    const translatedCategory = await translate(tip.category);
    const translatedSubCategory = await translate(tip.sub_category);
    const translatedTitle = await translate(tip.title);
    const translatedDescription = await translate(tip.description);
    const translatedWeek = await translate(tip.week);
    const translatedDay = await translate(tip.day);

    // Update the tip with translated text in Firebase
    db.collection("tips")
      .doc(id)
      .update({
        id: tip.id,
        category: tip.category,
        sub_category: tip.sub_category,
        title: tip.title,
        description: tip.description,
        imageURL: tip.imageURL,
        week: tip.week,
        day: tip.day,
        S_category: translatedCategory,
        S_sub_category: translatedSubCategory,
        S_title: translatedTitle,
        S_description: translatedDescription,
        S_week: translatedWeek,
        S_day: translatedDay,
        updated: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((res) => {
        toast.success("Tip Updated Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });

      async function translate(text) {
        const apiKey = "AIzaSyCbYHye0Yhs7nclncfItXxzfYfr-A0sPf8";
        const response = await axios.post(
          `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
          {
            q: text,
            target: "es", // Translate to Spanish
          }
        );
        return response.data.data.translations[0].translatedText;
      }   
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
                  <span className="text-muted fw-light">{process.env.REACT_APP_NAME} /</span> Edit
                  Tip
                </h4>
                {/* Basic Layout & Basic with Icons */}
                <div className="row">
                  {/* Basic Layout */}
                  <div className="col-xxl">
                    <div className="card mb-4">
                      <div className="card-body">
                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label
                              className="form-label"
                              htmlFor="basic-default-fullname"
                            >
                              Category
                            </label>
                            <div>
                              <input
                                type="text"
                                className="form-control"
                                id="basic-default-name"
                                placeholder="Category"
                                value={tip.category}
                                disabled
                              />
                            </div>

                          </div>
                          <div className="mb-3 col-md-6">
                            <label
                              className="form-label"
                              htmlFor="basic-default-fullname"
                            >
                              Sub Category
                            </label>
                            <div>
                              <input
                                type="text"
                                className="form-control"
                                id="basic-default-name"
                                value={tip.sub_category}
                                placeholder="Sub Category"
                                disabled
                              />
                            </div>

                          </div>
                        </div>

                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label
                              className="form-label"
                              htmlFor="basic-default-fullname"
                            >
                              Select Week
                            </label>
                            <select
                              className="form-select"
                              name="week"
                              onChange={handleChange}
                              required
                              value={tip.week}
                            >
                              <option selected>----------------</option>
                              {weeks.map((week, i) => (
                                <>
                                  <option value={week} key={i}>
                                    {week}
                                  </option>
                                </>))}
                            </select>
                          </div>
                          <div className="mb-3 col-md-6">
                            <label
                              className="form-label"
                              htmlFor="basic-default-fullname"
                            >
                              Select Day
                            </label>
                            <select
                              className="form-select"
                              name="day"
                              required
                              value={tip.day}
                              onChange={handleChange}
                            >
                              <option selected>----------------</option>
                              {Days.map((day, i) => (
                                <>
                                  <option value={day} key={i}>
                                    {day}
                                  </option>
                                </>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="row">
                          <div className="mb-3 col-md-6">
                            <label
                              className="form-label"
                              htmlFor="basic-default-fullname"
                            >
                              Add Title
                            </label>
                            <div>
                              <input
                                type="text"
                                className="form-control"
                                id="basic-default-name"
                                placeholder="John Doe"
                                name="title"
                                value={tip.title}
                                onChange={handleChange}
                              />
                            </div>

                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            className="form-label"
                            htmlFor="basic-default-fullname"
                          >
                            Add Description
                          </label>
                          <div>
                            <textarea
                              type="text"
                              className="form-control"
                              id="basic-default-name"
                              placeholder="John Doe"
                              value={tip.description}
                              name="description"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            className="col-sm-2 col-form-label"
                            htmlFor="basic-default-company"
                          >
                            Tip Image / Icon
                          </label>

                          <div className="col-sm-10">
                            <input
                              type="file"
                              className="form-control"
                              id="inputGroupFile02"
                              accept=".jpg, .jpeg, .png"
                              onChange={handleTipImage}
                            />
                            <br />
                            {imageLoading === true ? (
                              <>
                                <h4>Uploading Image {progress} %</h4>
                              </>
                            ) : (
                              <></>
                            )}
                            <img
                              src={imageURL}
                              className="image"
                              alt="uploading_image"
                            />
                          </div>
                        </div>
                        <div className="row justify-content-end">
                          <div className="col-sm-10">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={onSubmit}
                            >
                              Update
                            </button>
                          </div>
                        </div>
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

export default EditTip;
