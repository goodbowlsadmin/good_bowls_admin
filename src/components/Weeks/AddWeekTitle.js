import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Header";
import Nav from "../Nav";
import "../../App.css";
import { db } from "../../FirebaseConfig";
import firebase from "firebase/compat/app";
import getAllDocumentNames from "../../helpers/name";
import axios from "axios";

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
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWeekTitle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const translatedWeekTitle = await translate(weekTitle.title);

    db.collection("week-titles")
      .doc(weekTitle.week)
      .set({
        title: weekTitle.title,
        S_title: translatedWeekTitle,
        id: weekTitle.week,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        toast.success("Week Title Added Successfully");
        // Redirect or update UI as needed
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const translate = async (text) => {
    const apiKey = "AIzaSyCbYHye0Yhs7nclncfItXxzfYfr-A0sPf8"; // Replace with your translation API key
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        q: text,
        target: "es", // Translate to Spanish or your desired language
      }
    );
    return response.data.data.translations[0].translatedText;
  };

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Header />
          <div className="layout-page">
            <Nav />
            <div className="content-wrapper">
              <div className="container-xxl flex-grow-1 container-p-y">
                <h4 className="fw-bold py-3 mb-4">
                  <span className="text-muted fw-light">
                    {process.env.REACT_APP_NAME} /
                  </span>{" "}
                  Add Week Title
                </h4>
                <div className="row">
                  <div className="col-xxl">
                    <div className="card mb-4">
                      <div className="card-body">
                        <form>
                          <div className="row">
                            <div className="mb-3 col-md-6">
                              <label className="form-label">
                                Select Week
                              </label>
                              <select
                                className="form-select"
                                name="week"
                                onChange={handleChange}
                                required
                              >
                                <option disabled selected>----------------</option>
                                {weeks.map((week, i) => (
                                  <option value={week} key={i}>
                                    {week}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="row mb-3">
                            <label className="col-sm-2 col-form-label">
                              Week Title
                            </label>
                            <div className="col-sm-10">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Week Title"
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
                                Submit
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
