import React from "react";
import $ from "jquery";
import { Users, User, House, X } from "phosphor-react";
import { UserAuth } from "./AuthContext";
import "../App.css";

const Header = () => {
  const menu = (argument) => {
    $("." + argument).toggleClass("open");
  };

  const menuToggle = () => {
    $("#layout-menu").removeClass("menu-open");
  };

  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  return (
    <>
      <aside
        id="layout-menu"
        className="layout-menu menu-vertical menu bg-menu-theme"
      >
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a className="nav-item nav- px-4 py-4 me-xl-4" href="#/">
            <X
              size={22}
              onClick={() => {
                menuToggle();
              }}
            />
          </a>
        </div>
        <div className="app-brand demo">
          <a href="/" className="app-brand-link">
            <span className="app-brand-logo demo">
              <img
                src="/assets/logo.png"
                width="50"
                alt="Header"
              />
            </span>
          </a>
        </div>
        <div className="menu-inner-shadow" />
        <ul className="menu-inner py-1">
          <li className="menu-item">
            <a href="#/" className="menu-link">
              <User size={22} />
              <div data-i18n="Analytics">&nbsp;&nbsp;{user && user.email}</div>
            </a>
          </li>
          <li className="menu-item">
            <a href="#/" className="menu-link">
              <User size={22} />
              <div data-i18n="Analytics" onClick={handleLogout}>
                &nbsp;&nbsp;Logout
              </div>
            </a>
          </li>

          <li className="menu-header small text-uppercase">
            <span className="menu-header-text">Content</span>
          </li>
          <li className="menu-item">
            <a href="/" className="menu-link">
              <House size={22} className="menu-icon" />
              <div data-i18n="Analytics">Dashboard</div>
            </a>
          </li>

          <li className="menu-item tag">
            <a
              href="#/"
              className="menu-link menu-toggle"
              onClick={() => {
                menu("tag");
              }}
            >
              <Users size={22} className="menu-icon" />
              <div data-i18n="Authentications">Category</div>
            </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <a href="/Add-Category" className="menu-link">
                  <div data-i18n="Basic">Add Category</div>
                </a>
              </li>

              <li className="menu-item">
                <a href="/Add-Sub-Category" className="menu-link">
                  <div data-i18n="Basic">Add Sub Category</div>
                </a>
              </li>

              <li className="menu-item">
                <a href="/Sub-Categories" className="menu-link">
                  <div data-i18n="Basic">View Sub - Category</div>
                </a>
              </li>

              <li className="menu-item">
                <a href="/Categories" className="menu-link">
                  <div data-i18n="Basic">View Category</div>
                </a>
              </li>
            </ul>
          </li>

          <li className="menu-item tag-video">
            <a
              href="#/"
              className="menu-link menu-toggle"
              onClick={() => {
                menu("tag-video");
              }}
            >
              <Users size={22} className="menu-icon" />
              <div data-i18n="Authentications">Videos</div>
            </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <a href="/Add-Video" className="menu-link">
                  <div data-i18n="Basic">Add Video</div>
                </a>
              </li>

              <li className="menu-item">
                <a href="/Videos" className="menu-link">
                  <div data-i18n="Basic">View Videos</div>
                </a>
              </li>
            </ul>
          </li>

          <li className="menu-item tag-carousel">
            <a
              href="#/"
              className="menu-link menu-toggle"
              onClick={() => {
                menu("tag-carousel");
              }}
            >
              <Users size={22} className="menu-icon" />
              <div data-i18n="Authentications">Carousel</div>
            </a>
            <ul className="menu-sub">
              <li className="menu-item">
                <a href="/Add-Carousel" className="menu-link">
                  <div data-i18n="Basic">Add Carousel</div>
                </a>
              </li>

              <li className="menu-item">
                <a href="/Carousels" className="menu-link">
                  <div data-i18n="Basic">Update / View Carousels</div>
                </a>
              </li>
            </ul>
          </li>

          <li className="menu-item tag-homescreen-category">
            <a href="/Home-screen-category" className="menu-link">
              <House size={22} className="menu-icon" />
              <div data-i18n="Analytics">Homescreen Category</div>
            </a>
          </li>

        </ul>
      </aside>
    </>
  );
};

export default Header;
