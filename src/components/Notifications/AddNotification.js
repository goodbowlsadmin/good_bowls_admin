import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Header";
import Nav from "../Nav";
import "../../App.css";
import { db } from "../../FirebaseConfig";
import firebase from "firebase/compat/app";
import { sendFCMNotification } from "../../helpers/notification";

const AddNotifications = () => {

    const [notification, setNotification] = useState({
        title: "",
        body: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNotification((event) => {
            return {
                ...event,
                [name]: value,
            };
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        sendFCMNotification(
            notification.title,
            notification.body
        );
        db.collection("notifications")
            .doc(notification.title)
            .set({
                id: notification.title,
                title: notification.title,
                body: notification.body,
                created: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((res) => {
                toast.success("Notification Sent Successfully");
                window.location.href = "/Notifications";
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
                                    Notification
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
                                                                Add Title
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
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label
                                                            className="col-sm-2 col-form-label"
                                                            htmlFor="basic-default-name"
                                                        >
                                                            Add Description
                                                        </label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-name"
                                                                placeholder="John Doe"
                                                                name="body"
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

export default AddNotifications;
