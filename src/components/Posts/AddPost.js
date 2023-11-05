/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import firebase from "firebase/compat/app";
import Nav from "../Nav";
import { v4 as uuidv4 } from "uuid";
import { sendFCMNotification } from "../../helpers/notification";

const AddPost = () => {
    const [imgloading, setImgloading] = useState(false);

    const uid = uuidv4(); 

    const [progress, setProgress] = useState(0);

    const [postImage, setPostImage] = useState(
        "https://brent-mccardle.org/img/placeholder-image.png"
    );

    const [post, setPost] = useState({
        postId: "",
        description: "",
        likes: [],
        uid: 'Admin',
        postUrl: "",
        profImage: 'https://res.cloudinary.com/dzrg2j6mv/image/upload/v1692445022/Categories/logo_k5hbjo.png',
        username: 'Good Bowls',
    });

    const handlepostImage = async (e) => {
        setImgloading(true);
        const data = new FormData();
        data.append("file", e.target.files[0]);
        data.append("upload_preset", "postss");

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
                setImgloading(false);
                setPostImage(r.data.secure_url);
                toast.success("Post Image Uploaded Successfully");
            })
            .catch((err) => {
                console.log(err);
            });
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((event) => {
            return {
                ...event,
                [name]: value,
            };
        });
    };

    /**
     * When the form is submitted, the post image is set to the postImage variable, and then the
     * post is added to the database.
     * @param e - event
     */
    const onSubmit = (e) => {
        e.preventDefault();
        sendFCMNotification(
            'New Post',
            'A new post has been added. Please check it out.'
        );
        db.collection("push-notifications")
            .doc(uid)
            .set({
                id: uid,
                title: 'New Post',
                body: 'A new post has been added. Please check it out.',
                created: firebase.firestore.FieldValue.serverTimestamp(),
            });
        post.created = firebase.firestore.FieldValue.serverTimestamp();
        post.img = postImage;
        db.collection("posts")
            .doc(uid)
            .set({
                postId: uid,
                description: post.description,
                likes: [],
                uid: 'Admin',
                postUrl: postImage,
                profImage: 'https://asset.cloudinary.com/dzrg2j6mv/93d77fc498e2ce61c853614126fbcb59',
                username: 'Good Bowls',
                datePublished: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((res) => {
                toast.success("Post Added Successfully");
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
                                    post
                                </h4>
                                {/* Basic Layout & Basic with Icons */}
                                <div className="row">
                                    {/* Basic Layout */}
                                    <div className="col-xxl">
                                        <div className="card mb-4">
                                            <div className="card-body">
                                                <div className="row">



                                                    <div className="row">
                                                        <div className="mb-3 col-md-6">
                                                            <label
                                                                className="form-label"
                                                                htmlFor="basic-default-fullname"
                                                            >
                                                                Add Caption
                                                            </label>
                                                            <div>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="basic-default-name"
                                                                    placeholder="Post Caption ..."
                                                                    name="description"
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="row mb-3">
                                                        <label
                                                            className="col-sm-2 col-form-label"
                                                            htmlFor="basic-default-company"
                                                        >
                                                            Post Image / Icon
                                                        </label>

                                                        <div className="col-sm-10">
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                id="inputGroupFile02"
                                                                accept=".jpg, .jpeg, .png"
                                                                onChange={handlepostImage}
                                                            />
                                                            <br />
                                                            {imgloading === true ? (
                                                                <h4>Uploading Image {progress} %</h4>
                                                            ) : (
                                                                <></>
                                                            )}
                                                            <img
                                                                src={postImage}
                                                                className="image"
                                                                alt="uploading_image"
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
                                                                ADD POST
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
            </div>
            <Toaster />
        </>
    );
};

export default AddPost;
