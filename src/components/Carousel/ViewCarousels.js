import React, { useEffect, useState } from "react";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import Nav from "../Nav";
import "../../App.css";
import moment from "moment";
import toast, { Toaster } from "react-hot-toast";
import { Rings } from "react-loader-spinner";

const ViewCarousels = () => {
  const [loading, setLoading] = useState(true);

  const [carousels, setCarousels] = useState([]);

  /* Fetching data from firebase and setting it to the state. */

  const getCarousels = () => {
    db.collection("carousels_item")
      .orderBy("createdAt", "desc")
      .limit(5)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          setCarousels((arr) => [...arr, element.data()]);
        });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCarousels();
  }, []);

  /**
   * It deletes a document from the database.
   * @param name - The name of the banner
   */
  const onDelete = (img) => {
    db.collection("carousels_item")
      .where("img", "==", img)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              toast.success("Carousel Deleted Successfully");
              getCarousels();
            })
            .catch((err) => {
              toast.error(err.message);
            });
        });
      })
      .catch((err) => {
        toast.error(err.message);
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
                Carousels
              </h4>
              <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
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
                    {carousels.length === 0 ? (
                      <>
                        <h2>No Carousel Found</h2>
                      </>
                    ) : (
                      <>
                        {carousels.map((carousel, i) => (
                          <>
                            <div
                              className="col"
                              id={carousel.img}
                              key={`carousel-${i}`}
                            >
                              <div className="card">
                                <img
                                  className="card-img-top image"
                                  src={carousel.img}
                                  alt={carousel.img}
                                />
                                <div className="card-body">
                                  <h5 className="card-title">{`Carousel-${
                                    i + 1
                                  }`}</h5>
                                  <h6 className="card-title">
                                    {moment(carousel.date).format(
                                      "MMM DD YYYY"
                                    )}
                                  </h6>
                                  <button
                                    className="btn btn-outline-danger"
                                    onClick={() => onDelete(carousel.img)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ViewCarousels;
