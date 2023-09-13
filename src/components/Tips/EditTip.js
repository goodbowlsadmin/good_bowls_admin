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

const EditTip = () => {

  const { id } = useParams();

  const [weeks, setWeeks] = useState([]);


  const [tip, setTip] = useState({
    category: "",
    sub_category: "",
    title: "",
    description: "",
    week: "",
    day: "",
  });

  useEffect(() => {
    db.collection('tips').doc(id).get().then((data) => {
      setTip(data.data());
    })
  }, [id])


  useEffect(() => {
    const fetchDocumentNames = async () => {
      const collectionName = 'weeks';
      const names = await getAllDocumentNames(collectionName);
      setWeeks(names);
    };

    fetchDocumentNames();
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
      .doc(id)
      .update({
        id: tip.id,
        category: tip.category,
        sub_category: tip.sub_category,
        title: tip.title,
        description: tip.description,
        week: tip.week,
        day: tip.day,
        updated: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((res) => {
        toast.success("Tip Updated Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
                              Category
                            </label>
                            <div>
                              <input
                                type="text"
                                className="form-control"
                                id="basic-default-name"
                                placeholder="Category"
                                value={tip.category}
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
                                value={tip.sub_category}
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
                              value={tip.week}
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
                              value={tip.day}
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
                                value={tip.title}
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
                              value={tip.description}
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

export default EditTip;
