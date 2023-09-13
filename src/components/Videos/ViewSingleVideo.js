import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import $ from "jquery";
import Header from "../Header";
import Nav from "../Nav";
import { db } from "../../FirebaseConfig";
import toast, { Toaster } from "react-hot-toast";
import { Rings } from "react-loader-spinner";

const ViewSingleVideo = () => {
  const [video, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const get_data = async () => {
      await db
        .collection("videos")
        .where("category", "==", params.cat)
        .get()
        .then((querySnapshot) => {
          const posts = querySnapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }));

          if (posts.length === 0) {
            setLoading(false);
          } else {
            setVideos(posts);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };

    get_data();
  }, [params.cat]);

  const deletevideo = (id) => {
    db.collection("videos")
      .doc(id)
      .delete()
      .then((res) => {
        $("#" + id).fadeOut();
        toast.success("Video Deleted Successfully");
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
            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold py-3 mb-4">
                <span className="text-muted fw-light">{process.env.REACT_APP_NAME} /</span> View
                Video
              </h4>

              {loading === true ? (
                <>
                  <h2>
                    <Rings
                      height="80"
                      width="80"
                      color="#456CCF"
                      radius="6"
                      visible={true}
                      ariaLabel="rings-loading"
                    />
                    Loading Data
                  </h2>
                </>
              ) : (
                <>
                  {video.length === 0 ? (
                    <>
                      <h2>No Data Found</h2>
                      <Link to={"/Add-Video"}>
                        <button
                          className="btn btn-primary"
                        >
                          Add Video
                        </button>
                      </Link>
                    </>
                  ) : (
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                      <>
                        {video.map((tem, i) => (
                          <>
                            <div className="col" id={tem.id}>
                              <div className="card">
                                <img
                                  className="card-img-top"
                                  src={tem.thumb_img}
                                  alt={tem.thumb_img}
                                />
                                <div className="card-body">
                                  <h5 className="card-title">
                                    {tem.sub_category}
                                  </h5>
                                  <h6 className="card-title">{tem.category}</h6>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      deletevideo(tem.id);
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                      </>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ViewSingleVideo;
