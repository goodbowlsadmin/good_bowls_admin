import React, { useEffect, useState } from "react";
import $ from "jquery";
import Header from "../Header";
import Nav from "../Nav";
import { db } from "../../FirebaseConfig";
import toast, { Toaster } from "react-hot-toast";
import { Rings } from "react-loader-spinner";
import { Link } from "react-router-dom";
import FirestoreTimestampToDate from "../../helpers/date";

const ViewAllPosts = () => {
    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const get_data = async () => {
            await db
                .collection("posts")
                .orderBy("datePublished", "desc")
                .get()
                .then((querySnapshot) => {
                    const posts = querySnapshot.docs.map((d) => ({
                        id: d.id,
                        ...d.data(),
                    }));

                    if (posts.length === 0) {
                        setLoading(false);
                    } else {
                        setPosts(posts);
                        setLoading(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        };

        get_data();
    }, []);

    const deletePost = (id) => {
        db.collection("posts")
            .doc(id)
            .delete()
            .then((res) => {
                $("#" + id).fadeOut();
                toast.success("Post Deleted Successfully");
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                                Posts
                            </h4>

                            {loading === true ? (
                                <>
                                    <h2>
                                        <Rings
                                            height="80"
                                            width="80"
                                            color="#456CCF"
                                            radius="6"
                                            visible={true}
                                            ariaLabel="rings-loading"
                                        />
                                        Loading Data
                                    </h2>
                                </>
                            ) : (
                                <>
                                    {posts.length === 0 ? (
                                        <>
                                            <h2>No Data Found</h2>
                                            <Link to={"/Add-Post"}>
                                                <button
                                                    className="btn btn-primary"
                                                >
                                                    Add Post
                                                </button>
                                            </Link>
                                        </>
                                    ) : (
                                        <div className="row row-cols-1 row-cols-md-3 g-4 mb-5">
                                            <>
                                                {posts.map((tem, i) => (
                                                    <>
                                                        <div className="col" id={tem.id}>
                                                            <div className="card">
                                                                <img
                                                                    className="card-img-top"
                                                                    style={{
                                                                        height: "300px",
                                                                    }}
                                                                    src={tem.postUrl}
                                                                    alt={tem.postUrl}
                                                                />
                                                                <div className="card-body">
                                                                    <h5 className="card-title">
                                                                        {tem.description}
                                                                    </h5>

                                                                    <h6 className="card-title">{tem.likes.length} likes</h6>
                                                                    <FirestoreTimestampToDate {...tem.datePublished} />
                                                                    <button
                                                                        className="btn btn-danger"
                                                                        onClick={() => {
                                                                            deletePost(tem.id);
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                    <span className="p-2" >
                                                                        <Link to={`/Comments/posts/${tem.id}`}>
                                                                            <button
                                                                                className="btn btn-primary"
                                                                            >
                                                                                Comments
                                                                            </button>
                                                                        </Link>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                ))}
                                            </>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
};

export default ViewAllPosts;
