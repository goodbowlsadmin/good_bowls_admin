import React, { useEffect, useState } from "react";
import { db } from "../../FirebaseConfig";
import Header from "../Header";
import Nav from "../Nav";
import "../../App.css";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import VideoCard from "./VideoCard";

const UserVideoPosts = () => {
    let [posts, setPosts] = useState([]);
    const [Delete, setDelete] = useState(false);
    let [input, setInput] = useState("");
    const { id } = useParams();

    /* Fetching data from firebase and setting it to the state. */
    useEffect(() => {
        db.collection("video-posts")
            .where("uid", "==", id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((element) => {
                    var data = element.data();
                    setPosts((arr) => [...arr, data]);
                });
            })
            .catch((err) => { });
    }, [id]);


    const deleteCategory = (name) => {
        setDelete(true);
        db.collection("video-posts")
            .doc(name)
            .delete()
            .then(() => {
                toast.success("Post Removed");
                setDelete(false);
            });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };

    if (input.length > 0) {
        const lower_input = input.toLowerCase();
        posts = posts.filter((cat) => {
            return cat.description.toLowerCase().match(lower_input);
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
                                User Video Posts
                            </h4>
                            <div className="navbar-nav align-items-center">
                                <div className="nav-item d-flex align-items-center w-100">
                                    <i className="bx bx-search fs-4 lh-0" />
                                    <input
                                        type="text"
                                        className="form-control border-0 shadow-none"
                                        placeholder="Search For posts..."
                                        aria-label="Search..."
                                        onChange={handleSearch}
                                    />
                                </div>
                            </div>
                            <br />
                            <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                                <>
                                    {posts.length === 0 ? (
                                        <>
                                            <h2>No Video Posts Found</h2>
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
                                            {posts.map((cat, i) => (
                                                <>
                                                    <div className="col" id={i}>
                                                        <div className="card">
                                                            <VideoCard
                                                                video={cat.videoUrl} />
                                                            <div className="card-body">
                                                                <h5 className="card-title">{cat.description}</h5>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    onClick={() => {
                                                                        deleteCategory(cat.videoId);
                                                                    }}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ))}
                                        </>
                                    )}
                                </>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default UserVideoPosts;
