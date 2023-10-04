/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import firebase from "firebase/compat/app";
import Nav from "../Nav";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import VideoCard from "../Users/VideoCard";

const EditVideoPost = () => {
    const [imgloading, setImgLoading] = useState(false);

    const { id } = useParams();

    const [progress, setProgress] = useState(0);

    const [postImage, setPostImage] = useState(
        "https://brent-mccardle.org/img/placeholder-image.png"
    );

    const [post, setPost] = useState({
        description: "",
        likes: [],
        uid: 'Admin',
        videoUrl: "",
        profImage: 'https://res.cloudinary.com/dzrg2j6mv/image/upload/v1692445022/Categories/logo_k5hbjo.png',
        username: 'Good Bowls',
    });

    useEffect(() => {
        db.collection("video-posts")
            .doc(id)
            .get()
            .then((res) => {
                setPost(res.data());
                setPostImage(res.data().videoUrl);
            });
    }, []);

    const handlePostVideo = async (e) => {
        setImgLoading(true);
        const file = e.target.files[0];

        // Reference to your Firebase Storage bucket
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(`videos/${file.name}`);

        const uploadTask = fileRef.put(file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
                console.error(error);
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    setImgLoading(false);
                    setPostImage(downloadURL);
                    toast.success('Post Video Uploaded Successfully');
                });
            }
        );
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
        post.created = firebase.firestore.FieldValue.serverTimestamp();
        post.img = postImage;
        db.collection("video-posts")
            .doc(id)
            .update({
                description: post.description,
                likes: [],
                uid: 'Admin',
                postUrl: postImage,
                profImage: 'https://asset.cloudinary.com/dzrg2j6mv/93d77fc498e2ce61c853614126fbcb59',
                username: 'Good Bowls',
                datePublished: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then((res) => {
                toast.success("Post Updated Successfully");
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
                                    Video Post
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
                                                                    value={post.description}
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
                                                            Post Video
                                                        </label>

                                                        <div className="col-sm-10">
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                id="inputGroupFile02"
                                                                accept="video/mp4, video/x-m4v, video/quicktime, video/*"
                                                                onChange={handlePostVideo}
                                                            />
                                                            <br />
                                                            {imgloading === true ? (
                                                                <>
                                                                    <h4>Uploading Video {progress.toFixed(2)} %</h4>
                                                                </>
                                                            ) : (
                                                                <></>
                                                            )}
                                                            <VideoCard
                                                                video={postImage} />
                                                        </div>
                                                    </div>
                                                    <div className="row justify-content-end">
                                                        <div className="col-sm-10">
                                                            <button
                                                                type="submit"
                                                                className="btn btn-primary"
                                                                onClick={onSubmit}
                                                            >
                                                                UPDATE POST
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

export default EditVideoPost;
