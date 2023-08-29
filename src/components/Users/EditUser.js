import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import Nav from "../Nav";
import { useParams } from "react-router-dom";

const EditUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        email: "",
        name: "",
        pid: "",
        phone: "",
        gender: "",
        age: "",
        worksite: ""
    });

    useEffect(() => {
        db.collection('Users').doc(id).get().then((data) => {
            setUser(data.data());
        })
    }, [id])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((event) => {
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
        db.collection("Users")
            .doc(id)
            .update({
                pid: user.pid,
                worksite: user.worksite ?? null,
            })
            .then((res) => {
                toast.success("User Updated Successfully");
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
                                    <span className="text-muted fw-light">{process.env.REACT_APP_NAME} /</span> Update
                                    User
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
                                                                User Name
                                                            </label>
                                                            <div>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="basic-default-name"
                                                                    placeholder="120"
                                                                    value={user.name}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="mb-3 col-md-6">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="basic-default-fullname"
                                                            >
                                                                User Email
                                                            </label>
                                                            <div>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="basic-default-name"
                                                                    placeholder="50"
                                                                    value={user.email}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="mb-3 col-md-6">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="basic-default-fullname"
                                                            >
                                                                User Age
                                                            </label>
                                                            <div>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="basic-default-name"
                                                                    placeholder="Not Updated By User"
                                                                    value={user.age}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 col-md-6">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="basic-default-fullname"
                                                            >
                                                                User Gender
                                                            </label>
                                                            <div>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="basic-default-name"
                                                                    placeholder="Not Updated By User"
                                                                    value={user.gender}
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="mb-3 col-md-6">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="basic-default-fullname"
                                                            >
                                                                User Participation ID
                                                            </label>
                                                            <div>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="basic-default-name"
                                                                    placeholder="Enter Participation ID"
                                                                    name="pid"
                                                                    value={user.pid}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 col-md-6">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="basic-default-fullname"
                                                            >
                                                                User Worksite
                                                            </label>
                                                            <div>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="basic-default-name"
                                                                    placeholder="Enter Worksite"
                                                                    name="worksite"
                                                                    onChange={handleChange}
                                                                    value={user.worksite}
                                                                />
                                                            </div>
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

export default EditUser;
