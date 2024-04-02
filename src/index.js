import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./components/AuthContext";
import "./index.css";
import App from "./App";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AddCategory from "./components/Categories/AddCategory";
import ViewCategories from "./components/Categories/ViewCategories";
import AddSubCategory from "./components/SubCategory/AddSubCategory";
import ViewSubCategory from "./components/SubCategory/ViewSubCategory";
import AddCarousel from "./components/Carousel/AddCarousel";
import ViewCarousels from "./components/Carousel/ViewCarousels";
import HomescreenCategory from "./components/HomescreenCategory/HomescreenCategory";
import AddVideos from "./components/Videos/AddVideos";
import ViewVideo from "./components/Videos/ViewVideo";
import ViewParticularVideo from "./components/Videos/ViewParticularVideo";
import ViewSingleVideo from "./components/Videos/ViewSingleVideo";
import EditVideo from "./components/Videos/EditVideo";
import AddTips from "./components/Tips/AddTips";
import ViewTips from "./components/Tips/ViewTips";
import ViewParticularTip from "./components/Tips/ViewParticularTip";
import ViewSingleTip from "./components/Tips/ViewSingleTip";
import EditTip from "./components/Tips/EditTip";
import AddWeeks from "./components/Weeks/AddWeeks";
import AddRecepie from "./components/Recepies/AddRecepie";
import ViewRecepies from "./components/Recepies/ViewRecepies";
import EditRecepie from "./components/Recepies/EditRecepie";
import AddPolls from "./components/Polls/AddPolls";
import { Course } from "./components/Course/Course";
import SingleDayView from "./components/Course/SingleDayView";
import Users from "./components/Users/Users";
import UserPosts from "./components/Users/UserPosts";
import UserVideoPosts from "./components/Users/UserVideoPosts";
import AddGoals from "./components/Goals/AddGoals";
import ViewGoals from "./components/Goals/ViewGoals";
import EditGoals from "./components/Goals/EditGoals";
import ViewPolls from "./components/Polls/ViewPolls";
import AddPost from "./components/Posts/AddPost";
import AddVideoPost from "./components/Video-Posts/AddVideoPosts";
import ViewAdminPosts from "./components/Posts/ViewAdminPosts";
import ViewAllPosts from "./components/Posts/ViewAllPosts";
import EditPost from "./components/Posts/EditPost";
import Comments from "./components/Posts/Comments";
import ViewAdminVideoPosts from "./components/Video-Posts/ViewAdminVideoPosts";
import ViewAllVideoPosts from "./components/Video-Posts/VideoAllVideoPosts";
import EditVideoPost from "./components/Video-Posts/EditVideoPosts";
import AddWeekTitle from "./components/Weeks/AddWeekTitle";
import ViewWeekTitles from "./components/Weeks/ViewWeekTitles";
import EditWeekTitle from "./components/Weeks/EditWeekTitle";
import EditUser from "./components/Users/EditUser";
import AddNotifications from "./components/Notifications/AddNotification";
import Notifications from "./components/Notifications/ViewNotifications";
import Analytics from "./components/Analytics/Analytics";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  /* The router for the application. */
  <BrowserRouter>
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Home-screen-category"
          element={
            <ProtectedRoute>
              <HomescreenCategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Add-Carousel"
          element={
            <ProtectedRoute>
              <AddCarousel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Carousels"
          element={
            <ProtectedRoute>
              <ViewCarousels />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Add-Category"
          element={
            <ProtectedRoute>
              <AddCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Add-Sub-Category"
          element={
            <ProtectedRoute>
              <AddSubCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Categories"
          element={
            <ProtectedRoute>
              <ViewCategories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Sub-Categories"
          element={
            <ProtectedRoute>
              <ViewSubCategory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Add-Video"
          element={
            <ProtectedRoute>
              <AddVideos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Videos"
          element={
            <ProtectedRoute>
              <ViewVideo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category/sub/:cat"
          element={
            <ProtectedRoute>
              <ViewParticularVideo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/category/:cat"
          element={
            <ProtectedRoute>
              <ViewSingleVideo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Edit-Video/:id"
          element={
            <ProtectedRoute>
              <EditVideo />
            </ProtectedRoute>
          } />

        <Route
          path="/Add-Tip"
          element={
            <ProtectedRoute>
              <AddTips />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Tips"
          element={
            <ProtectedRoute>
              <ViewTips />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tip/category/sub/:cat"
          element={
            <ProtectedRoute>
              <ViewParticularTip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tip/category/:cat"
          element={
            <ProtectedRoute>
              <ViewSingleTip />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Edit-Tip/:id"
          element={
            <ProtectedRoute>
              <EditTip />
            </ProtectedRoute>
          } />

        <Route
          path="/Weeks"
          element={
            <ProtectedRoute>
              <AddWeeks />
            </ProtectedRoute>
          } />

        <Route
          path="/Add-Recipe"
          element={
            <ProtectedRoute>
              <AddRecepie />
            </ProtectedRoute>
          } />

        <Route
          path="/View-Recipes"
          element={
            <ProtectedRoute>
              <ViewRecepies />
            </ProtectedRoute>
          } />

        <Route
          path="/Edit-Recipe/:id"
          element={
            <ProtectedRoute>
              <EditRecepie />
            </ProtectedRoute>
          } />
        <Route
          path="/Add-Polls"
          element={
            <ProtectedRoute>
              <AddPolls />
            </ProtectedRoute>
          } />
        <Route
          path="/Polls"
          element={
            <ProtectedRoute>
              <ViewPolls />
            </ProtectedRoute>
          } />
        <Route
          path="/Course"
          element={
            <ProtectedRoute>
              <Course />
            </ProtectedRoute>
          } />
        <Route
          path="/Course/:week/:day"
          element={
            <ProtectedRoute>
              <SingleDayView />
            </ProtectedRoute>
          } />
        <Route
          path="/Users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          } />
          <Route
          path="/Analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          } />
        <Route
          path="/User-Posts/:id"
          element={
            <ProtectedRoute>
              <UserPosts />
            </ProtectedRoute>
          } />
        <Route
          path="/User-Video-Posts/:id"
          element={
            <ProtectedRoute>
              <UserVideoPosts />
            </ProtectedRoute>
          } />
        <Route
          path="/Edit-User/:id"
          element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          } />
        <Route
          path="/Add-Goals"
          element={
            <ProtectedRoute>
              <AddGoals />
            </ProtectedRoute>
          } />
        <Route
          path="/Goals"
          element={
            <ProtectedRoute>
              <ViewGoals />
            </ProtectedRoute>
          } />
        <Route
          path="/Edit-Goals/:id"
          element={
            <ProtectedRoute>
              <EditGoals />
            </ProtectedRoute>
          } />
        <Route
          path="/Add-Post"
          element={
            <ProtectedRoute>
              <AddPost />
            </ProtectedRoute>
          } />
        <Route
          path="/Edit-Post/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          } />
        <Route
          path="/Admin-Posts"
          element={
            <ProtectedRoute>
              <ViewAdminPosts />
            </ProtectedRoute>
          } />
        <Route
          path="/Posts"
          element={
            <ProtectedRoute>
              <ViewAllPosts />
            </ProtectedRoute>
          } />
        <Route
          path="/Comments/:name/:id"
          element={
            <ProtectedRoute>
              <Comments />
            </ProtectedRoute>
          } />
        <Route
          path="/Add-Video-Post"
          element={
            <ProtectedRoute>
              <AddVideoPost />
            </ProtectedRoute>
          } />
        <Route
          path="/Admin-Video-Posts"
          element={
            <ProtectedRoute>
              <ViewAdminVideoPosts />
            </ProtectedRoute>
          } />
        <Route
          path="/Video-Posts"
          element={
            <ProtectedRoute>
              <ViewAllVideoPosts />
            </ProtectedRoute>
          } />
        <Route
          path="/Edit-Video-Post/:id"
          element={
            <ProtectedRoute>
              <EditVideoPost />
            </ProtectedRoute>
          } />
        <Route
          path="/Add-Week-Title"
          element={
            <ProtectedRoute>
              <AddWeekTitle />
            </ProtectedRoute>
          } />
        <Route
          path="/Week-Titles"
          element={
            <ProtectedRoute>
              <ViewWeekTitles />
            </ProtectedRoute>
          } />
        <Route
          path="/Edit-Week-Title/:id"
          element={
            <ProtectedRoute>
              <EditWeekTitle />
            </ProtectedRoute>
          } />
        <Route
          path="/Add-Notifications"
          element={
            <ProtectedRoute>
              <AddNotifications />
            </ProtectedRoute>
          } />
        <Route
          path="/Notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />
          
          <Route
          path="/Course/:week/:day"
          element={
            <ProtectedRoute>
              <SingleDayView />
            </ProtectedRoute>
          } />
    

      </Routes>
    </AuthContextProvider>
  </BrowserRouter>
);

