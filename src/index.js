import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { AuthContextProvider } from "./components/AuthContext";
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
          path="/Add-Recepie"
          element={
            <ProtectedRoute>
              <AddRecepie />
            </ProtectedRoute>
          } />

        <Route
          path="/View-Recepies"
          element={
            <ProtectedRoute>
              <ViewRecepies />
            </ProtectedRoute>
          } />

        <Route
          path="/Edit-Recepie/:id"
          element={
            <ProtectedRoute>
              <EditRecepie />
            </ProtectedRoute>
          } />
      </Routes>
    </AuthContextProvider>
  </BrowserRouter>
);

