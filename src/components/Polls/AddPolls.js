import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Header";
import Nav from "../Nav";
import "../../App.css";
import { db } from "../../FirebaseConfig";

const AddPolls = () => {
    const [status, setStatus] = useState(false);

    const addPoll = async ({ question, options }) => {
        setStatus(true);
        try {
            const pollCollection = db.collection('polls');
            const formattedOptions = options.map((option) => ({
                answer: option,
                percent: 0,
            }));
            const data = {
                dateCreated: new Date(),
                poll: {
                    total_votes: 0,
                    voters: [],
                    question: question,
                    options: formattedOptions,
                },
            };

            await pollCollection.add(data);
            toast.success('Poll Created');
        } catch (error) {
            toast.error(error.message || 'Please try again...');
        } finally {
            setStatus(false);
        }
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
                                                <form
                                                    onSubmit={(e) => {
                                                        e.preventDefault();
                                                        const question = e.target.question.value;
                                                        const optionsInput = e.target.options.value;
                                                        const optionsArray = optionsInput.split(';');
                                                        addPoll({ question, options: optionsArray });
                                                    }}
                                                >
                                                    <div className="row mb-3">
                                                        <label
                                                            className="col-sm-2 col-form-label"
                                                            htmlFor="basic-default-name"
                                                        >
                                                            Question :
                                                        </label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-name"
                                                                placeholder="John Doe"
                                                                name="question"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <label
                                                            className="col-sm-2 col-form-label"
                                                            htmlFor="basic-default-name"
                                                        >
                                                            Options (option1;option2;option3;...):
                                                        </label>
                                                        <div className="col-sm-10">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-name"
                                                                placeholder="John Doe"
                                                                name="options"
                                                            />
                                                        </div>
                                                    </div>

                                                    <button type="submit" disabled={status} className="btn btn-primary">
                                                        Create Poll
                                                    </button>
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

export default AddPolls;
