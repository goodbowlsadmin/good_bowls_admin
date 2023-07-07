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
      </Routes>
    </AuthContextProvider>
  </BrowserRouter>
);

