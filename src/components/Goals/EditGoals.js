import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import firebase from "firebase/compat/app";
import Nav from "../Nav";
import { useParams } from "react-router-dom";

const Units = ["ml", "g", "min", "servings", "oz", "days", "cups", "lbs", "kg"];

const EditGoals = () => {
    const { id } = useParams();
    const [goal, setGoal] = useState({
        name: "",
        target: "",
        unit: "",
        type: ""
    });

    useEffect(() => {
        db.collection('goals').doc(id).get().then((data) => {
            setGoal(data.data());
        })
    }, [id])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setGoal((event) => {
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
        goal.created = firebase.firestore.FieldValue.serverTimestamp();
        db.collection("goals")
            .doc(id)
            .update({
                name: goal.name,
                target: goal.target,
                unit: goal.unit,
                type: goal.type,
                updated: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((res) => {
                toast.success("Goal Updated Successfully");
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
                                                                value={goal.name}
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
                                                                value={goal.target}
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
                                                                value={goal.unit}
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
                                                                value={goal.type}
                                                                onChange={handleChange}
                                                            >
                                                                <option selected>----------------</option>

                                                                {Units.map((sub, i) => (
                                                                    <>
                                                                        <option value={sub} key={i}>
                                                                            {sub}
                                                                        </option>
                                                                    </>
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

export default EditGoals;
