import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Header from "../Header";
import Nav from "../Nav";
import "../../App.css";
import { db } from "../../FirebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { sendFCMNotification } from "../../helpers/notification";
import firebase from "firebase/compat/app";
import axios from "axios";

const AddPolls = () => {
    const [status, setStatus] = useState(false);
    const id = uuidv4();

    const addPoll = async ({ question, options }) => {
        setStatus(true);
        try {
            sendFCMNotification(
                'New Poll',
                'A new poll has been added. Please check it out.'
            );
            await db.collection("push-notifications")
                .doc(id)
                .set({
                    id: id,
                    title: 'New Poll',
                    body: 'A new poll has been added. Please check it out.',
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                });

            // Translate question and options
            const translatedQuestion = await translate(question);
            const { translatedOptions, formattedOptions } = await translateOptions(options);
            
            const pollCollection = db.collection('polls');
            
            const data = {
                id: id,
                dateCreated: new Date(),
                poll: {
                    total_votes: 0,
                    voters: [],
                    options: formattedOptions,
                    question: question,
                    S_question: translatedQuestion,
                },
            };

            await pollCollection.doc(id).set(data);
            toast.success('Poll Created');
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            toast.error(error.message || 'Please try again...');
        } finally {
            setStatus(false);
        }
    };

    const translate = async (text) => {
        const apiKey = "AIzaSyCbYHye0Yhs7nclncfItXxzfYfr-A0sPf8";
        const response = await axios.post(
            `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
            {
                q: text,
                target: "es", // Translate to Spanish
            }
        );
        return response.data.data.translations[0].translatedText;
    };

    const translateOptions = async (options) => {
        // Split options and translate each option individually
        const optionsArray = options.split(';');
        const translatedOptions = [];
        for (let option of optionsArray) {
            const translatedOption = await translate(option);
            translatedOptions.push(translatedOption);
        }
        const formattedOptions = optionsArray.map((option, index) => ({
            answer: option,
            S_answer: translatedOptions[index],
            percent: 0,
        }));
        return { translatedOptions, formattedOptions };
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
                                                        addPoll({ question, options: optionsInput });
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
                                                            Options {" "}: <br />
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
                                                        <br />
                                                        <small>Note: Don't put semicolon for last option <br />
                                                            Example: Option 1; Option 2; Option 3; Option 4 ✅ <br />
                                                            Example: Option 1; Option 2; Option 3; Option 4; ❌
                                                        </small>
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
