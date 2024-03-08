import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import firebase from "firebase/compat/app";
import Nav from "../Nav";
import { v4 as uuidv4 } from "uuid";
import getAllDocumentNames from "../../helpers/name";
import { sendFCMNotification } from "../../helpers/notification";
import axios from "axios";

const Days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];

const AddTips = () => {
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(true);
  const uid = uuidv4();
  const [weeks, setWeeks] = useState([]);
  const [categories, setCategory] = useState([]);
  const [sub_category, setSubCategory] = useState([]);
  const [tipImage, setTipImage] = useState("https://brent-mccardle.org/img/placeholder-image.png");
  const [imgloading, setImgLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [tip, setTip] = useState({
    category: "",
    sub_category: "",
    title: "",
    description: "",
    week: "",
    day: "",
  });

  const handleTipImage = async (e) => {
    setImgLoading(true);
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
        setImgLoading(false);
        setTipImage(r.data.secure_url);
        toast.success("Tip Image Uploaded Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const get_categories = async () => {
    await db.collection("categories").get().then((doc) => {
      doc.forEach((element) => {
        var data = element.data();
        setCategory((arr) => [...arr, data]);
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    const fetchDocumentNames = async () => {
      const collectionName = 'weeks';
      const names = await getAllDocumentNames(collectionName);
      setWeeks(names);
    };

    fetchDocumentNames();
    get_categories();
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


  const onSubmit = async (e) => {
    e.preventDefault();
    sendFCMNotification(
      "New Tip",
      "A new tip has been added. Please check it out."
    );
    db.collection("push-notifications")
      .doc(uid)
      .set({
        id: uid,
        title: "New Tip",
        body: "A new tip has been added. Please check it out.",
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });
  
    tip.created = firebase.firestore.FieldValue.serverTimestamp();
  
    // Translate each field before adding the tip
    const translatedCategory = await translate(tip.category);
    const translatedSubCategory = await translate(tip.sub_category);
    const translatedWeek = await translate(tip.week);
    const translatedDay = await translate(tip.day);
    const translatedTitle = await translate(tip.title);
    const translatedDescription = await translate(tip.description);
  
    // Store the tip with translated text in Firebase
    db.collection("tips")
      .doc(uid)
      .set({
        id: uid,
        category: tip.category,
        sub_category: tip.sub_category,
        title: tip.title,
        description: tip.description,
        week: tip.week,
        day: tip.day,
        S_category: translatedCategory,
        S_sub_category: translatedSubCategory,
        S_title: translatedTitle,
        S_description: translatedDescription,
        S_week: translatedWeek,
        imageURL: tipImage,
        S_day: translatedDay,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        // Store the translated text with prefix "S_"
        
      })
      .then((res) => {
        toast.success("Tip Added Successfully");
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

  const handleSelectChange = (e) => {
    tip.category = e.target.value;
    db.collection("categories").doc(e.target.value).get()
      .then((querySnapshot) => {
        if (querySnapshot.data().sub_category === undefined) {
          setLoad(false);
        } else {
          setSubCategory(querySnapshot.data().sub_category);
          setLoad(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
                  <span className="text-muted fw-light">{process.env.REACT_APP_NAME} /</span> Add Tip
                </h4>
                {/* Basic Layout & Basic with Icons */}
                <div className="row">
                  {/* Basic Layout */}
                  <div className="col-xxl">
                    <div className="card mb-4">
                      <div className="card-body">
                        <form onSubmit={onSubmit}>
                          <div className="row">
                            <div className="mb-3 col-md-6">
                              <label className="form-label" htmlFor="basic-default-fullname">
                                Select Category
                              </label>
                              <select className="form-select" name="state" onChange={handleSelectChange} required>
                                <option value="" selected disabled>----------------</option>
                                {loading === true ? (
                                  <option>Loading Categories.....</option>
                                ) : (
                                  <>
                                    {categories.map((cat, i) => (
                                      <option value={cat.name} key={i}>
                                        {cat.name}
                                      </option>
                                    ))}
                                  </>
                                )}
                              </select>
                            </div>
                            <div className="mb-3 col-md-6">
                              <label className="form-label" htmlFor="basic-default-fullname">
                                Select Sub-Category
                              </label>
                              <select className="form-select" name="sub_category" required onChange={handleChange}>
                                <option value="" selected disabled>----------------</option>
                                {load === true ? (
                                  <option>Loading Sub Categories</option>
                                ) : (
                                  <>
                                    {sub_category.length === 0 ? (
                                      <></>
                                    ) : (
                                      <>
                                        {sub_category.map((sub, i) => (
                                          <option value={sub.text} key={i}>
                                            {sub.text}
                                          </option>
                                        ))}
                                      </>
                                    )}
                                  </>
                                )}
                              </select>
                            </div>
                          </div>

                          <div className="row">
                            <div className="mb-3 col-md-6">
                              <label className="form-label" htmlFor="basic-default-fullname">
                                Select Week
                              </label>
                              <select className="form-select" name="week" onChange={handleChange} required>
                                <option value="" selected disabled>----------------</option>
                                {weeks.map((week, i) => (
                                  <option value={week} key={i}>
                                    {week}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="mb-3 col-md-6">
                              <label className="form-label" htmlFor="basic-default-fullname">
                                Select Day
                              </label>
                              <select className="form-select" name="day" required onChange={handleChange}>
                                <option value="" selected disabled>----------------</option>
                                {Days.map((day, i) => (
                                  <option value={day} key={i}>
                                    {day}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="row">
                            <div className="mb-3 col-md-6">
                              <label className="form-label" htmlFor="basic-default-fullname">
                                Add Title
                              </label>
                              <div>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="basic-default-name"
                                  placeholder="John Doe"
                                  name="title"
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label className="form-label" htmlFor="basic-default-fullname">
                              Add Description
                            </label>
                            <div>
                              <textarea
                                type="text"
                                className="form-control"
                                id="basic-default-name"
                                placeholder="John Doe"
                                name="description"
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="row mb-3">
                            <label className="col-sm-2 col-form-label" htmlFor="basic-default-company">
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
                              {imgloading === true ? (
                                <h4>Uploading Image {progress} %</h4>
                              ) : (
                                <></>
                              )}
                              <img
                                src={tipImage}
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
                              >
                                ADD
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


export default AddTips;
