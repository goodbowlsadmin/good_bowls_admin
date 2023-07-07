import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import firebase from "firebase/compat/app";
import Nav from "../Nav";
import { v4 as uuidv4 } from "uuid";

const AddCarousel = () => {
  const [imgloading, setImgLoading] = useState(false);

  const uid = uuidv4();

  const [progress, setProgress] = useState(0);

  const [carousel, setCarousel] = useState(
    "https://brent-mccardle.org/img/placeholder-image.png"
  );

  const handleCarouselImage = async (e) => {
    setImgLoading(true);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "templates");

    const config = {
      onUploadProgress: (e) => {
        const { loaded, total } = e;
        let percent = Math.floor((loaded * 100) / total);
        setProgress(percent);
      },
    };

    axios
      .post(
        "https://api.cloudinary.com/v1_1/dmpux1soj/image/upload",
        data,
        config
      )
      .then((r) => {
        setImgLoading(false);
        setCarousel(r.data.secure_url);
        toast.success("Image Uploaded Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * When the form is submitted, the carousel image is set to the carousel.img variable, and then the
   * carousel is added to the database.
   * @param e - event
   */
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      carousel.img === "https://brent-mccardle.org/img/placeholder-image.png"
    ) {
      toast.error("Please select an image for Carousel!");
    } else {
      db.collection("carousels_item")
        .doc(uid)
        .set({
          img: carousel,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((res) => {
          toast.success("Carousel Added Successfully");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    }
  };

  useEffect(() => {
    console.log({ ...carousel });
  }, [carousel]);

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
                  Carousel
                </h4>
                {/* Basic Layout & Basic with Icons */}
                <div className="row">
                  {/* Basic Layout */}
                  <div className="col-xxl">
                    <div className="card mb-4">
                      <div className="card-body">
                        <div className="row mb-3">
                          <label
                            className="col-sm-2 col-form-label"
                            htmlFor="basic-default-company"
                          >
                            Carousel Image
                          </label>

                          <div className="col-sm-10">
                            <input
                              type="file"
                              className="form-control"
                              id="inputGroupFile02"
                              accept=".jpg, .jpeg, .png"
                              onChange={handleCarouselImage}
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
                              src={carousel}
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
                              Send
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

export default AddCarousel;
