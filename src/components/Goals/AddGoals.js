import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Header";
import Nav from "../Nav";
import "../../App.css";
import { db } from "../../FirebaseConfig";
import firebase from "firebase/compat/app";
import { sendFCMNotification } from "../../helpers/notification";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Units = ["ml", "g", "min", "servings", "oz", "days", "cups", "lbs", "kg"];

const AddGoals = () => {
    const [goal, setGoal] = useState({
        name: "",
        target: "",
        unit: "",
        type: ""
    });

    const uid = uuidv4();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGoal((event) => {
            return {
                ...event,
                [name]: value,
            };
        });
    };


    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            sendFCMNotification(
                'New Goal Added',
                `Goal: ${goal.name}`
            );
            db.collection("push-notifications")
                .doc(goal.name)
                .set({
                    id: goal.name,
                    title: 'New Goal Added',
                    body: `Goal: ${goal.name}`,
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                });

            const translatedName = await translate(goal.name);
            db.collection("goals")
                .doc(uid)
                .set({
                    goalId: uid,
                    name: goal.name,
                    target: goal.target,
                    unit: goal.unit,
                    type: goal.type,
                    S_name: translatedName,
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                    updated: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then((res) => {
                    toast.success("Goal Added Successfully");
                    window.location.href = "/Goals";
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (e) {
            toast.error('Please fill all fields');
        }
    };

    const translate = async (text) => {
        const apiKey = "AIzaSyCbYHye0Yhs7nclncfItXxzfYfr-A0sPf8";
        const response = await axios.post(
            `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
            {
                q: text,
                target: "es", // Translate to Spanish
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
                            {/* Content */}
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <h4 className="fw-bold py-3 mb-4">
                                    <span className="text-muted fw-light">{process.env.REACT_APP_NAME} /</span> Add
                                    Goal
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
                                                                htmlFor="basic-default-name"
                                                            >
                                                                Goal
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-name"
                                                                placeholder="John Doe"
                                                                name="name"
                                                                required
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                        <div className="mb-3 col-md-6">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="basic-default-name"
                                                            >
                                                                Target
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-name"
                                                                placeholder="5"
                                                                name="target"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="mb-3 col-md-6">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="basic-default-name"
                                                            >
                                                                Unit
                                                            </label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-name"
                                                                placeholder="10"
                                                                name="unit"
                                                                onChange={handleChange}
                                                            />
                                                            <p className="text-muted">
                                                                Note: How unit and target works ? <br />
                                                                If you want to set target for 10 ml, then set unit as 10 and target as 1 or vice versa. <br />
                                                            </p>
                                                        </div>

                                                        <div className="mb-3 col-md-6">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="basic-default-fullname"
                                                            >
                                                                Select Unit Type
                                                            </label>
                                                            <select
                                                                className="form-select"
                                                                name="type"
                                                                required
                                                                onChange={handleChange}
                                                            >
                                                                <option selected>----------------</option>

                                                                {Units.map((sub, i) => (
                                                                    <option value={sub} key={i}>
                                                                        {sub}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="row justify-content-end">
                                                        <div className="col-sm-12">
                                                            <button
                                                                type="submit"
                                                                className="btn btn-primary"
                                                                onClick={onSubmit}
                                                            >
                                                                Add
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

export default AddGoals;
