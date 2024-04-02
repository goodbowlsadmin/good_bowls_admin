import React from "react";
import $ from "jquery";
import {
  Users,
  User,
  House,
  X,
  VideoCamera,
  Info,
  Image,
  FilmScript,
  FilmStrip,
  ChartBar,
  Target,
  Calendar,
  MonitorPlay,
  Note,
  Bell,
  ChartLine,
} from "phosphor-react";
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
            <img src="/assets/logo.png" width="50" alt="Header" />
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

        <li className="menu-item">
          <a href="/Course" className="menu-link">
            <MonitorPlay size={22} className="menu-icon" />
            <div data-i18n="Analytics">Course Management</div>
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
            <Note size={22} className="menu-icon" />
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
            <VideoCamera size={22} className="menu-icon" />
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

        <li className="menu-item tag-tip">
          <a
            href="#/"
            className="menu-link menu-toggle"
            onClick={() => {
              menu("tag-tip");
            }}
          >
            <Info size={22} className="menu-icon" />
            <div data-i18n="Authentications">Tips</div>
          </a>
          <ul className="menu-sub">
            <li className="menu-item">
              <a href="/Add-Tip" className="menu-link">
                <div data-i18n="Basic">Add Tips</div>
              </a>
            </li>

            <li className="menu-item">
              <a href="/Tips" className="menu-link">
                <div data-i18n="Basic">View Tips</div>
              </a>
            </li>
          </ul>
        </li>

        <li className="menu-item tag-post">
          <a
            href="#/"
            className="menu-link menu-toggle"
            onClick={() => {
              menu("tag-post");
            }}
          >
            <Image size={22} className="menu-icon" />
            <div data-i18n="Authentications">Posts</div>
          </a>
          <ul className="menu-sub">
            <li className="menu-item">
              <a href="/Add-Post" className="menu-link">
                <div data-i18n="Basic">Add Post</div>
              </a>
            </li>

            <li className="menu-item">
              <a href="/Posts" className="menu-link">
                <div data-i18n="Basic">View Posts</div>
              </a>
            </li>

            <li className="menu-item">
              <a href="/Admin-Posts" className="menu-link">
                <div data-i18n="Basic">View Admin Posts</div>
              </a>
            </li>
          </ul>
        </li>

        <li className="menu-item tag-post-video">
          <a
            href="#/"
            className="menu-link menu-toggle"
            onClick={() => {
              menu("tag-post-video");
            }}
          >
            <FilmStrip size={22} className="menu-icon" />
            <div data-i18n="Authentications">Video Post</div>
          </a>
          <ul className="menu-sub">
            <li className="menu-item">
              <a href="/Add-Video-Post" className="menu-link">
                <div data-i18n="Basic">Add Video Posts</div>
              </a>
            </li>

            <li className="menu-item">
              <a href="/Video-Posts" className="menu-link">
                <div data-i18n="Basic">View Video Posts</div>
              </a>
            </li>

            <li className="menu-item">
              <a href="/Admin-Video-Posts" className="menu-link">
                <div data-i18n="Basic">View Admin Video Posts</div>
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
            <ChartBar size={22} className="menu-icon" />
            <div data-i18n="Authentications">Polls</div>
          </a>
          <ul className="menu-sub">
            <li className="menu-item">
              <a href="/Add-Polls" className="menu-link">
                <div data-i18n="Basic">Add Polls</div>
              </a>
            </li>

            <li className="menu-item">
              <a href="/Polls" className="menu-link">
                <div data-i18n="Basic">View Polls</div>
              </a>
            </li>
          </ul>
        </li>

        <li className="menu-item tag-Recipe">
          <a
            href="#/"
            className="menu-link menu-toggle"
            onClick={() => {
              menu("tag-Recipe");
            }}
          >
            <FilmScript size={22} className="menu-icon" />
            <div data-i18n="Authentications">Recipe</div>
          </a>
          <ul className="menu-sub">
            <li className="menu-item">
              <a href="/Add-Recipe" className="menu-link">
                <div data-i18n="Basic">Add Recipe</div>
              </a>
            </li>

            <li className="menu-item">
              <a href="/View-Recipes" className="menu-link">
                <div data-i18n="Basic">Update / View Recipe</div>
              </a>
            </li>
          </ul>
        </li>

        <li className="menu-item tag-Goal">
          <a
            href="#/"
            className="menu-link menu-toggle"
            onClick={() => {
              menu("tag-Goal");
            }}
          >
            <Target size={22} className="menu-icon" />
            <div data-i18n="Authentications">Goals</div>
          </a>
          <ul className="menu-sub">
            <li className="menu-item">
              <a href="/Add-Goals" className="menu-link">
                <div data-i18n="Basic">Add Goals</div>
              </a>
            </li>

            <li className="menu-item">
              <a href="/Goals" className="menu-link">
                <div data-i18n="Basic">Update / View Goals</div>
              </a>
            </li>
          </ul>
        </li>

        <li className="menu-item tag-week">
          <a
            href="#/"
            className="menu-link menu-toggle"
            onClick={() => {
              menu("tag-week");
            }}
          >
            <Calendar size={22} className="menu-icon" />
            <div data-i18n="Authentications">Week Mangement</div>
          </a>
          <ul className="menu-sub">
            <li className="menu-item">
              <a href="/Weeks" className="menu-link">
                <div data-i18n="Basic">Add Week</div>
              </a>
            </li>

            <li className="menu-item">
              <a href="/Add-Week-Title" className="menu-link">
                <div data-i18n="Basic">Add Week Title</div>
              </a>
            </li>

            <li className="menu-item">
              <a href="/Week-Titles" className="menu-link">
                <div data-i18n="Basic">Update/ View Week Title</div>
              </a>
            </li>
          </ul>
        </li>

        <li className="menu-item tag-notifications">
          <a
            href="#/"
            className="menu-link menu-toggle"
            onClick={() => {
              menu("tag-notifications");
            }}
          >
            <Bell size={22} className="menu-icon" />
            <div data-i18n="Authentications">Notifications</div>
          </a>
          <ul className="menu-sub">
            <li className="menu-item">
              <a href="/Add-Notifications" className="menu-link">
                <div data-i18n="Basic">Add Notifications</div>
              </a>
            </li>

            <li className="menu-item">
              <a href="/Notifications" className="menu-link">
                <div data-i18n="Basic">View Notifications</div>
              </a>
            </li>
          </ul>
        </li>

        <li className="menu-item">
          <a href="/Users" className="menu-link">
            <Users size={22} className="menu-icon" />
            <div data-i18n="Analytics">Users</div>
          </a>
        </li>

        <li className="menu-item">
          <a href="/Analytics" className="menu-link">
            <ChartLine size={22} className="menu-icon" />
            <div data-i18n="Analytics">Analytics</div>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Header;
