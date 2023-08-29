import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Header";
import Nav from "../Nav";
import "../../App.css";
import { db } from "../../FirebaseConfig";
import firebase from "firebase/compat/app";
import { useEffect } from "react";
import getAllDocumentNames from "../../helpers/name";

const AddWeekTitle = () => {

  const [weekTitle, setWeekTitle] = useState({
    title: "",
    week: ""
  });
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const fetchDocumentNames = async () => {
      const collectionName = 'weeks';
      const names = await getAllDocumentNames(collectionName);
      setWeeks(names);
    };

    fetchDocumentNames();
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWeekTitle((event) => {
      return {
        ...event,
        [name]: value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    db.collection("week-titles")
      .doc(weekTitle.week)
      .set({
        title: weekTitle.title,
        id: weekTitle.week,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((res) => {
        toast.success("Week Title Added Successfully");
        window.location.href = "/Week-Titles";
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
                  Week Title
                </h4>
                {/* Basic Layout & Basic with Icons */}
                <div className="row">
                  {/* Basic Layout */}
                  <div className="col-xxl">
                    <div className="card mb-4">
                      <div className="card-body">
                        <form>
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
                                {weeks.map((week, i) => (
                                  <>
                                    <option value={week} key={i}>
                                      {week}
                                    </option>
                                  </>))}
                              </select>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label
                              className="col-sm-2 col-form-label"
                              htmlFor="basic-default-name"
                            >
                              Week Title
                            </label>
                            <div className="col-sm-10">
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



                          <div className="row justify-content-end">
                            <div className="col-sm-12">
                              <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={onSubmit}
                              >
                                Send
                              </button>
                            </div>
                          </div>
                        </form>
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

export default AddWeekTitle;
