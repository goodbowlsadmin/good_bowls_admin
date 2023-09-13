import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import { db } from "./FirebaseConfig";
import DashboardCard from "./components/DashboardCard";

function App() {
  const [categories, setCategories] = useState(0);
  const [videos, setVideos] = useState(0);
  const [users, setUsers] = useState(0);
  const [tips, setTips] = useState(0);
  const [posts, setPosts] = useState(0);
  const [recepies, setRecepies] = useState(0);
  const [videoPosts, setVideoPosts] = useState(0);
  const [polls, setPolls] = useState(0);
  const [weeks, setWeeks] = useState(0);

  useEffect(() => {
    db.collection("categories")
      .get()
      .then((query) => {
        const data = query.size;
        setCategories(data);
      });
    db.collection("videos")
      .get()
      .then((query) => {
        const data = query.size;
        setVideos(data);
      });
    db.collection("Users")
      .get()
      .then((query) => {
        const data = query.size;
        setUsers(data);
      });
    db.collection("tips")
      .get()
      .then((query) => {
        const data = query.size;
        setTips(data);
      });
    db.collection("posts")
      .get()
      .then((query) => {
        const data = query.size;
        setPosts(data);
      });
    db.collection("recepies")
      .get()
      .then((query) => {
        const data = query.size;
        setRecepies(data);
      });
    db.collection("video-posts")
      .get()
      .then((query) => {
        const data = query.size;
        setVideoPosts(data);
      });
    db.collection("polls")
      .get()
      .then((query) => {
        const data = query.size;
        setPolls(data);
      });
    db.collection("weeks")
      .get()
      .then((query) => {
        const data = query.size;
        setWeeks(data);
      });
  }, []);

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <Header />
          <div className="layout-page">
            <Nav />
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                <div className="col-lg-12 col-md-4 order-1">
                  <div className="row">
                    <DashboardCard
                      name="Categories"
                      route='/Categories'
                      data={categories} />
                    <DashboardCard
                      name="Videos"
                      route='/Videos'
                      data={videos} />
                    <DashboardCard
                      name="Tips"
                      route='/Tips'
                      data={tips} />
                    <DashboardCard
                      name="Recipes"
                      route='/View-Recipes'
                      data={recepies} />
                    <DashboardCard
                      name="Users"
                      route='/Users'
                      data={users} />
                    <DashboardCard
                      name="Video Posts"
                      route='/Video-Posts'
                      data={videoPosts} />
                    <DashboardCard
                      name="Posts"
                      route='/Posts'
                      data={posts} />
                    <DashboardCard
                      name="Polls"
                      route='/Polls'
                      data={polls} />
                    <DashboardCard
                      name="Weeks"
                      route='/Weeks'
                      data={weeks} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
