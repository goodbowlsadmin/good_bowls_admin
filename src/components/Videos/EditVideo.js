/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import firebase from "firebase/compat/app";
import Nav from "../Nav";
import { useParams } from "react-router-dom";
import getAllDocumentNames from "../../helpers/name";

const Days = [
  "Day 1",
  "Day 2",
  "Day 3",
  "Day 4",
  "Day 5",
  "Day 6",
  "Day 7"
];

const EditVideo = () => {

  const [imgloading, setImgLoading] = useState(false);

  const { id } = useParams();

  const [progress, setProgress] = useState(0);

  const [videoImage, setVideoImage] = useState(
    "https://brent-mccardle.org/img/placeholder-image.png"
  );

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

  useEffect(() => {
    const fetchDocumentNames = async () => {
      const collectionName = 'weeks';
      const names = await getAllDocumentNames(collectionName);
      setWeeks(names);
    };

    fetchDocumentNames();
    db.collection('videos').doc(id).get().then((data) => {
      setVideo(data.data());
      setVideoImage(data.data().thumb_img)
    })
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideo((event) => {
      return {
        ...event,
        [name]: value,
      };
    });
  };

  const translate = async (text) => {
    const apiKey = "AIzaSyCbYHye0Yhs7nclncfItXxzfYfr-A0sPf8"; // Replace with your Google Translate API key
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        q: text,
        target: "es", // Translate to Spanish, you can change it to any other language code
      }
    );
    return response.data.data.translations[0].translatedText;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    video.created = firebase.firestore.FieldValue.serverTimestamp();
    video.img = videoImage;

    // Translate fields before updating the video
    const translatedCategory = await translate(video.category);
    const translatedSubCategory = await translate(video.sub_category);
    const translatedTitle = await translate(video.title);
    const translatedDescription = await translate(video.description);
    const translatedWeek = await translate(video.week);
    const translatedDay = await translate(video.day);

    db.collection("videos")
      .doc(id)
      .update({
        id: video.id,
        category: video.category,
        sub_category: video.sub_category,
        thumb_img: videoImage,
        title: video.title,
        description: video.description,
        link: video.link,
        week: video.week,
        day: video.day,
        yt_thumb: video.yt_thumb,
        S_category: translatedCategory,
        S_sub_category: translatedSubCategory,
        S_title: translatedTitle,
        S_description: translatedDescription,
        S_week: translatedWeek,
        S_day: translatedDay,
        updated: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((res) => {
        toast.success("Video Updated Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

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
                              Category
                            </label>
                            <div>
                              <input
                                type="text"
                                className="form-control"
                                id="basic-default-name"
                                placeholder="Category"
                                value={video.category}
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
                                value={video.sub_category}
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
                              value={video.week}
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
                              value={video.day}
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
                                value={video.title}
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
                                value={video.link}
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
                              value={video.description}
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
                              <>
                                <h4>Uploading Image {progress} %</h4>
                              </>
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

export default EditVideo;
