import React, { useEffect, useState } from "react";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import Nav from "../Nav";
import "../../App.css";
import toast, { Toaster } from "react-hot-toast";
import $ from "jquery";
import { Rings } from "react-loader-spinner";
import { Link } from "react-router-dom";
import FirestoreTimestampToDate from "../../helpers/date";

const ViewGoals = () => {
    const [loading, setLoading] = useState(true);
    let [goals, setGoals] = useState([]);
    const [Delete, setDelete] = useState(false);
    let [input, setInput] = useState("");

    /* Fetching data from firebase and setting it to the state. */
    useEffect(() => {
        db.collection("goals")
            .orderBy("created", "desc")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((element) => {
                    var data = element.data();
                    setGoals((arr) => [...arr, data]);
                    setLoading(false);
                });
            })
            .catch((err) => { });
    }, []);

    /**
     * It deletes a category and all the templates associated with it
     * @param name - the name of the category
     * @returns the batch.commit() function.
     */
    const deleteCategory = (name) => {
        setDelete(true);
        db.collection("goals")
            .doc(name)
            .delete()
            .then(() => {
                toast.success("Goal Removed");
                $("#" + name).fadeOut();
                setDelete(false);
                setTimeout(
                    () => {
                        window.location.reload();
                    }, 1000);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };

    if (input.length > 0) {
        const lower_input = input.toLowerCase();
        goals = goals.filter((cat) => {
            return cat.name.toLowerCase().match(lower_input);
        });
    }

    return (
        <>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <Header />
                    <div className="layout-page">
                        <Nav />
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <h4 className="fw-bold py-3 mb-4">
                                <span className="text-muted fw-light">{process.env.REACT_APP_NAME} /</span> View
                                Goals
                            </h4>
                            <div className="navbar-nav align-items-center">
                                <div className="nav-item d-flex align-items-center w-100">
                                    <i className="bx bx-search fs-4 lh-0" />
                                    <input
                                        type="text"
                                        className="form-control border-0 shadow-none"
                                        placeholder="Search For goals..."
                                        aria-label="Search..."
                                        onChange={handleSearch}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                                {loading === true ? (
                                    <>
                                        <h2>
                                            {" "}
                                            <Rings
                                                height="80"
                                                width="80"
                                                color="#456CCF"
                                                radius="6"
                                                visible={true}
                                                ariaLabel="rings-loading"
                                            />
                                            Loading Data....
                                        </h2>
                                    </>
                                ) : (
                                    <>
                                        {goals.length === 0 ? (
                                            <>
                                                <h2>No Goals Found</h2>
                                                <Link to={"/Add-Goals"}>
                                                    <button
                                                        className="btn btn-primary"
                                                    >
                                                        Add Goals
                                                    </button>
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                {Delete === true ? (
                                                    <>
                                                        <div className="col-lg-12">
                                                            <h4>Deleting Data...</h4>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                                {goals.map((cat, i) => (
                                                    <>
                                                        <div className="col" id={cat.name} key={i}>
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{cat.name}</h5>
                                                                    <h6 className="card-title">Target : {cat.target}</h6>
                                                                    <h6 className="card-title">Unit : {cat.unit + cat.type}</h6>
                                                                    <FirestoreTimestampToDate {...cat.updated} />
                                                                    <button
                                                                        className="btn btn-danger"
                                                                        onClick={() => {
                                                                            deleteCategory(cat.goalId);
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                    <span className="p-2"></span>
                                                                    <Link to={`/Edit-Goals/${cat.goalId}`}>
                                                                        <button
                                                                            className="btn btn-primary">
                                                                            Edit
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                ))}
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default ViewGoals;
