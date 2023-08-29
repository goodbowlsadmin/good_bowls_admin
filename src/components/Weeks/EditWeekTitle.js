import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import firebase from "firebase/compat/app";
import Nav from "../Nav";
import { useParams } from "react-router-dom";

const EditWeekTitle = () => {
    const { id } = useParams();
    const [weekTitle, setWeekTitle] = useState({
        title: "",
        id: ""
    });

    useEffect(() => {
        db.collection('week-titles').doc(id).get().then((data) => {
            setWeekTitle(data.data());
        })
    }, [id])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setWeekTitle((event) => {
            return {
                ...event,
                [name]: value,
            };
        });
    };

    /**
     * When the form is submitted, the goal image is set to the goalImage variable, and then the
     * goal is added to the database.
     * @param e - event
     */
    const onSubmit = (e) => {
        e.preventDefault();
        db.collection("week-titles")
            .doc(id)
            .update({
                title: weekTitle.title,
                updated: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((res) => {
                toast.success("Week Title Updated Successfully");
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
                                    Week Title
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
                                                            Selected Week
                                                        </label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-name"
                                                                placeholder="John Doe"
                                                                value={weekTitle.id}
                                                                disabled
                                                            />
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
                                                                value={weekTitle.title}
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
                                                                Update
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

export default EditWeekTitle;
