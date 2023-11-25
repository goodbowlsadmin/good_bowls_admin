import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header'
import Nav from '../Nav'
import { db } from '../../FirebaseConfig'
import './Table.css';

const Users = () => {
    let [data, setData] = useState([]);
    let [input, setInput] = useState("");

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        await db.collection('Users').get()
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
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <Header />
                <div className="layout-page">
                    <Nav />
                    <div className="container-xxl flex-grow-1 container-p-y">
                        <h4 className="fw-bold py-3 mb-4">
                            <span className="text-muted fw-light">{process.env.REACT_APP_NAME} /</span> View User's
                        </h4>
                        <div className="nav-item d-flex align-items-center w-100">
                            <i className="bx bx-search fs-4 lh-0" />
                            <input
                                type="text"
                                className="form-control border-0 shadow-none"
                                placeholder="Search For users..."
                                aria-label="Search..."
                                onChange={handleSearch}
                            />
                        </div>
                        <br />
                        <div className="custom-table-responsive">

                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Avatar</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Participation ID</th>
                                        <th scope="col">Worksite</th>
                                        <th scope="col">Enrolled</th>
                                        <th scope="col">Progress</th>
                                        <th scope="col">User Posts</th>
                                        <th scope="col">Video Posts</th>
                                        <th scope="col">Update</th>
                                    </tr>
                                </thead>
                                {data.length === 0 ? (
                                    <h4 className='pt-2'>No Users Found</h4>
                                ) : (
                                    <>
                                        {data && data.map((d, i) => (
                                            <tbody key={i}>
                                                <tr>
                                                    <td><img src={d.photoUrl} alt="" width="50px" /></td>
                                                    <td>{d.name}</td>
                                                    <td>{d.email}</td>
                                                    <td>{d.pid ? d.pid : 'Not yet Updated'}</td>
                                                    <td>{d.worksite ? d.worksite : 'Not yet Updated'}</td>
                                                    <td>{d.course ? 'Enrolled' : 'Not Enrolled'}</td>
                                                    {d.currentWeek ? (
                                                        <td>{d.currentWeek}, Day {d.currentDay}</td>
                                                    ) : <td>No Progress</td>}
                                                    <td><button type="button" class="btn btn-secondary"> <Link to={`/User-Posts/${d.uid}`} className='text-white'> View </Link></button></td>
                                                    <td><button type="button" class="btn btn-secondary"> <Link to={`/User-Video-Posts/${d.uid}`} className='text-white'> View </Link></button></td>
                                                    <td><button type="button" class="btn btn-primary"> <Link to={`/Edit-User/${d.email}`} className='text-white'> Update </Link></button></td>
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
        </div>
    )
}

export default Users