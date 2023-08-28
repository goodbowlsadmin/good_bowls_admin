/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header'
import Nav from '../Nav'
import { db } from '../../FirebaseConfig'

const Comments = () => {
    let [data, setData] = useState([]);
    let [input, setInput] = useState("");
    const { id, name } = useParams();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        await db.collection(name).doc(id).collection('comments')
            .orderBy("datePublished", "desc")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((element) => {
                    let tdata = element.data();
                    setData((arr) => [...arr, tdata]);
                })
            })
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setInput(e.target.value);
    };

    if (input.length > 0) {
        const lower_input = input.toLowerCase();
        data = data.filter((cat) => {
            return cat.name.toLowerCase().match(lower_input);
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
                                <span className="text-muted fw-light">{process.env.REACT_APP_NAME} /</span> View Comments
                            </h4>
                            <div className="nav-item d-flex align-items-center w-100">
                                <i className="bx bx-search fs-4 lh-0" />
                                <input
                                    type="text"
                                    className="form-control border-0 shadow-none"
                                    placeholder="Search For Comments..."
                                    aria-label="Search..."
                                    onChange={handleSearch}
                                />
                            </div>
                            <br />
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Avatar</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Comment</th>
                                        <th scope="col">Date</th>
                                    </tr>
                                </thead>
                                {data.length === 0 ? (
                                    <>
                                        <h4 className='pt-2'>No Comments Found</h4>
                                    </>
                                ) : (
                                    <>
                                        {data && data.map((d,i) => (
                                            <tbody key={i}>
                                                <tr>
                                                    <td><img src={d.profilePic} alt="" width="50px" /></td>
                                                    <td>{d.name}</td>
                                                    <td>{d.text}</td>
                                                    <td>{new Date(d.datePublished?.toDate()).toLocaleString()}</td>
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
    )
}

export default Comments