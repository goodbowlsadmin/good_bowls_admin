import React, { useEffect, useState } from "react";
import Header from "../Header";
import Nav from "../Nav";
import { db } from "../../FirebaseConfig";
import { Rings } from "react-loader-spinner";

const ViewVideo = () => {
  let [categories, setCategory] = useState([]);

  const [loading, setLoading] = useState(true);

  let [input, setInput] = useState("");

  useEffect(() => {
    db.collection("categories")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          var data = element.data();
          setCategory((arr) => [...arr, data]);
          setLoading(false);
        });
      });
  }, []);

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
                Videos
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
                    {categories.length === 0 ? (
                      <>
                        <h2>No Category Found</h2>
                      </>
                    ) : (
                      <>
                        {categories.map((cat, i) => (
                          <>
                            <h2 className="card-header w-100">
                              Categories for {cat.name}
                            </h2>
                            {cat.sub_category === undefined ? (
                              <>
                                <a href={"/category/" + cat.name}>
                                  <div className="col">
                                    <div className="card">
                                      <div className="card-body">
                                        <h5 className="card-title">
                                          View {cat.name}
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                </a>
                              </>
                            ) : (
                              <>
                                {" "}
                                {cat.sub_category.map((sub, i) => (
                                  <>
                                    <a href={"/category/sub/" + sub.text}>
                                      <div className="col">
                                        <div className="card">
                                          <div className="card-body">
                                            <h5 className="card-title">
                                              {sub.text}
                                            </h5>
                                          </div>
                                        </div>
                                      </div>
                                    </a>
                                  </>
                                ))}
                              </>
                            )}
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
    </>
  );
};

export default ViewVideo;
