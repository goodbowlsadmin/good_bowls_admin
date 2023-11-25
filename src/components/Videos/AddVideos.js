/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import firebase from "firebase/compat/app";
import Nav from "../Nav";
import { v4 as uuidv4 } from "uuid";
import getAllDocumentNames from "../../helpers/name";
import { sendFCMNotification } from "../../helpers/notification";


const Days = [
  "Day 1",
  "Day 2",
  "Day 3",
  "Day 4",
  "Day 5",
  "Day 6",
  "Day 7"
];

const AddVideos = () => {
  const [loading, setLoading] = useState(true);

  const [imgloading, setImgLoading] = useState(false);

  const [load, setLoad] = useState(true);

  const uid = uuidv4();

  const [progress, setProgress] = useState(0);

  const [videoImage, setVideoImage] = useState(
    "https://brent-mccardle.org/img/placeholder-image.png"
  );

  const [categories, setCategory] = useState([]);

  const [sub_category, setSubCategory] = useState([]);

  const [video, setVideo] = useState({
    category: "",
    sub_category: "",
    title: "",
    description: "",
    thumb_img: "",
    yt_thumb: "",
    link: "",
    week: "",
    day: "",
  });

  const [weeks, setWeeks] = useState([]);

  let yt_thumb = "https://brent-mccardle.org/img/placeholder-image.png";

  const getYoutbeThumbnail = (url) => {
    const video_id = url.split("v=")[1].substring(0, 11);
    const yt_thumb = `https://img.youtube.com/vi/${video_id}/0.jpg`;
    console.log(yt_thumb);
    return yt_thumb;
  }

  const get_categories = async () => {
    await db
      .collection("categories")
      .get()
      .then((doc) => {
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

  const handlevideoImage = async (e) => {
    setImgLoading(true);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "videos");

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
        setVideoImage(r.data.secure_url);
        toast.success("Video Uploaded Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideo((event) => {
      return {
        ...event,
        [name]: value,
      };
    });
  };

  /**
   * When the form is submitted, the video image is set to the videoImage variable, and then the
   * video is added to the database.
   * @param e - event
   */
  const onSubmit = (e) => {
    e.preventDefault();
    sendFCMNotification(
      'New Learning Module',
      'A new learning module has been added. Please check it out.'
    );
    db.collection("push-notifications")
      .doc(uid)
      .set({
        id: uid,
        title: 'New Learning Module',
        body: 'A new learning module has been added. Please check it out.',
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });
    yt_thumb = getYoutbeThumbnail(video.link);
    video.created = firebase.firestore.FieldValue.serverTimestamp();
    video.img = videoImage;
    db.collection("videos")
      .doc(uid)
      .set({
        id: uid,
        category: video.category,
        sub_category: video.sub_category,
        thumb_img: videoImage,
        title: video.title,
        description: video.description,
        link: video.link,
        week: video.week,
        day: video.day,
        yt_thumb: yt_thumb,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((res) => {
        toast.success("Video Added Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  const handleSelectChange = (e) => {
    video.category = e.target.value;
    db.collection("categories")
      .doc(e.target.value)
      .get()
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
                  <span className="text-muted fw-light">{process.env.REACT_APP_NAME} /</span> Add
                  Video
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
                              Select Category
                            </label>
                            <select
                              className="form-select"
                              name="state"
                              onChange={handleSelectChange}
                              required
                            >
                              <option selected>----------------</option>
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
                            <label
                              className="form-label"
                              htmlFor="basic-default-fullname"
                            >
                              Select Sub-Category
                            </label>
                            <select
                              className="form-select"
                              name="sub_category"
                              required
                              onChange={handleChange}
                            >
                              <option selected>----------------</option>
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
                            >
                              <option selected>----------------</option>
                              {weeks.map((week, i) => (
                                <option value={week} key={i}>
                                  {week}
                                </option>
                              ))}
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
                              onChange={handleChange}
                            >
                              <option selected>----------------</option>
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
                                onChange={handleChange}
                              />
                            </div>

                          </div>
                          <div className="mb-3 col-md-6">
                            <label
                              className="form-label"
                              htmlFor="basic-default-fullname"
                            >
                              Add Youtube Link
                            </label>
                            <div>
                              <input
                                type="text"
                                className="form-control"
                                id="basic-default-name"
                                placeholder="https://youtube.com/"
                                name="link"
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
                            Video Image / Icon
                          </label>

                          <div className="col-sm-10">
                            <input
                              type="file"
                              className="form-control"
                              id="inputGroupFile02"
                              accept=".jpg, .jpeg, .png"
                              onChange={handlevideoImage}
                            />
                            <br />
                            {imgloading === true ? (
                              <h4>Uploading Image {progress} %</h4>
                            ) : (
                              <></>
                            )}
                            <img
                              src={videoImage}
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
                              ADD
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

export default AddVideos;
