/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import firebase from "firebase/compat/app";
import Nav from "../Nav";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useParams } from "react-router-dom";

const Types = [
    "Breakfast", "Lunch", "Dinner", "Snacks", "Sides", "Desserts"
];

const MealTypes = ["Vegan", "Vegeterian", "Gluten Free", "Nut Free Ingredients", "Nutrient Type"];

const CombinedComponent = () => {
    const [imgloading, setImgLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [servings, setServings] = useState("");
    const [thumbImage, setThumbImg] = useState(
        "https://brent-mccardle.org/img/placeholder-image.png"
    );
    const [recepie, setRecepie] = useState({
        title: "",
        type: "",
        meal_type: "",
        description: "",
        thumb_img: "",
        ingredients: "",
        servings: "",
        source: "",
        protein: "",
        fat: "",
        calories: "",
        carbs: "",
    });
    const { id } = useParams();

    React.useEffect(() => {
        db.collection('recepies').doc(id).get().then((data) => {
            setRecepie(data.data());
            setThumbImg(data.data().thumb_img);
            setDescription(data.data().description);
            setIngredients(data.data().ingredients);
            setServings(data.data().servings);
        })
    }, [id]);

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
                toast.success("Thumbnail Image Updated Successfully");
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

    const onSubmit = async (e) => {
        e.preventDefault();
        recepie.created = firebase.firestore.FieldValue.serverTimestamp();

        const translatedTitle = await translate(recepie.title);
        const translatedDescription = await translate(description);
        const translatedIngredients = await translate(ingredients);
        const translatedServings = await translate(servings);

        db.collection("recepies")
            .doc(id)
            .update({
                thumb_img: thumbImage,
                title: recepie.title,
                type: recepie.type,
                meal_type: recepie.meal_type,
                description: description,
                ingredients: ingredients,
                servings: servings,
                protein: recepie.protein,
                calories: recepie.calories,
                fat: recepie.fat,
                carbs: recepie.carbs,
                source: recepie.source,
                updated: firebase.firestore.FieldValue.serverTimestamp(),
                S_title: translatedTitle,
                S_description: translatedDescription,
                S_ingredients: translatedIngredients,
                S_servings: translatedServings,
            })
            .then((res) => {
                toast.success("Recipe Updated Successfully");
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
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <h4 className="fw-bold py-3 mb-4">
                                    <span className="text-muted fw-light">{process.env.REACT_APP_NAME} /</span> Update
                                    Recipe
                                </h4>
                                <div className="row">
                                    <div className="col-xxl">
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="mb-3 col-md-6">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="basic-default-fullname"
                                                        >
                                                            Select Type
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            name="type"
                                                            value={recepie.type}
                                                            required
                                                            onChange={handleChange}
                                                        >
                                                            <option selected>----------------</option>
                                                            {Types.map((sub, i) => (
                                                                <option value={sub} key={i}>
                                                                    {sub}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="mb-3 col-md-6">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="basic-default-fullname"
                                                        >
                                                            Select Meal Type
                                                        </label>
                                                        <select
                                                            className="form-select"
                                                            name="meal_type"
                                                            value={recepie.meal_type}
                                                            required
                                                            onChange={handleChange}
                                                        >
                                                            <option selected>----------------</option>
                                                            {MealTypes.map((sub, i) => (
                                                                <option value={sub} key={i}>
                                                                    {sub}
                                                                </option>
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
                                                                value={recepie.title}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="mb-3 col-md-6">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="basic-default-fullname"
                                                        >
                                                            Add Carbs
                                                        </label>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-name"
                                                                placeholder="120"
                                                                value={recepie.carbs}
                                                                name="carbs"
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 col-md-6">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="basic-default-fullname"
                                                        >
                                                            Add Protiens
                                                        </label>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-name"
                                                                placeholder="50"
                                                                name="protein"
                                                                value={recepie.protein}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 col-md-6">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="basic-default-fullname"
                                                        >
                                                            Add Fat
                                                        </label>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-name"
                                                                placeholder="50"
                                                                name="fat"
                                                                value={recepie.fat}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 col-md-6">
                                                        <label
                                                            className="form-label"
                                                            htmlFor="basic-default-fullname"
                                                        >
                                                            Add Calories
                                                        </label>
                                                        <div>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="basic-default-name"
                                                                placeholder="50"
                                                                name="calories"
                                                                value={recepie.calories}
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
                                                <div className="row">
                                                    <div className="mb-3 col-md-6">
                                                        <label
                                                            className="col-sm-2 col-form-label"
                                                            htmlFor="basic-default-company"
                                                        >
                                                            Recipe Image / Icon
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
                                                                <h4>Uploading Image {progress} %</h4>
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
                                                            value={recepie.source}
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
                                                            UPDATE RECIPE
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

export default CombinedComponent;
