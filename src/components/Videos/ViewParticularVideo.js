import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import Nav from "../Nav";
import $ from "jquery";
import toast, { Toaster } from "react-hot-toast";
import { Rings } from "react-loader-spinner";
import VideoCard from "../VideoCard";

const ViewParticularVideo = () => {
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const get_data = async () => {
      await db
        .collection("videos")
        .where("sub_category", "==", params.cat)
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

  const deletevideos = (id) => {
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
                  {videos.length === 0 ? (
                    <>
                      <h2>No Data Found</h2>
                    </>
                  ) : (
                    <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                      <>
                        {videos.map((tem, i) => (
                          <>
                            <div className="col" id={tem.id}>
                              <div className="card">
                                <VideoCard
                                  video={tem} />
                                <div className="card-body">
                                  <h5 className="card-title">
                                    {tem.sub_category}
                                  </h5>
                                  <h6 className="card-title">{tem.week} , {tem.day}</h6>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                      deletevideos(tem.id);
                                    }}
                                  >
                                    Delete
                                  </button>
                                  <span className="p-2">

                                    <Link to={`/Edit-Video/${tem.id}`}>
                                      <button
                                        className="btn btn-primary"
                                      >
                                        Edit
                                      </button>
                                    </Link>
                                  </span>
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

export default ViewParticularVideo;
