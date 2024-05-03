import React, { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { Table } from "./Table";
import { DateRangePicker } from "./DateRangePicker";

const Analytics = () => {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("refreshToken")
  );
  const [errors, setError] = useState("");
  const [report, setReport] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loadReport, fetchReport] = useState(false);

  const propertyId = "406180211";

  useEffect(() => {
    if (authenticated && loadReport) {
      runReport(startDate, endDate);
    }
  }, [authenticated, loadReport]);

  async function signIn() {
    if (!authenticated) {
      const provider = new GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/analytics.readonly");
      provider.addScope("https://www.googleapis.com/auth/analytics");
      provider.addScope("https://www.googleapis.com/auth/yt-analytics.readonly")

      try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const credentials = user.stsTokenManager;
        const tokenResponse = user._tokenResponse.oauthAccessToken;
        localStorage.setItem("refreshToken", tokenResponse);
        localStorage.setItem("accessToken", credentials.accessToken);
        localStorage.setItem("name", user.displayName);
        localStorage.setItem("user", user);
        setAuthenticated(true);
      } catch (error) {
        alert(error);
        setError(error);
        setAuthenticated(false);
        setReport([]);
      }
    } else {
      setAuthenticated(true);
    }
  }

  async function runReport(startDate, endDate) {
    var options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
      body: JSON.stringify({
        dimensions: [
          {
            name: "unifiedScreenName",
          },
        ],
        metrics: [
          {
            name: "screenPageViews",
          },
        ],
        dateRanges: [
          {
            startDate: startDate,
            endDate: endDate,
          },
        ],
      }),
    };

    try {
      const response = await fetch(
        `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
        options
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error.message);
        fetchReport(false);
        setReport(null);
        return;
      }
      setReport(data);
      fetchReport(false);
    } catch (error) {
      console.error(error);
      setError(error);
      fetchReport(false);
      setReport(null);
    }
  }

  return (
    <div>
      <h1>Analytics</h1>
      <h1>Welcome Back {localStorage.getItem("name") || "Guest"}</h1>
      <p>In order to see the Google Analytics you will need sign into  <strong>Goodbowlsadmin@ncsu.edu</strong> or have the appropriate permissions </p>
      {!authenticated && (
        <button
          onClick={async () => {
            await signIn();
          }}
        >
          Sign In To Google
        </button>
      )}
      <DateRangePicker
        setEndDate={setEndDate}
        setStartDate={setStartDate}
        startDate={startDate}
        endDate={endDate}
      />
      <button
        disabled={startDate === "" || endDate === ""}
        onClick={() => {
          fetchReport(true);
          setError("");
        }}
      >
        Get Report
      </button>
      <div>
        {errors && <strong>{errors}</strong>}
      </div>
      {report ? <Table reports={report} /> : null}
    </div>
  );
};

export default Analytics;
