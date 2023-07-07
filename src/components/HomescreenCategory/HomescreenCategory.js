/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import firebase from "firebase/compat/app";
import Nav from "../Nav";
import { v4 as uuidv4 } from "uuid";

const HomescreenCategory = () => {
  const uid = uuidv4();
  const [loading, setLoading] = useState(true);
  const [categories] = useState(new Map());
  const [sub_categories, set_sub_categories] = useState([]);
  const [state, setState] = useState({
    category: "",
    sub_category: "",
    index: -1,
  });

  const initialData = {
    category_1: { index: 1, category: "", search_key: "", text: "-----------" },
    category_2: { index: 2, category: "", search_key: "", text: "-----------" },
    category_3: { index: 3, category: "", search_key: "", text: "-----------" },
    category_4: { index: 4, category: "", search_key: "", text: "-----------" },
    category_5: { index: 5, category: "", search_key: "", text: "-----------" },
  };
  const [homescreen, setHomescreen] = useState(initialData);

  const get_homescreen_cateogry = async () => {
    await db
      .collection("homepage-category")
      .get()
      .then((doc) => {
        doc.forEach((element) => {
          const data = element.data();
          setHomescreen({
            ...homescreen,
            ...data.homescreen,
          });
        });
      });
  };

  const get_categories = async () => {
    await db
      .collection("categories")
      .get()
      .then((doc) => {
        doc.forEach((element) => {
          const data = element.data();
          categories.set(data.name, data);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // const deleteOldData = () => {
  //   db.collection("homepage-categorie")
  //   .where("img", "==", img)
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       doc.ref.delete().then(() => {
  //       }).catch((err) => {
  //         toast.error(err.message);
  //       });
  //     });
  //   })
  //   .catch((err) => {
  //     toast.error(err.message);
  //   });
  // }

  useEffect(() => {
    get_homescreen_cateogry();
    get_categories();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    let isReady = Object.values(homescreen).every(
      (item) => item.search_key.length > 0
    );
    console.log({ isReady });
    if (isReady) {
      console.log({ state });
      db.collection("homepage-category")
        .doc(uid)
        .set({
          homescreen: homescreen,
          created: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((res) => {
          toast.success("Homescreen Categories Added Successfully");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        });
    } else {
      toast.error("Please select all categories!");
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  useEffect(() => {
    console.table(homescreen);
  }, [homescreen]);

  const onAddCategory = () => {
    const name = `category_${state.index}`;
    setHomescreen({
      ...homescreen,
      [name]: {
        ...homescreen[name],
        category: state.category,
        text: state.sub_category ? state.sub_category : state.category,
        search_key: state.sub_category ? "sub_category" : "category",
      },
    });
  };

  useEffect(() => {
    const category = categories.get(state.category);
    if (category && category.sub_category) {
      set_sub_categories(category.sub_category);
    } else {
      set_sub_categories([]);
    }
  }, [state.category, categories]);

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
                  <span className="text-muted fw-light">{process.env.REACT_APP_NAME} /</span>{" "}
                  Homescreen Category
                </h4>
                {/* Basic Layout & Basic with Icons */}
                <div className="row">
                  {/* Basic Layout */}
                  <div className="col-xxl">
                    <div className="card mb-4">
                      <div className="card-body">
                        <div className="row">
                          <div className="mb-3 col-md-3">
                            <label
                              className="form-label"
                              htmlFor="basic-default-fullname"
                            >
                              Select Index
                            </label>
                            <select
                              className="form-select"
                              name="index"
                              onChange={handleSelectChange}
                              required
                            >
                              <option value={""} selected>
                                ----------------
                              </option>
                              {loading === true ? (
                                <>
                                  <option>Loading Categories.....</option>
                                </>
                              ) : (
                                <>
                                  {Object.values(homescreen).map((cat, i) => (
                                    <>
                                      <option value={cat.index} key={i}>
                                        {cat.index}
                                      </option>
                                    </>
                                  ))}
                                </>
                              )}
                            </select>
                          </div>

                          <div className="mb-3 col-md-3">
                            <label
                              className="form-label"
                              htmlFor="basic-default-fullname"
                            >
                              Select Category
                            </label>
                            <select
                              className="form-select"
                              name="category"
                              onChange={handleSelectChange}
                              required
                            >
                              <option value={""} selected>
                                ----------------
                              </option>
                              {loading === true ? (
                                <>
                                  <option>Loading Categories.....</option>
                                </>
                              ) : (
                                <>
                                  {Array.from(categories.values()).map(
                                    (category, i) => (
                                      <>
                                        <option value={category.name} key={i}>
                                          {category.name}
                                        </option>
                                      </>
                                    )
                                  )}
                                </>
                              )}
                            </select>
                          </div>

                          <div className="mb-3 col-md-3">
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
                              onChange={handleSelectChange}
                            >
                              <option value={""} selected>
                                ----------------
                              </option>
                              {
                                <>
                                  {sub_categories && sub_categories.length ? (
                                    <>
                                      {sub_categories.map((sub_category, i) => (
                                        <>
                                          <option
                                            value={sub_category.text}
                                            key={i}
                                          >
                                            {sub_category.text}
                                          </option>
                                        </>
                                      ))}
                                    </>
                                  ) : null}
                                </>
                              }
                            </select>
                          </div>

                          <div className="mb-3 col-md-3">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={onAddCategory}
                            >
                              Add
                            </button>
                          </div>
                        </div>
                        <div className="row">
                          <table className="table">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Select Category</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>{homescreen["category_1"].text}</td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>{homescreen["category_2"].text}</td>
                              </tr>
                              <tr>
                                <td>3</td>
                                <td>{homescreen["category_3"].text}</td>
                              </tr>
                              <tr>
                                <td>4</td>
                                <td>{homescreen["category_4"].text}</td>
                              </tr>
                              <tr>
                                <td>5</td>
                                <td>{homescreen["category_5"].text}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div className="row justify-content-start pt-4">
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

export default HomescreenCategory;
