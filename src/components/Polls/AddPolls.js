/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import firebase from "firebase/compat/app";
import Nav from "../Nav";
import { v4 as uuidv4 } from "uuid";

const AddPolls = () => {
    const uid = uuidv4();

    const [poll, setPoll] = useState({
        title: "",
        op1: "",
        op2: "",
        op3: "",
        op4: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setPoll((event) => {
            return {
                ...event,
                [name]: value,
            };
        });
    };

    /**
     * When the form is submitted, the poll image is set to the pollImage variable, and then the
     * poll is added to the database.
     * @param e - event
     */
    const onSubmit = (e) => {
        e.preventDefault();
        poll.created = firebase.firestore.FieldValue.serverTimestamp();
        db.collection("polls")
            .doc(uid)
            .set({
                id: uid,
                title: poll.title,
                options:[
                    {option: poll.op1, voteCount: 0},
                    {option: poll.op2, voteCount: 0},
                    {option: poll.op3, voteCount: 0},
                    {option: poll.op4, voteCount: 0},
                ],
                voteCount: 0,
                created: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((res) => {
                toast.success("Polls Added Successfully");
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
                                    <span className="text-muted fw-light">{process.env.REACT_APP_NAME} /</span> Add
                                    Polls
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

                                                <div className="row">
                                                    <div className="mb-3 col-md-6">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="basic-default-fullname"
                                                        >
                                                            Add Option 1
                                                        </label>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-name"
                                                                placeholder="John Doe"
                                                                name="op1"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 col-md-6">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="basic-default-fullname"
                                                        >
                                                            Add Option 2
                                                        </label>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-name"
                                                                placeholder="John Doe"
                                                                name="op2"
                                                                onChange={handleChange}
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
                                                            Add Option 3
                                                        </label>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-name"
                                                                placeholder="John Doe"
                                                                name="op3"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

                                                    </div>
                                                    <div className="mb-3 col-md-6">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="basic-default-fullname"
                                                        >
                                                            Add Option 4
                                                        </label>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-name"
                                                                placeholder="John Doe"
                                                                name="op4"
                                                                onChange={handleChange}
                                                            />
                                                        </div>

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

export default AddPolls;
