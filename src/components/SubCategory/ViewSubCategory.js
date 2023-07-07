import React, { useEffect, useState } from "react";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import Nav from "../Nav";
import "../../App.css";
import toast, { Toaster } from "react-hot-toast";
import $ from "jquery";
import { Rings } from "react-loader-spinner";
import firebase from "firebase/compat/app";

const ViewSubCategory = () => {
  const [loading, setLoading] = useState(true);

  let [categories, setCategory] = useState([]);

  const [Delete, setDelete] = useState(false);

  let [input, setInput] = useState("");

  /* Fetching data from firebase and setting it to the state. */
  useEffect(() => {
    db.collection("categories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          setCategory((arr) => [...arr, data]);
          setLoading(false);
        });
      })
      .catch((err) => {});
  }, []);

  /**
   * It deletes a category and all the templates associated with it
   * @param name - the name of the category
   * @returns the batch.commit() function.
   */
  const deleteCategory = (id, name, index) => {
    setDelete(true);
    let data = [];

    db.collection("categories")
      .doc(name)
      .get()
      .then((querySnapshot) => {
        let array = querySnapshot.data();
        let sub = array.sub_category;
        sub.splice(index, 1);
        data = [...sub];
        db.collection("categories")
          .doc(name)
          .update({
            sub_category: firebase.firestore.FieldValue.delete(),
          })
          .then(() => {
            toast.success("Sub Category Removed");
            $("#" + id).fadeOut();
            setDelete(false);
          });
        db.collection("categories")
          .doc(name)
          .update({
            sub_category: data,
          })
          .then(() => {});
      })
      .catch((err) => {});
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  if (input.length > 0) {
    const lower_input = input.toLowerCase();
    categories = categories.filter((cat) => {
      return cat.name.toLowerCase().match(lower_input);
    });
  }

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
                Sub Categories
              </h4>
              <div className="navbar-nav align-items-center">
                <div className="nav-item d-flex align-items-center w-100">
                  <i className="bx bx-search fs-4 lh-0" />
                  <input
                    type="text"
                    className="form-control border-0 shadow-none"
                    placeholder="Search For Categories..."
                    aria-label="Search..."
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <br />
              <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                {loading === true ? (
                  <>
                    <h2>
                      {" "}
                      <Rings
                        height="80"
                        width="80"
                        color="#456CCF"
                        radius="6"
                        visible={true}
                        ariaLabel="rings-loading"
                      />
                      Loading Data....
                    </h2>
                  </>
                ) : (
                  <>
                    {categories.length === 0 ? (
                      <>
                        <h2>No Category Found</h2>
                      </>
                    ) : (
                      <>
                        {Delete === true ? (
                          <>
                            <div className="col-lg-12">
                              <h4>Deleting Data...</h4>
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                        {categories.map((cat, i) => (
                          <>
                            <div className="col-lg-12" id={cat.name}>
                              <h2>{cat.name}</h2>

                              {cat.sub_category === undefined ? (
                                <>
                                  <h4> No Sub categories Found</h4>
                                </>
                              ) : (
                                <>
                                  <div className="row">
                                    {cat.sub_category.map((sub, i) => (
                                      <>
                                        <div
                                          className="col-md-3 mt-3"
                                          id={sub.id}
                                        >
                                          <div className="card">
                                            <div className="card-body">
                                              <h5 className="card-title">
                                                {sub.text}
                                              </h5>
                                              <button
                                                className="btn btn-outline-danger"
                                                onClick={() => {
                                                  deleteCategory(
                                                    sub.id,
                                                    cat.name,
                                                    i
                                                  );
                                                }}
                                              >
                                                Delete
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    ))}
                                  </div>
                                </>
                              )}
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

export default ViewSubCategory;
