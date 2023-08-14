import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Header";
import Nav from "../Nav";
import "../../App.css";
import { db } from "../../FirebaseConfig";
import firebase from "firebase/compat/app";

const Types = [
    "Fruits",
    "Vegetables",
    "Exercise",
    "Water",
    "Cooked",
];

const AddGoals = () => {
    const [goal, setGoal] = useState({
        name: "",
        type: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGoal((event) => {
            return {
                ...event,
                [name]: value,
            };
        });
    };


    const onSubmit = (e) => {
        e.preventDefault();
        db.collection("goals")
            .doc(goal.name)
            .set({
                name: goal.name,
                type: goal.type,
                created: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((res) => {
                toast.success("Goal Added Successfully");
                window.location.href = "/Goals";
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
                                    Goal
                                </h4>
                                {/* Basic Layout & Basic with Icons */}
                                <div className="row">
                                    {/* Basic Layout */}
                                    <div className="col-xxl">
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <form>
                                                    <div className="row mb-3">
                                                        <label
                                                            className="col-sm-2 col-form-label"
                                                            htmlFor="basic-default-name"
                                                        >
                                                            Goal
                                                        </label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-name"
                                                                placeholder="John Doe"
                                                                name="name"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mb-3 col-md-6">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="basic-default-fullname"
                                                        >
                                                            Select Goal Type
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            name="type"
                                                            required
                                                            onChange={handleChange}
                                                        >
                                                            <option selected>----------------</option>
                                                            {Types.map((type, i) => (
                                                                <>
                                                                    <option value={type} key={i}>
                                                                        {type}
                                                                    </option>
                                                                </>
                                                            ))}
                                                        </select>
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
