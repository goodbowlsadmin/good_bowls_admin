import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import firebase from "firebase/compat/app";
import Nav from "../Nav";
import { v4 as uuidv4 } from "uuid";

const Weeks = [
  "Week 1",
  "Week 2",
  "Week 3",
  "Week 4"
];

const Days = [
  "Day 1",
  "Day 2",
  "Day 3",
  "Day 4",
  "Day 5",
  "Day 6",
  "Day 7"
];

const AddTips = () => {
  const [loading, setLoading] = useState(true);

  const [load, setLoad] = useState(true);

  const uid = uuidv4();


  const [categories, setCategory] = useState([]);

  const [sub_category, setSubCategory] = useState([]);

  const [tip, setTip] = useState({
    category: "",
    sub_category: "",
    title: "",
    description: "",
    week: "",
    day: "",
  });

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

  /**
   * When the form is submitted, the tip image is set to the tipImage variable, and then the
   * tip is added to the database.
   * @param e - event
   */
  const onSubmit = (e) => {
    e.preventDefault();
    tip.created = firebase.firestore.FieldValue.serverTimestamp();
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
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((res) => {
        toast.success("Tip Added Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };

  const handleSelectChange = (e) => {
    tip.category = e.target.value;
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
                  Tip
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
                                <>
                                  <option>Loading Categories.....</option>
                                </>
                              ) : (
                                <>
                                  {categories.map((cat, i) => (
                                    <>
                                      <option value={cat.name} key={i}>
                                        {cat.name}
                                      </option>
                                    </>
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
                                <>
                                  <option>Loading Sub Categories</option>
                                </>
                              ) : (
                                <>
                                  {sub_category.length === 0 ? (
                                    <></>
                                  ) : (
                                    <>
                                      {sub_category.map((sub, i) => (
                                        <>
                                          <option value={sub.text} key={i}>
                                            {sub.text}
                                          </option>
                                        </>
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
                              {Weeks.map((week, i) => (
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

export default AddTips;
