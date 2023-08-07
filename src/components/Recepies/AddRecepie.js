/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import firebase from "firebase/compat/app";
import Nav from "../Nav";
import { v4 as uuidv4 } from "uuid";
import MarkdownEditor from "@uiw/react-markdown-editor";

const Types = [
    "Breakfast", "Lunch", "Dinner", "Snack", "Sides", "Desserts"
];

const AddRecepie = () => {
    const [imgloading, setImgLoading] = useState(false);
    const uid = uuidv4();
    const [progress, setProgress] = useState(0);
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [servings, setServings] = useState("");
    const [facts, setFacts] = useState("");
    const [recepieImage, setRecepieImg] = useState(
        "https://brent-mccardle.org/img/placeholder-image.png"
    );
    const [thumbImage, setThumbImg] = useState(
        "https://brent-mccardle.org/img/placeholder-image.png"
    );
    const [recepie, setRecepie] = useState({
        title: "",
        type: "",
        description: "",
        thumb_img: "",
        recepie_img: "",
        ingredients: "",
        servings: "",
        facts: "",
        source: ""
    });

    const handleRecepieImg = async (e) => {
        setImgLoading(true);
        const data = new FormData();
        data.append("file", e.target.files[0]);
        data.append("upload_preset", "recepies");

        const config = {
            onUploadProgress: (e) => {
                const { loaded, total } = e;
                let percent = Math.floor((loaded * 100) / total);
                setProgress(percent);
            },
        };

        axios
            .post(
                "https://api.cloudinary.com/v1_1/dzrg2j6mv/image/upload",
                data,
                config
            )
            .then((r) => {
                setImgLoading(false);
                setRecepieImg(r.data.secure_url);
                toast.success("Recipe Image Uploaded Successfully");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleThumbImg = async (e) => {
        setImgLoading(true);
        const data = new FormData();
        data.append("file", e.target.files[0]);
        data.append("upload_preset", "recepies");

        const config = {
            onUploadProgress: (e) => {
                const { loaded, total } = e;
                let percent = Math.floor((loaded * 100) / total);
                setProgress(percent);
            },
        };

        axios
            .post(
                "https://api.cloudinary.com/v1_1/dzrg2j6mv/image/upload",
                data,
                config
            )
            .then((r) => {
                setImgLoading(false);
                setThumbImg(r.data.secure_url);
                toast.success("Thumbnail Image Uploaded Successfully");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecepie((event) => {
            return {
                ...event,
                [name]: value,
            };
        });
    };

    /**
     * When the form is submitted, the recepie image is set to the recepieImage variable, and then the
     * recepie is added to the database.
     * @param e - event
     */
    const onSubmit = (e) => {
        e.preventDefault();
        recepie.created = firebase.firestore.FieldValue.serverTimestamp();
        recepie.img = recepieImage;
        db.collection("recepies")
            .doc(uid)
            .set({
                id: uid,
                recepie_img: recepieImage,
                thumb_img: thumbImage,
                title: recepie.title,
                type: recepie.type,
                description: description,
                ingredients: ingredients,
                servings: servings,
                facts: facts,
                source: recepie.source,
                created: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((res) => {
                toast.success("Recipe Added Successfully");
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
                                    Recipe
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
                                                            Select Meal Type
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            name="type"
                                                            required
                                                            onChange={handleChange}
                                                        >
                                                            <option selected>----------------</option>

                                                            {Types.map((sub, i) => (
                                                                <>
                                                                    <option value={sub} key={i}>
                                                                        {sub}
                                                                    </option>
                                                                </>
                                                            ))}
                                                        </select>
                                                    </div>

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

                                                <div className="row mb-3">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="basic-default-fullname"
                                                    >
                                                        Add Servings
                                                    </label>
                                                    <div>
                                                        <MarkdownEditor
                                                            name="servings"
                                                            value={servings}
                                                            onChange={(value) => setServings(value)}
                                                            height={300}
                                                            preview="edit"
                                                            toolbar={{
                                                                h1: true,
                                                                h2: true,
                                                                h3: true,
                                                                h4: true,
                                                                img: true,
                                                                link: true,
                                                                code: true,
                                                                preview: true,
                                                                expand: true,
                                                                undo: true,
                                                                redo: true,
                                                                save: true,
                                                                subfield: true,
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="basic-default-fullname"
                                                    >
                                                        Add Instructions
                                                    </label>
                                                    <div>
                                                        <MarkdownEditor
                                                            name="description"
                                                            value={description}
                                                            onChange={(value) => setDescription(value)}
                                                            height={300}
                                                            preview="edit"
                                                            toolbar={{
                                                                h1: true,
                                                                h2: true,
                                                                h3: true,
                                                                h4: true,
                                                                img: true,
                                                                link: true,
                                                                code: true,
                                                                preview: true,
                                                                expand: true,
                                                                undo: true,
                                                                redo: true,
                                                                save: true,
                                                                subfield: true,
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="basic-default-fullname"
                                                    >
                                                        Add Ingredients
                                                    </label>
                                                    <div>
                                                        <MarkdownEditor
                                                            name="ingredients"
                                                            value={ingredients}
                                                            onChange={(value) => setIngredients(value)}
                                                            height={300}
                                                            preview="edit"
                                                            toolbar={{
                                                                h1: true,
                                                                h2: true,
                                                                h3: true,
                                                                h4: true,
                                                                img: true,
                                                                link: true,
                                                                code: true,
                                                                preview: true,
                                                                expand: true,
                                                                undo: true,
                                                                redo: true,
                                                                save: true,
                                                                subfield: true,
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row mb-3">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="basic-default-fullname"
                                                    >
                                                        Add Nutrition Facts
                                                    </label>
                                                    <div>
                                                        <MarkdownEditor
                                                            name="facts"
                                                            value={facts}
                                                            onChange={(value) => setFacts(value)}
                                                            height={300}
                                                            preview="edit"
                                                            toolbar={{
                                                                h1: true,
                                                                h2: true,
                                                                h3: true,
                                                                h4: true,
                                                                img: true,
                                                                link: true,
                                                                code: true,
                                                                preview: true,
                                                                expand: true,
                                                                undo: true,
                                                                redo: true,
                                                                save: true,
                                                                subfield: true,
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="mb-3 col-md-6">
                                                        <label
                                                            className="col-sm-2 col-form-label"
                                                            htmlFor="basic-default-company"
                                                        >
                                                            Recepie Image / Icon
                                                        </label>

                                                        <div className="col-sm-10">
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                id="inputGroupFile02"
                                                                accept=".jpg, .jpeg, .png"
                                                                onChange={handleRecepieImg}
                                                            />
                                                            <br />
                                                            {imgloading === true ? (
                                                                <>
                                                                    <h4>Uploading Image {progress} %</h4>
                                                                </>
                                                            ) : (
                                                                <></>
                                                            )}
                                                            <img
                                                                src={recepieImage}
                                                                className="image"
                                                                alt="uploading_image"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mb-3 col-md-6">
                                                        <label
                                                            className="col-sm-2 col-form-label"
                                                            htmlFor="basic-default-company"
                                                        >
                                                            Thumbnail Image / Icon
                                                        </label>

                                                        <div className="col-sm-10">
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                id="inputGroupFile02"
                                                                accept=".jpg, .jpeg, .png"
                                                                onChange={handleThumbImg}
                                                            />
                                                            <br />
                                                            {imgloading === true ? (
                                                                <>
                                                                    <h4>Uploading Image {progress} %</h4>
                                                                </>
                                                            ) : (
                                                                <></>
                                                            )}
                                                            <img
                                                                src={thumbImage}
                                                                className="image"
                                                                alt="uploading_image"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-3 col-md-6">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="basic-default-fullname"
                                                    >
                                                        Add Source
                                                    </label>
                                                    <div>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="basic-default-name"
                                                            placeholder="https://www.google.com/"
                                                            name="source"
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="row justify-content-end">
                                                    <div className="col-sm-10">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary"
                                                            onClick={onSubmit}
                                                        >
                                                            ADD RECIPE
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

export default AddRecepie;
