/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import Nav from "../Nav";
import "../../App.css";
import toast, { Toaster } from "react-hot-toast";
import { Rings } from "react-loader-spinner";
import { Link } from "react-router-dom";
import FirestoreTimestampToDate from "../../helpers/date";

const ViewPolls = () => {
    const [loading, setLoading] = useState(false);
    let [polls, setPolls] = useState([]);
    const [Delete, setDelete] = useState(false);
    let [input, setInput] = useState("");

    /* Fetching data from firebase and setting it to the state. */
    useEffect(() => {
        db.collection("polls")
            .orderBy("dateCreated", "desc")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((element) => {
                    var data = element.data();
                    console.log(data);
                    console.log(polls);
                    setPolls((arr) => [...arr, data]);
                    if (data.length === 0 || data === null) {
                        setLoading(false);
                    } else {
                        setLoading(false);
                    }
                });
            })
            .catch((err) => {
                setLoading(false)
                console.log(err.toString())
             });
    }, []);

    /**
     * It deletes a category and all the templates associated with it
     * @param name - the name of the category
     * @returns the batch.commit() function.
     */
    const deleteCategory = (name) => {
        setDelete(true);
        db.collection("polls")
            .doc(name)
            .delete()
            .then(() => {
                toast.success("Poll Removed");
                setDelete(false);
                setTimeout(() => {
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
        polls = polls.filter((cat) => {
            return cat.poll.question.toLowerCase().match(lower_input);
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
                                Polls
                            </h4>
                            <div className="navbar-nav align-items-center">
                                <div className="nav-item d-flex align-items-center w-100">
                                    <i className="bx bx-search fs-4 lh-0" />
                                    <input
                                        type="text"
                                        className="form-control border-0 shadow-none"
                                        placeholder="Search For polls..."
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
                                        {polls.length === 0 ? (
                                            <>
                                                <h2>No polls Found</h2>
                                                <Link to={"/Add-Polls"}>
                                                <button
                                                    className="btn btn-primary"
                                                >
                                                    Add Polls
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
                                                {polls.map((cat, i) => (
                                                    <>
                                                        <div className="col" id={cat.poll.question}>
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <h5 className="card-title">Question: {cat.poll.question}</h5>
                                                                    {cat.poll.options.map((opt, i) => (
                                                                        <p key={i}>Option {i + 1}: {opt.answer} - {opt.percent}% votes</p>
                                                                    ))}
                                                                    <h6 className="card-title">Total Votes: {cat.poll.total_votes}</h6>
                                                                    <FirestoreTimestampToDate {...cat.dateCreated }/>
                                                                    <button
                                                                        className="btn btn-danger"
                                                                        onClick={() => {
                                                                            deleteCategory(cat.id);
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                    <span className="p-2" >
                                                                        <Link to={`/Comments/polls/${cat.id}`}>
                                                                            <button
                                                                                className="btn btn-primary"
                                                                            >
                                                                                Comments
                                                                            </button>
                                                                        </Link>
                                                                    </span>
                                                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#basicModal-${i}`}>
                                                                        Voters
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="modal fade" id={`basicModal-${i}`} tabIndex="-1" aria-hidden="true">
                                                            <div class="modal-dialog" role="document">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h5 class="modal-title" id="exampleModalLabel1">Voters List</h5>
                                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        <table class="table">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th scope="col">Name</th>
                                                                                    <th scope="col">Selected Option</th>

                                                                                </tr>
                                                                            </thead>
                                                                            {cat.poll.voters.length === 0 ? (
                                                                                <>
                                                                                    <h4 className='pt-2'>No Voters Found</h4>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    {cat.poll.voters && cat.poll.voters.map((d, index) => (
                                                                                        <tbody key={index}>
                                                                                            <tr>
                                                                                                <td>{d.name}</td>
                                                                                                <td>{d.selected_option}</td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    ))}
                                                                                </>
                                                                            )}
                                                                        </table>
                                                                    </div>
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

export default ViewPolls;
