import React, { useEffect, useState } from "react";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import Nav from "../Nav";
import "../../App.css";
import toast, { Toaster } from "react-hot-toast";
import $ from "jquery";
import { Rings } from "react-loader-spinner";
import { Link } from "react-router-dom";

const ViewRecepies = () => {
    const [loading, setLoading] = useState(true);
    let [recepies, setRecepies] = useState([]);
    const [Delete, setDelete] = useState(false);
    let [input, setInput] = useState("");

    /* Fetching data from firebase and setting it to the state. */
    useEffect(() => {
        db.collection("recepies")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((element) => {
                    var data = element.data();
                    setRecepies((arr) => [...arr, data]);
                    setLoading(false);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const deletedRecepie = (id) => {
        setDelete(true);
        db.collection("recepies")
            .doc(id)
            .delete()
            .then(() => {
                toast.success("Recepie Removed");
                $("#").fadeOut();
                setDelete(false);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };

    if (input.length > 0) {
        const lower_input = input.toLowerCase();
        recepies = recepies.filter((data) => {
            return data.title.toLowerCase().match(lower_input);
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
                                Recepies
                            </h4>
                            <div className="navbar-nav align-items-center">
                                <div className="nav-item d-flex align-items-center w-100">
                                    <i className="bx bx-search fs-4 lh-0" />
                                    <input
                                        type="text"
                                        className="form-control border-0 shadow-none"
                                        placeholder="Search For recepies..."
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
                                        {recepies.length === 0 ? (
                                            <>
                                                <h2>No Recepies Found</h2>
                                            </>
                                        ) : (
                                            <>
                                                {Delete === true ? (
                                                    <>
                                                        <div className="col-lg-12">
                                                            <h4>Deleting Recepie...</h4>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                                {recepies.map((data, i) => (
                                                    <>
                                                        <div className="col" id={data.title}>
                                                            <div className="card">
                                                                <img
                                                                    className="card-img-top image"
                                                                    src={data.thumb_img}
                                                                    alt={data.thumb_img}
                                                                />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{data.name}</h5>
                                                                    <button
                                                                        className="btn btn-danger"
                                                                        onClick={() => {
                                                                            deletedRecepie(data.id);
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                    <span style={{ marginLeft: "10px" }}></span>
                                                                    <Link to={`/Edit-Recepie/${data.id}`}>
                                                                        <button className="btn btn-primary">
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

export default ViewRecepies;
